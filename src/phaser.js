// src/phaser.js
// Sweeping metallic movement — dark melody texture

function apply(samples, amount = 0.5, sampleRate = 44100) {
  const output = new Float32Array(samples.length);
  const lfoFreq = 0.1 + amount * 1.5;
  const stages = 4;
  
  for (let i = 0; i < samples.length; i++) {
    const t = i / sampleRate;
    const lfo = Math.sin(2 * Math.PI * lfoFreq * t) * 0.5 + 0.5;
    const notchFreq = 500 + lfo * 2000 * amount;
    
    let smp = samples[i];
    for (let s = 0; s < stages; s++) {
      const phaseShift = (s / stages) * Math.PI;
      const allpass = Math.sin(2 * Math.PI * notchFreq * t + phaseShift) * amount * 0.3;
      smp += allpass * (1 - s / stages);
    }
    
    output[i] = samples[i] * (1 - amount * 0.5) + smp * amount * 0.5;
  }
  
  return output;
}

module.exports = { apply };