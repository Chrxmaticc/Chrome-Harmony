// src/audio-loader.js
// Decodes WAV files to mono Float32. Node-only.
// In the browser, replace with AudioContext.decodeAudioData + channel averaging.

const fs = require('fs');

function loadWav(filePath) {
  const buf = fs.readFileSync(filePath);
  if (buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WAVE') {
    throw new Error('Not a WAV: ' + filePath);
  }

  let offset = 12, fmt = null, dataOffset = 0, dataLength = 0;

  while (offset < buf.length) {
    const id = buf.toString('ascii', offset, offset + 4);
    const size = buf.readUInt32LE(offset + 4);
    const start = offset + 8;

    if (id === 'fmt ') {
      fmt = {
        audioFormat: buf.readUInt16LE(start),
        channels: buf.readUInt16LE(start + 2),
        sampleRate: buf.readUInt32LE(start + 4),
        bitsPerSample: buf.readUInt16LE(start + 14),
      };
    } else if (id === 'data') {
      dataOffset = start;
      dataLength = size;
      break;
    }
    offset = start + size + (size % 2);
  }

  if (!fmt || !dataOffset) throw new Error('Malformed WAV: ' + filePath);

  const { channels, sampleRate, bitsPerSample, audioFormat } = fmt;
  const bps = bitsPerSample / 8;
  const frames = Math.floor(dataLength / (bps * channels));
  const mono = new Float32Array(frames);

  for (let i = 0; i < frames; i++) {
    let sum = 0;
    for (let c = 0; c < channels; c++) {
      const idx = dataOffset + (i * channels + c) * bps;
      let v;
      if (bitsPerSample === 16) {
        v = buf.readInt16LE(idx) / 32768;
      } else if (bitsPerSample === 32) {
        v = (audioFormat === 3)
          ? buf.readFloatLE(idx)
          : buf.readInt32LE(idx) / 2147483648;
      } else if (bitsPerSample === 8) {
        v = (buf.readUInt8(idx) - 128) / 128;
      } else if (bitsPerSample === 24) {
        let n = (buf.readUInt8(idx + 2) << 16) | (buf.readUInt8(idx + 1) << 8) | buf.readUInt8(idx);
        if (n & 0x800000) n |= 0xFF000000;
        v = n / 8388608;
      } else {
        throw new Error('Unsupported bit depth: ' + bitsPerSample);
      }
      sum += v;
    }
    mono[i] = sum / channels;
  }

  return { samples: mono, sampleRate, channels };
}

module.exports = { loadWav };
