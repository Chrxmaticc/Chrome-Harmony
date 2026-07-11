// src/notes.js
// Chrome Harmony Note System
// Full modern producer range. Sub bass to bright melody.
// Microtone support. Duration calculator.

const NOTE_FREQUENCIES = {
  // Sub bass — feel it in your chest
  'C1': 32.70, 'Db1': 34.65, 'D1': 36.71, 'Eb1': 38.89, 'E1': 41.20,
  'F1': 43.65, 'Gb1': 46.25, 'G1': 49.00, 'Ab1': 51.91, 'A1': 55.00,
  'Bb1': 58.27, 'B1': 61.74,

  // Low end — 808 territory
  'C2': 65.41, 'Db2': 69.30, 'D2': 73.42, 'Eb2': 77.78, 'E2': 82.41,
  'F2': 87.31, 'Gb2': 92.50, 'G2': 98.00, 'Ab2': 103.83, 'A2': 110.00,
  'Bb2': 116.54, 'B2': 123.47,

  // Mid range — keys, pads, chords
  'C3': 130.81, 'Db3': 138.59, 'D3': 146.83, 'Eb3': 155.56, 'E3': 164.81,
  'F3': 174.61, 'Gb3': 185.00, 'G3': 196.00, 'Ab3': 207.65, 'A3': 220.00,
  'Bb3': 233.08, 'B3': 246.94,

  // Upper mid — leads, bells, plucks
  'C4': 261.63, 'Db4': 277.18, 'D4': 293.66, 'Eb4': 311.13, 'E4': 329.63,
  'F4': 349.23, 'Gb4': 369.99, 'G4': 392.00, 'Ab4': 415.30, 'A4': 440.00,
  'Bb4': 466.16, 'B4': 493.88,

  // High range — bright melodies
  'C5': 523.25, 'Db5': 554.37, 'D5': 587.33, 'Eb5': 622.25, 'E5': 659.25,
  'F5': 698.46, 'Gb5': 739.99, 'G5': 783.99, 'Ab5': 830.61, 'A5': 880.00,
  'Bb5': 932.33, 'B5': 987.77,

  // Presence range — air, shimmer
  'C6': 1046.50, 'Db6': 1108.73, 'D6': 1174.66, 'Eb6': 1244.51, 'E6': 1318.51,
  'F6': 1396.91, 'Gb6': 1479.98, 'G6': 1567.98, 'Ab6': 1661.22, 'A6': 1760.00,
  'Bb6': 1864.66, 'B6': 1975.53,

  // Top end — ear territory
  'C7': 2093.00, 'Db7': 2217.46, 'D7': 2349.32, 'Eb7': 2489.02, 'E7': 2637.02,
  'F7': 2793.83, 'G7': 3135.96, 'A7': 3520.00, 'B7': 3951.07,
  'C8': 4186.01,
};

function getFrequency(noteStr) {
  if (!noteStr) return 440;

  // Microtone support: "C4+50" = C4 + 50 cents, "C4-30" = C4 - 30 cents
  const microMatch = noteStr.match(/^([A-G][b]?\d)([+-]\d+)$/);
  if (microMatch) {
    const baseNote = microMatch[1];
    const cents = parseInt(microMatch[2]);
    const baseFreq = NOTE_FREQUENCIES[baseNote];
    if (!baseFreq) return 261.63;
    return baseFreq * Math.pow(2, cents / 1200);
  }

  const freq = NOTE_FREQUENCIES[noteStr];
  if (!freq) {
    console.warn(`Note not found: ${noteStr}, defaulting to C4`);
    return 261.63;
  }
  return freq;
}

function getDuration(durationStr, bpm) {
  if (!durationStr) return secondsFromBeats(0.25, bpm);

  // Grid-based: line:N (100 lines = 1 second)
  if (durationStr.startsWith('line:')) {
    const lines = parseFloat(durationStr.split(':')[1]);
    return lines * 0.01;
  }

  // Grid-based: hold:N (seconds)
  if (durationStr.startsWith('hold:')) {
    return parseFloat(durationStr.split(':')[1]);
  }

  // Musical durations
  const durations = {
    'whole': 4,
    'half': 2,
    'quarter': 1,
    'eighth': 0.5,
    'sixteenth': 0.25,
    'thirtysecond': 0.125,
    'sixtyfourth': 0.0625,
  };

  const beats = durations[durationStr] || 0.25;
  return secondsFromBeats(beats, bpm);
}

function secondsFromBeats(beats, bpm) {
  return (beats / bpm) * 60;
}

function durationToBeats(duration) {
  const map = {
    'whole': 4,
    'half': 2,
    'quarter': 1,
    'eighth': 0.5,
    'sixteenth': 0.25,
    'thirtysecond': 0.125,
    'sixtyfourth': 0.0625,
  };
  return map[duration] || 0.25;
}

module.exports = { getFrequency, getDuration, durationToBeats, NOTE_FREQUENCIES };
