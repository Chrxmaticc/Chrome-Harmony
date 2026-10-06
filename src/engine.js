// src/engine.js
// Chrome Harmony Engine
// Pipeline: parse → render tracks (per-track buffers) → track FX → sidechain
//          → mix to master → master FX → optional normalize → WAV

const parser = require('./parser');
const notes = require('./notes');
const instruments = require('./instruments');
const envelopes = require('./envelopes');
const effects = require('./effects');
const mixer = require('./mixer');
const wavWriter = require('./wav-writer');
const { loadWav } = require('./audio-loader');

function resampleBuffer(samples, factor) {
  // factor > 1 → faster + higher pitch (varispeed)
  // factor < 1 → slower + lower pitch
  const outLen = Math.max(1, Math.floor(samples.length / factor));
  const out = new Float32Array(outLen);
  for (let i = 0; i < outLen; i++) {
    const src = i * factor;
    const i0 = Math.floor(src);
    const i1 = Math.min(i0 + 1, samples.length - 1);
    const frac = src - i0;
    out[i] = samples[i0] * (1 - frac) + samples[i1] * frac;
  }
  return out;
}

class ChromeHarmonyEngine {
  constructor() {
    this.sampleRate = 44100;
    this.imports = {};
  }

  renderString(chString, outputPath) {
    const parsed = parser.parseChString(chString);
    return this._render(parsed, outputPath);
  }

  renderFile(chFilePath, outputPath) {
    // Lazy require so engine.js stays browser-safe.
    const { parseChFile } = require('./io');
    const parsed = parseChFile(chFilePath);
    return this._render(parsed, outputPath);
  }

  _render(parsed, outputPath) {
    const duration = this.calculateDuration(parsed);
    const totalSamples = Math.ceil(duration * this.sampleRate);
    const masterBuffer = new Float32Array(totalSamples);
    const secondsPerBeat = 60 / (parsed.header.tempo || 140);

    this.imports = this.loadImports(parsed);

    const kickEvents = [];
    const trackBuffers = {};

    // ===== Pass 1: render each track into its own buffer =====
    for (const [trackName, trackData] of Object.entries(parsed.tracks)) {
      const trackBuffer = new Float32Array(totalSamples);

      for (const event of trackData.events) {
        if (event.time !== null && event.time !== undefined) {
          const sampleOffset = Math.floor(event.time * this.sampleRate);
          for (const sound of event.sounds) {
            this.renderSound(trackBuffer, sound, sampleOffset, parsed.header.tempo);
            if (sound.instrument && sound.instrument.toLowerCase().includes('kick')) {
              kickEvents.push({ time: event.time });
            }
          }
          continue;
        }

        if (event.beat !== null && event.beat !== undefined) {
          const sampleOffset = Math.floor(event.beat * secondsPerBeat * this.sampleRate);
          for (const sound of event.sounds) {
            this.renderSound(trackBuffer, sound, sampleOffset, parsed.header.tempo);
            if (sound.instrument && sound.instrument.toLowerCase().includes('kick')) {
              kickEvents.push({ time: event.beat * secondsPerBeat });
            }
          }
        }
      }

      trackBuffers[trackName] = trackBuffer;
    }

    // ===== Pass 2: track FX =====
    for (const [trackName, trackBuffer] of Object.entries(trackBuffers)) {
      if (parsed.trackFx && parsed.trackFx[trackName]) {
        const processed = effects.apply(trackBuffer, parsed.trackFx[trackName], this.sampleRate);
        trackBuffers[trackName] = processed;
      }
    }

    // ===== Pass 3: sidechain per track (only tracks with sidechain:true) =====
    if (kickEvents.length > 0) {
      for (const [trackName, trackData] of Object.entries(parsed.tracks)) {
        if (trackData.sidechain) {
          trackBuffers[trackName] = envelopes.sidechain(
            trackBuffers[trackName], kickEvents, this.sampleRate
          );
        }
      }
    }

    // ===== Pass 4: mix to master =====
    for (const trackBuffer of Object.values(trackBuffers)) {
      for (let i = 0; i < masterBuffer.length; i++) {
        masterBuffer[i] += trackBuffer[i];
      }
    }

    // ===== Pass 5: master FX =====
    let final = masterBuffer;
    if (parsed.masterFx && Object.keys(parsed.masterFx).length > 0) {
      final = effects.apply(final, parsed.masterFx, this.sampleRate);
    }

    // ===== Pass 6: normalize (unless header says off) =====
    if (parsed.header.normalize !== 'off') {
      final = mixer.normalize(final);
    }

    const outPath = outputPath || 'output.wav';
    wavWriter.write(outPath, final, this.sampleRate);
    return outPath;
  }

  loadImports(parsed) {
    const map = {};
    for (const imp of parsed.imports || []) {
      if (!imp.file) continue;
      const name = imp.name || imp.file.split(/[\\/]/).pop().replace(/\.[^.]+$/, '');
      try {
        const loaded = loadWav(imp.file);
        map[name] = {
          samples: loaded.samples,
          sourceSampleRate: loaded.sampleRate,
          pitch: imp.pitch || 0,
          sourceBpm: imp.bpm || null,
        };
      } catch (e) {
        console.warn('[ch] import failed:', imp.file, '—', e.message);
      }
    }
    return map;
  }

  renderSound(targetBuffer, sound, sampleOffset, tempo) {
    // ===== IMPORT PATH =====
    if (this.imports && this.imports[sound.instrument]) {
      const imp = this.imports[sound.instrument];
      let factor = 1.0;
      if (imp.sourceBpm && tempo) factor *= tempo / imp.sourceBpm;
      if (imp.pitch)              factor *= Math.pow(2, imp.pitch / 12);

      let stretched = resampleBuffer(imp.samples, factor);

      if (sound.effects && Object.keys(sound.effects).length > 0) {
        stretched = effects.apply(stretched, sound.effects, this.sampleRate);
      }
      mixer.mixInto(targetBuffer, stretched, sampleOffset);
      return;
    }

    // ===== SYNTH PATH =====
    const freq = notes.getFrequency(sound.note);
    const dur = notes.getDuration(sound.duration || 'quarter', tempo);
    const glideFrom = sound.glideFrom ? notes.getFrequency(sound.glideFrom) : null;
    const raw = instruments.generate(sound.instrument, freq, dur, this.sampleRate, glideFrom);

    let processed;
    if (['pad', 'paddark', 'padwarm', 'padairy'].includes(sound.instrument?.toLowerCase())) {
      processed = envelopes.adsr(raw, 0.05, 0.1, 0.7, 0.2, this.sampleRate);
    } else {
      processed = envelopes.apply(raw, 0.003, 0.04, this.sampleRate);
    }

    if (sound.effects && Object.keys(sound.effects).length > 0) {
      processed = effects.apply(processed, sound.effects, this.sampleRate);
    }

    mixer.mixInto(targetBuffer, processed, sampleOffset);
  }

  calculateDuration(parsed) {
    let maxTime = 0;
    const secondsPerBeat = 60 / (parsed.header.tempo || 140);

    for (const trackData of Object.values(parsed.tracks)) {
      for (const event of trackData.events) {
        if (event.time !== null && event.time !== undefined) {
          if (event.time > maxTime) maxTime = event.time;
        }
        if (event.beat !== null && event.beat !== undefined) {
          const t = (event.beat + 1) * secondsPerBeat;
          if (t > maxTime) maxTime = t;
        }
      }
    }

    for (const v of parsed.vocalSpans || []) {
      if (v.end > maxTime) maxTime = v.end;
    }

    return maxTime + 0.5;
  }
}

module.exports = ChromeHarmonyEngine;
