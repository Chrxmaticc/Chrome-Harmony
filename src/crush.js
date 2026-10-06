// src/crush.js
// Perceived loudness effect — saturation + compression + parallel blend.
// NO safety clamps. The wav-writer is the only limiter downstream.
// If the signal goes hot, it stays hot.

function apply(samples, amount = 0.5, sampleRate = 44100) {
  const output = new Float32Array(samples.length);
  const drive = 1 + amount * 3;
  const mix = 0.3 + amount * 0.5;

  // Attack/release for the compressor stage
  const attackSamples  = Math.max(1, Math.floor(0.002 * sampleRate)); // 2ms
  const releaseSamples = Math.max(1, Math.floor(0.08  * sampleRate)); // 80ms

  let envelope = 0;
  const threshold = 0.3 - amount * 0.2;
  const ratio = 1 + amount * 3;

  for (let i = 0; i < samples.length; i++) {
    // === STAGE 1: Saturation ===
    const saturated = Math.tanh(samples[i] * drive) / Math.tanh(drive);

    // === STAGE 2: Compression ===
    const absSample = Math.abs(saturated);
    if (absSample > envelope) {
      envelope += (absSample - envelope) / attackSamples;
    } else {
      envelope += (absSample - envelope) / releaseSamples;
    }

    let compressed = saturated;
    if (envelope > threshold) {
      const gainReduction = threshold + (envelope - threshold) / ratio;
      compressed = saturated * (gainReduction / envelope);
    }

    // === STAGE 3: Parallel blend ===
    output[i] = saturated * (1 - mix) + compressed * mix;
  }

  // === STAGE 4: Make-up gain — NO CLAMP ===
  const makeupGain = 1 + amount * 1.5;
  for (let i = 0; i < output.length; i++) {
    output[i] = output[i] * makeupGain;
  }

  return output;
}

module.exports = { apply };
