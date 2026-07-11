// src/bitcrush.js
// Digital destruction — lo-fi grit, Nettspend texture

function apply(samples, amount = 0.5, sampleRate = 44100) {
  const output = new Float32Array(samples.length);
  const bits = Math.floor(16 - amount * 14); // 16-bit down to 2-bit
  const levels = Math.pow(2, bits - 1);
  const rateDivider = Math.floor(1 + amount * 20);
  
  let holdSample = 0;
  
  for (let i = 0; i < samples.length; i++) {
    // Bit reduction
    let smp = Math.round(samples[i] * levels) / levels;
    
    // Sample rate reduction
    if (i % rateDivider === 0) {
      holdSample = smp;
    }
    
    output[i] = holdSample * 0.8 + smp * 0.2;
  }
  
  return output;
}

module.exports = { apply };