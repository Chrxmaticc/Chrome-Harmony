// src/effects.js
// Chrome Harmony Effects Engine
// Chain order: GAIN → DESTRUCTION → MOVEMENT → SPACE → TONE
// Destruction happens BEFORE space, so reverb tails are clean.
// Squash no longer clamps at 0.95 — hardclip is the only limiter.

const crush = require('./crush');
const flanger = require('./flanger');
const phaser = require('./phaser');
const bitcrush = require('./bitcrush');
const tapestop = require('./tapestop');

function apply(samples, effectParams, sampleRate = 44100) {
  if (!effectParams || Object.keys(effectParams).length === 0) return samples;
  let processed = samples;

  // === GAIN ===
  if (effectParams.volume !== undefined) processed = gain(processed, effectParams.volume);

  // === DESTRUCTION ===
  if (effectParams.distort)   processed = distort(processed, effectParams.distort);
  if (effectParams.crush !== undefined)     processed = crush.apply(processed, effectParams.crush, sampleRate);
  if (effectParams.bitcrush !== undefined)  processed = bitcrush.apply(processed, effectParams.bitcrush, sampleRate);
  if (effectParams.hardclip !== undefined)  processed = hardclip(processed, effectParams.hardclip);
  if (effectParams.chop)      processed = chop(processed, effectParams.chop);
  if (effectParams.squash !== undefined)    processed = squash(processed, effectParams.squash, sampleRate);

  // === MOVEMENT ===
  if (effectParams.flanger !== undefined)   processed = flanger.apply(processed, effectParams.flanger, sampleRate);
  if (effectParams.phaser !== undefined)    processed = phaser.apply(processed, effectParams.phaser, sampleRate);
  if (effectParams.tapestop !== undefined)  processed = tapestop.apply(processed, effectParams.tapestop, sampleRate);

  // === SPACE ===
  if (effectParams.reverb)    processed = reverb(processed, effectParams.reverb, sampleRate);
  if (effectParams.delay)     processed = delay(processed, effectParams.delay, sampleRate);
  if (effectParams.width !== undefined)     processed = width(processed, effectParams.width);

  // === TONE SHAPING ===
  if (effectParams.filter !== undefined)    processed = filter(processed, effectParams.filter);
  if (effectParams.richness)  processed = richness(processed, effectParams.richness);

  return processed;
}

// ============================================================
// GAIN
// ============================================================
function gain(samples, level) {
  const output = new Float32Array(samples.length);
  const safeLevel = Math.max(0, Math.min(3.0, level));
  for (let i = 0; i < samples.length; i++) {
    output[i] = samples[i] * safeLevel;
  }
  return output;
}

// ============================================================
// DESTRUCTION
// ============================================================

// Distortion — smooth tanh drive. Warm, not broken.
function distort(samples, amount) {
  const output = new Float32Array(samples.length);
  const drive = 1 + amount * 20;
  for (let i = 0; i < samples.length; i++) {
    output[i] = Math.tanh(samples[i] * drive) / Math.tanh(drive);
  }
  return output;
}

// HARD CLIP — the dariacore sound. Flat-top, no soft knee, no mercy.
// amount 0 → threshold 1.0 (nothing clipped)
// amount 1 → threshold 0.3 (everything shredded)
function hardclip(samples, amount) {
  const a = Math.max(0, Math.min(1, amount));
  const threshold = 1.0 - a * 0.7;
  const out = new Float32Array(samples.length);
  for (let i = 0; i < samples.length; i++) {
    const x = samples[i];
    out[i] = x > threshold ? threshold : (x < -threshold ? -threshold : x);
  }
  return out;
}

// Chop — glitch stutter
function chop(samples, amount) {
  const output = new Float32Array(samples.length);
  const chopRate = Math.floor(2 + amount * 20);
  const chopLength = Math.floor(samples.length / chopRate);
  if (chopLength <= 0) return samples;
  for (let i = 0; i < samples.length; i++) {
    const chopIndex = Math.floor(i / chopLength);
    output[i] = (chopIndex % 2 === 0) ? samples[i] : 0;
  }
  return output;
}

// Squash — compressor. No longer clamps at 0.95 — hardclip handles limiting now.
function squash(samples, amount, sampleRate) {
  const output = new Float32Array(samples.length);
  const threshold = 0.3 - amount * 0.25;
  const ratio = 1 + amount * 5;
  const attackSamples = Math.max(1, Math.floor(0.002 * sampleRate));
  const releaseSamples = Math.max(1, Math.floor(0.08 * sampleRate));

  let envelope = 0;

  for (let i = 0; i < samples.length; i++) {
    const absSample = Math.abs(samples[i]);

    if (absSample > envelope) {
      envelope += (absSample - envelope) / attackSamples;
    } else {
      envelope += (absSample - envelope) / releaseSamples;
    }

    if (envelope > threshold) {
      const gainReduction = threshold + (envelope - threshold) / ratio;
      output[i] = samples[i] * (gainReduction / envelope);
    } else {
      output[i] = samples[i];
    }
  }

  // Make-up gain — no clamp. Let it clip. That's the point.
  const makeup = 1 + amount * 0.8;
  for (let i = 0; i < output.length; i++) {
    output[i] = output[i] * makeup;
  }

  return output;
}

// ============================================================
// SPACE
// ============================================================

function reverb(samples, amount, sampleRate) {
  const delaySamples = Math.floor(0.03 * sampleRate);
  const output = new Float32Array(samples.length);
  const decay = amount * 0.6;
  for (let i = 0; i < samples.length; i++) {
    output[i] = samples[i];
    if (i >= delaySamples) {
      output[i] += output[i - delaySamples] * decay;
    }
  }
  return output;
}

function delay(samples, amount, sampleRate) {
  const delaySamples = Math.floor(0.15 * sampleRate);
  const output = new Float32Array(samples.length);
  const feedback = amount * 0.4;
  for (let i = 0; i < samples.length; i++) {
    output[i] = samples[i];
    if (i >= delaySamples) {
      output[i] += output[i - delaySamples] * feedback;
    }
  }
  return output;
}

function width(samples, amount) {
  const output = new Float32Array(samples.length);
  for (let i = 0; i < samples.length; i++) {
    const spread = amount * 0.5;
    const shifted = (i > 0) ? samples[i - 1] * spread : samples[i] * (1 - spread);
    output[i] = samples[i] * (1 - spread) + shifted;
  }
  return output;
}

// ============================================================
// TONE SHAPING
// ============================================================

function filter(samples, amount) {
  const output = new Float32Array(samples.length);
  let prev = 0;
  const lowpassAmount = 1 - amount;
  for (let i = 0; i < samples.length; i++) {
    prev = prev + lowpassAmount * (samples[i] - prev);
    output[i] = prev * (1 - amount) + samples[i] * amount;
  }
  return output;
}

function richness(samples, amount) {
  const output = new Float32Array(samples.length);
  for (let i = 0; i < samples.length; i++) {
    let s = samples[i];
    s = Math.tanh(s * (1 + amount * 2)) * (0.8 + amount * 0.4);
    output[i] = s;
  }
  return output;
}

module.exports = { apply, hardclip };
