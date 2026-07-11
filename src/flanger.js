// src/flanger.js
// Jet engine swoosh — Nettspend 808 movement

function apply(samples, amount = 0.5, sampleRate = 44100) {
  const output = new Float32Array(samples.length);
  const maxDelay = Math.floor(0.005 * sampleRate); // 5ms max
  const lfoFreq = 0.2 + amount * 2; // LFO speed
  
  for (let i = 0; i < samples.length; i++) {
    const t = i / sampleRate;
    const lfo = Math.sin(2 * Math.PI * lfoFreq * t) * 0.5 + 0.5;
    const delaySamples = Math.floor(lfo * maxDelay * amount);
    
    if (i >= delaySamples) {
      output[i] = samples[i] * 0.7 + samples[i - delaySamples] * amount * 0.5;
    } else {
      output[i] = samples[i];
    }
  }
  
  return output;
}

module.exports = { apply };