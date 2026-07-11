// src/crush.js
// Perceived loudness effect — sounds huge, ears safe

function apply(samples, amount = 0.5, sampleRate = 44100) {
  const output = new Float32Array(samples.length);
  const drive = 1 + amount * 3;
  const mix = 0.3 + amount * 0.5;
  
  // Attack/release times for compressor
  const attackSamples = Math.floor(0.002 * sampleRate);   // 2ms
  const releaseSamples = Math.floor(0.08 * sampleRate);    // 80ms
  
  let envelope = 0;
  const threshold = 0.3 - amount * 0.2;
  const ratio = 1 + amount * 3;
  
  for (let i = 0; i < samples.length; i++) {
    // === STAGE 1: Saturation ===
    let saturated = Math.tanh(samples[i] * drive) / Math.tanh(drive);
    
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
    
    // === STAGE 4: Soft clip safety ===
    output[i] = Math.tanh(output[i] * 1.2);
  }
  
  // Make-up gain to restore perceived loudness
  const makeupGain = 1 + amount * 1.5;
  for (let i = 0; i < output.length; i++) {
    output[i] = Math.max(-0.95, Math.min(0.95, output[i] * makeupGain));
  }
  
  return output;
}

module.exports = { apply };