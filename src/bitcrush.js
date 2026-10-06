// src/bitcrush.js
// Digital destruction — lo-fi grit, full sample-and-hold, 1-bit floor.

function apply(samples, amount = 0.5, sampleRate = 44100) {
  const output = new Float32Array(samples.length);

  // 16-bit down to 1-bit as amount goes 0 → 1
  const bits = Math.max(1, Math.floor(16 - amount * 15));
  const levels = Math.pow(2, bits - 1);
  const rateDivider = Math.max(1, Math.floor(1 + amount * 20));

  let holdSample = 0;

  for (let i = 0; i < samples.length; i++) {
    // Bit reduction
    const smp = Math.round(samples[i] * levels) / levels;

    // Full sample-and-hold
    if (i % rateDivider === 0) {
      holdSample = smp;
    }

    output[i] = holdSample;
  }

  return output;
}

module.exports = { apply };
