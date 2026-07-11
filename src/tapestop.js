// src/tapestop.js
// Pitch drop / slowdown — beat stops, Nettspend transitions

function apply(samples, amount = 0.5, sampleRate = 44100) {
  const output = new Float32Array(samples.length);
  const startSpeed = 1.0;
  const endSpeed = 1.0 - amount * 0.95; // 1.0 down to 0.05
  const duration = samples.length / sampleRate;
  
  let readPos = 0;
  
  for (let i = 0; i < samples.length; i++) {
    const t = i / sampleRate;
    const progress = t / duration;
    const currentSpeed = startSpeed + (endSpeed - startSpeed) * progress;
    
    readPos += currentSpeed;
    const readIndex = Math.floor(readPos);
    
    if (readIndex < samples.length) {
      output[i] = samples[readIndex] * (1 - progress);
    }
  }
  
  return output;
}

module.exports = { apply };