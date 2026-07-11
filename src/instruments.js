// src/instruments.js
// Chrome Harmony Sound Engine v2
// Modern producer instruments. No retro bullshit.
// 63+ instruments total.

function generate(instrument, freq, duration, sampleRate = 44100, glideFrom = null) {
  switch (instrument.toLowerCase()) {

    // ==================== DRUMS ====================
    case 'kick':        return kick(freq, duration, sampleRate);
    case 'kick808':     return kick808(freq, duration, sampleRate);
    case 'kickhard':    return kickHard(freq, duration, sampleRate);
    case 'kickdist':    return kickDistorted(freq, duration, sampleRate);
    case 'kicksoft':    return kickSoft(freq, duration, sampleRate);
    case 'kickrumble':  return kickRumble(freq, duration, sampleRate);
    case 'snare':       return snare(freq, duration, sampleRate);
    case 'snaretrap':   return snareTrap(freq, duration, sampleRate);
    case 'snarerim':    return snareRim(freq, duration, sampleRate);
    case 'snaredist':   return snareDistorted(freq, duration, sampleRate);
    case 'snareghost':  return snareGhost(freq, duration, sampleRate);
    case 'hihat':       return hihat(freq, duration, sampleRate);
    case 'hihatopen':   return hihatOpen(freq, duration, sampleRate);
    case 'hihatroll':   return hihatRoll(freq, duration, sampleRate);
    case 'hihatsoft':   return hihatSoft(freq, duration, sampleRate);
    case 'clap':        return clap(freq, duration, sampleRate);
    case 'claptrap':    return clapTrap(freq, duration, sampleRate);
    case 'crash':       return crash(freq, duration, sampleRate);
    case 'ride':        return ride(freq, duration, sampleRate);
    case 'tom':         return tom(freq, duration, sampleRate);
    case 'tomlow':      return tomLow(freq, duration, sampleRate);
    case 'perc':        return perc(freq, duration, sampleRate);
    case 'percmetal':   return percMetal(freq, duration, sampleRate);
    case 'perctribal':  return percTribal(freq, duration, sampleRate);

    // ==================== BASS ====================
    case 'bass':        return bass(freq, duration, sampleRate);
    case 'bass808':     return bass808(freq, duration, sampleRate, glideFrom);
    case 'bassdist':    return bassDistorted(freq, duration, sampleRate);
    case 'bassreese':   return bassReese(freq, duration, sampleRate);
    case 'bassgrowl':   return bassGrowl(freq, duration, sampleRate);
    case 'basssub':     return bassSub(freq, duration, sampleRate);
    case 'bassslide':   return bassSlide(freq, duration, sampleRate, glideFrom);
    case 'bassfm':      return bassFM(freq, duration, sampleRate);
    case 'basscrush':   return bassCrush(freq, duration, sampleRate);
    case 'basshell':    return bassHell(freq, duration, sampleRate);
    case 'basswarm':    return bassWarm(freq, duration, sampleRate);
    case 'bassdeep':    return bassDeep(freq, duration, sampleRate);
    case 'basspluck':   return bassPluck(freq, duration, sampleRate);

    // ==================== MELODY — MODERN ====================
    case 'keys':        return keys(freq, duration, sampleRate);
    case 'keysdark':    return keysDark(freq, duration, sampleRate);
    case 'keyssoft':    return keysSoft(freq, duration, sampleRate);
    case 'pad':         return pad(freq, duration, sampleRate);
    case 'paddark':     return padDark(freq, duration, sampleRate);
    case 'padwarm':     return padWarm(freq, duration, sampleRate);
    case 'padairy':     return padAiry(freq, duration, sampleRate);
    case 'lead':        return lead(freq, duration, sampleRate);
    case 'leaddist':    return leadDistorted(freq, duration, sampleRate);
    case 'leadsaw':     return leadSaw(freq, duration, sampleRate);
    case 'leadsoft':    return leadSoft(freq, duration, sampleRate);
    case 'pluck':       return pluck(freq, duration, sampleRate);
    case 'pluckdark':   return pluckDark(freq, duration, sampleRate);
    case 'plucksoft':   return pluckSoft(freq, duration, sampleRate);
    case 'bell':        return bell(freq, duration, sampleRate);
    case 'belldark':    return bellDark(freq, duration, sampleRate);
    case 'bellsoft':    return bellSoft(freq, duration, sampleRate);
    case 'string':      return string(freq, duration, sampleRate);
    case 'stringdark':  return stringDark(freq, duration, sampleRate);
    case 'stringsoft':  return stringSoft(freq, duration, sampleRate);
    case 'brass':       return brass(freq, duration, sampleRate);
    case 'brassdark':   return brassDark(freq, duration, sampleRate);
    case 'brasssoft':   return brassSoft(freq, duration, sampleRate);
    case 'flute':       return flute(freq, duration, sampleRate);
    case 'flutedark':   return fluteDark(freq, duration, sampleRate);
    case 'organ':       return organ(freq, duration, sampleRate);
    case 'organdark':   return organDark(freq, duration, sampleRate);
    case 'vox':         return vox(freq, duration, sampleRate);
    case 'voxdark':     return voxDark(freq, duration, sampleRate);
    case 'voxsoft':     return voxSoft(freq, duration, sampleRate);
    case 'choir':       return choir(freq, duration, sampleRate);
    case 'choirdark':   return choirDark(freq, duration, sampleRate);
    case 'choirsoft':   return choirSoft(freq, duration, sampleRate);
    case 'guitar':      return guitar(freq, duration, sampleRate);
    case 'guitardark':  return guitarDark(freq, duration, sampleRate);
    case 'guitarsoft':  return guitarSoft(freq, duration, sampleRate);

    // ==================== FX / EXPERIMENTAL ====================
    case 'fx':          return fx(freq, duration, sampleRate);
    case 'fxrise':      return fxRise(freq, duration, sampleRate);
    case 'fxdown':      return fxDown(freq, duration, sampleRate);
    case 'fxglitch':    return fxGlitch(freq, duration, sampleRate);
    case 'fxnoise':     return fxNoise(freq, duration, sampleRate);
    case 'fxstatic':    return fxStatic(freq, duration, sampleRate);
    case 'fxbuzz':      return fxBuzz(freq, duration, sampleRate);
    case 'fxclick':     return fxClick(freq, duration, sampleRate);
    case 'fxring':      return fxRing(freq, duration, sampleRate);
    case 'fxlaser':     return fxLaser(freq, duration, sampleRate);
    case 'fxzap':       return fxZap(freq, duration, sampleRate);
    case 'fxcrush':     return fxCrush(freq, duration, sampleRate);
    case 'fxearrape':   return fxEarrape(freq, duration, sampleRate);
    case 'fxhell':      return fxHell(freq, duration, sampleRate);
    case 'fxvoid':      return fxVoid(freq, duration, sampleRate);
    case 'fxdemon':     return fxDemon(freq, duration, sampleRate);
    case 'fxscreech':   return fxScreech(freq, duration, sampleRate);
    case 'fxtexture':   return fxTexture(freq, duration, sampleRate);
    case 'fxwash':      return fxWash(freq, duration, sampleRate);
    case 'fxvinyl':     return fxVinyl(freq, duration, sampleRate);
    case 'fxrain':      return fxRain(freq, duration, sampleRate);

    // ==================== DEFAULT ====================
    default:            return keys(freq, duration, sampleRate);
  }
}

// ============================================================
// DRUMS
// ============================================================

function kick(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  const startFreq = freq * 1.5;
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const f = startFreq * Math.exp(-t * 30);
    let smp = Math.sin(2 * Math.PI * f * t);
    smp += Math.sin(2 * Math.PI * f * 0.5 * t) * 0.3;
    smp *= Math.exp(-t * 8);
    smp = Math.tanh(smp * 1.2);
    s[i] = smp * 0.9;
  }
  return s;
}

function kick808(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  const startFreq = freq * 1.3;
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const f = startFreq * Math.exp(-t * 15);
    let smp = Math.sin(2 * Math.PI * f * t);
    smp += Math.sin(2 * Math.PI * f * 2 * t) * 0.4;
    smp += Math.sin(2 * Math.PI * f * 0.5 * t) * 0.5;
    smp = Math.tanh(smp * 1.3);
    const env = t < 0.008 ? t / 0.008 : Math.exp(-t * 4);
    s[i] = smp * env * 0.9;
  }
  return s;
}

function kickHard(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const f = freq * 2 * Math.exp(-t * 35);
    let smp = Math.sin(2 * Math.PI * f * t);
    smp += Math.sin(2 * Math.PI * f * 0.5 * t) * 0.4;
    smp = Math.tanh(smp * 2.5);
    smp *= Math.exp(-t * 12);
    s[i] = smp * 0.9;
  }
  return s;
}

function kickDistorted(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  const startFreq = freq * 1.5;
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const f = startFreq * Math.exp(-t * 25);
    let smp = Math.sin(2 * Math.PI * f * t);
    smp += Math.sin(2 * Math.PI * f * 2 * t) * 0.6;
    smp += Math.sin(2 * Math.PI * f * 3 * t) * 0.3;
    smp = Math.tanh(smp * 4);
    smp *= Math.exp(-t * 10);
    s[i] = smp * 0.85;
  }
  return s;
}

function kickSoft(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  const startFreq = freq * 1.2;
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const f = startFreq * Math.exp(-t * 20);
    let smp = Math.sin(2 * Math.PI * f * t);
    smp += Math.sin(2 * Math.PI * f * 0.5 * t) * 0.6;
    smp *= Math.exp(-t * 5);
    s[i] = smp * 0.7;
  }
  return s;
}

function kickRumble(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const sub = Math.sin(2 * Math.PI * freq * 0.5 * t) * Math.exp(-t * 2) * 0.6;
    const f = freq * 1.3 * Math.exp(-t * 20);
    const hit = Math.sin(2 * Math.PI * f * t) * Math.exp(-t * 8) * 0.7;
    s[i] = (sub + hit) * 0.8;
  }
  return s;
}

function snare(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const tone = Math.sin(2 * Math.PI * 200 * t) * Math.exp(-t * 18) * 0.35;
    const body = Math.sin(2 * Math.PI * 150 * t) * Math.exp(-t * 12) * 0.25;
    const noise = (Math.random() * 2 - 1) * Math.exp(-t * 15) * 0.5;
    s[i] = tone + body + noise;
  }
  return s;
}

function snareTrap(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const tone = Math.sin(2 * Math.PI * 200 * t) * Math.exp(-t * 22) * 0.3;
    const body = Math.sin(2 * Math.PI * 160 * t) * Math.exp(-t * 10) * 0.3;
    const noise = (Math.random() * 2 - 1) * Math.exp(-t * 12) * 0.55;
    let smp = tone + body + noise;
    smp = Math.tanh(smp * 1.5);
    s[i] = smp * 0.8;
  }
  return s;
}

function snareRim(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const stick = Math.sin(2 * Math.PI * 1200 * t) * Math.exp(-t * 50) * 0.5;
    const ring = Math.sin(2 * Math.PI * 800 * t) * Math.exp(-t * 20) * 0.2;
    s[i] = stick + ring;
  }
  return s;
}

function snareDistorted(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const tone = Math.sin(2 * Math.PI * 200 * t) * Math.exp(-t * 16) * 0.4;
    const noise = (Math.random() * 2 - 1) * Math.exp(-t * 10) * 0.6;
    let smp = tone + noise;
    smp = Math.tanh(smp * 3);
    s[i] = smp * 0.8;
  }
  return s;
}

function snareGhost(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const noise = (Math.random() * 2 - 1) * Math.exp(-t * 25) * 0.3;
    const flick = Math.sin(2 * Math.PI * 400 * t) * Math.exp(-t * 30) * 0.15;
    s[i] = noise + flick;
  }
  return s;
}

function hihat(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const noise = (Math.random() * 2 - 1);
    const env = Math.exp(-t * 45);
    const tone = Math.sin(2 * Math.PI * 8000 * t) * env * 0.1;
    s[i] = (noise * env * 0.3) + tone;
  }
  return s;
}

function hihatOpen(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const noise = (Math.random() * 2 - 1);
    const env = Math.exp(-t * 6);
    s[i] = noise * env * 0.35;
  }
  return s;
}

function hihatRoll(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const roll = Math.sin(t * 180) * 0.5 + 0.5;
    const noise = (Math.random() * 2 - 1);
    s[i] = noise * Math.exp(-t * 25) * roll * 0.3;
  }
  return s;
}

function hihatSoft(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const noise = (Math.random() * 2 - 1);
    s[i] = noise * Math.exp(-t * 60) * 0.2;
  }
  return s;
}

function clap(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = (Math.random() * 2 - 1) * Math.exp(-t * 10) * 0.4;
    smp += (Math.random() * 2 - 1) * Math.exp(-(t - 0.015) * 14) * 0.3;
    smp += (Math.random() * 2 - 1) * Math.exp(-(t - 0.03) * 16) * 0.2;
    smp += (Math.random() * 2 - 1) * Math.exp(-(t - 0.045) * 18) * 0.15;
    s[i] = smp * 0.9;
  }
  return s;
}

function clapTrap(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = (Math.random() * 2 - 1) * Math.exp(-t * 8) * 0.5;
    smp += (Math.random() * 2 - 1) * Math.exp(-(t - 0.01) * 10) * 0.4;
    smp = Math.tanh(smp * 1.5);
    s[i] = smp * 0.85;
  }
  return s;
}

function crash(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const tone = Math.sin(2 * Math.PI * freq * t) * Math.exp(-t * 2.5) * 0.25;
    const noise = (Math.random() * 2 - 1) * Math.exp(-t * 4) * 0.55;
    s[i] = (tone + noise) * 0.7;
  }
  return s;
}

function ride(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const tone = Math.sin(2 * Math.PI * freq * 1.5 * t) * Math.exp(-t * 5) * 0.35;
    const ring = Math.sin(2 * Math.PI * freq * 3 * t) * Math.exp(-t * 3) * 0.15;
    const noise = (Math.random() * 2 - 1) * Math.exp(-t * 8) * 0.25;
    s[i] = tone + ring + noise;
  }
  return s;
}

function tom(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const f = freq * Math.exp(-t * 7);
    let smp = Math.sin(2 * Math.PI * f * t);
    smp += Math.sin(2 * Math.PI * f * 1.5 * t) * 0.3;
    smp += Math.sin(2 * Math.PI * f * 0.5 * t) * 0.2;
    smp *= Math.exp(-t * 5);
    s[i] = smp * 0.7;
  }
  return s;
}

function tomLow(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const f = freq * 0.8 * Math.exp(-t * 4);
    let smp = Math.sin(2 * Math.PI * f * t);
    smp += Math.sin(2 * Math.PI * f * 2 * t) * 0.2;
    smp += Math.sin(2 * Math.PI * f * 0.5 * t) * 0.4;
    smp *= Math.exp(-t * 3);
    s[i] = smp * 0.75;
  }
  return s;
}

function perc(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const noise = (Math.random() * 2 - 1) * Math.exp(-t * 20);
    const tone = Math.sin(2 * Math.PI * freq * 2 * t) * Math.exp(-t * 15) * 0.25;
    s[i] = (noise + tone) * 0.45;
  }
  return s;
}

function percMetal(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const ring = Math.sin(2 * Math.PI * freq * 3 * t) * Math.exp(-t * 8);
    const noise = (Math.random() * 2 - 1) * Math.exp(-t * 25) * 0.3;
    s[i] = (ring * 0.5 + noise) * 0.5;
  }
  return s;
}

function percTribal(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const body = Math.sin(2 * Math.PI * freq * 0.8 * t) * Math.exp(-t * 6) * 0.5;
    const hit = Math.sin(2 * Math.PI * freq * 3 * t) * Math.exp(-t * 15) * 0.3;
    s[i] = (body + hit) * 0.6;
  }
  return s;
}

// ============================================================
// BASS
// ============================================================

function bass(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 2 * t) * 0.35;
    smp += Math.sin(2 * Math.PI * freq * 3 * t) * 0.15;
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.5;
    smp = Math.tanh(smp * 1.1);
    s[i] = smp * 0.7;
  }
  return s;
}

function bass808(freq, duration, sampleRate, glideFrom) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  const startFreq = glideFrom || freq * 1.3;
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const f = startFreq + (freq - startFreq) * Math.min(1, t / 0.06);
    let smp = Math.sin(2 * Math.PI * f * t);
    smp += Math.sin(2 * Math.PI * f * 2 * t) * 0.5;
    smp += Math.sin(2 * Math.PI * f * 3 * t) * 0.25;
    smp += Math.sin(2 * Math.PI * f * 0.5 * t) * 0.6;
    smp = Math.tanh(smp * 1.4);
    const env = t < 0.01 ? t / 0.01 : Math.exp(-t * 0.8);
    s[i] = smp * env * 0.85;
  }
  return s;
}

function bassDistorted(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 2 * t) * 0.6;
    smp += Math.sin(2 * Math.PI * freq * 3 * t) * 0.4;
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.5;
    smp = Math.tanh(smp * 3);
    s[i] = smp * Math.exp(-t * 0.5) * 0.8;
  }
  return s;
}

function bassReese(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const detune1 = 0.5 + Math.sin(t * 3) * 0.3;
    const detune2 = 0.5 + Math.cos(t * 2.7) * 0.25;
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * detune1 * t) * 0.7;
    smp += Math.sin(2 * Math.PI * freq * detune2 * t) * 0.5;
    smp += Math.sin(2 * Math.PI * freq * 2 * t) * 0.35;
    smp = Math.tanh(smp * 2);
    s[i] = smp * 0.55;
  }
  return s;
}

function bassGrowl(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const wobble = Math.sin(t * 10) * 0.35 + 0.65;
    let smp = Math.sin(2 * Math.PI * freq * t * wobble);
    smp += Math.sin(2 * Math.PI * freq * 1.5 * t) * 0.5;
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.4;
    smp = Math.tanh(smp * 4);
    s[i] = smp * Math.exp(-t * 0.3) * 0.65;
  }
  return s;
}

function bassSub(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = Math.sin(2 * Math.PI * freq * 0.5 * t);
    smp += Math.sin(2 * Math.PI * freq * t) * 0.2;
    smp = Math.tanh(smp * 1.3);
    s[i] = smp * 0.9;
  }
  return s;
}

function bassSlide(freq, duration, sampleRate, glideFrom) {
  return bass808(freq, duration, sampleRate, glideFrom || freq * 0.7);
}

function bassFM(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const mod = Math.sin(2 * Math.PI * freq * 3 * t) * freq * 2;
    let smp = Math.sin(2 * Math.PI * (freq + mod) * t);
    smp += Math.sin(2 * Math.PI * freq * 2 * t) * 0.3;
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.4;
    smp = Math.tanh(smp * 1.5);
    s[i] = smp * 0.5;
  }
  return s;
}

function bassCrush(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 2 * t) * 0.7;
    smp += Math.sin(2 * Math.PI * freq * 3 * t) * 0.5;
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.4;
    smp = Math.tanh(smp * 6);
    s[i] = smp * Math.exp(-t * 0.4) * 0.7;
  }
  return s;
}

function bassHell(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const scream = Math.sin(t * 40) * 0.4 + 0.6;
    let smp = Math.sin(2 * Math.PI * freq * t * scream);
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.7;
    smp += Math.sin(2 * Math.PI * freq * 3 * t) * 0.5;
    smp = Math.tanh(smp * 8);
    s[i] = smp * Math.exp(-t * 0.2) * 0.65;
  }
  return s;
}

function bassWarm(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 2 * t) * 0.3;
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.7;
    smp = Math.tanh(smp * 1.2);
    const env = Math.exp(-t * 0.4);
    s[i] = smp * env * 0.75;
  }
  return s;
}

function bassDeep(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = Math.sin(2 * Math.PI * freq * 0.5 * t);
    smp += Math.sin(2 * Math.PI * freq * 0.75 * t) * 0.4;
    smp += Math.sin(2 * Math.PI * freq * t) * 0.3;
    smp = Math.tanh(smp * 1.1);
    s[i] = smp * 0.85;
  }
  return s;
}

function bassPluck(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 2 * t) * 0.4;
    smp += Math.sin(2 * Math.PI * freq * 3 * t) * 0.2;
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.3;
    const env = Math.exp(-t * 6);
    s[i] = smp * env * 0.7;
  }
  return s;
}

// ============================================================
// MELODY — MODERN KEYS
// ============================================================

function keys(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 1.8);
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 2 * t) * 0.5;
    smp += Math.sin(2 * Math.PI * freq * 3 * t) * 0.25;
    smp += Math.sin(2 * Math.PI * freq * 4 * t) * 0.12;
    smp += Math.sin(2 * Math.PI * freq * 5 * t) * 0.06;
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.4;
    smp = Math.tanh(smp * 1.3);
    s[i] = smp * env * 0.5;
  }
  return s;
}

function keysDark(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 1.5);
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 2 * t) * 0.45;
    smp += Math.sin(2 * Math.PI * freq * 2.5 * t) * 0.3;
    smp += Math.sin(2 * Math.PI * freq * 3.3 * t) * 0.2;
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.5;
    smp = Math.tanh(smp * 1.5);
    s[i] = smp * env * 0.5;
  }
  return s;
}

function keysSoft(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 1.2);
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 2 * t) * 0.4;
    smp += Math.sin(2 * Math.PI * freq * 3 * t) * 0.15;
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.6;
    s[i] = smp * env * 0.45;
  }
  return s;
}

function pad(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.5;
    smp += Math.sin(2 * Math.PI * freq * 1.5 * t) * 0.3;
    smp += Math.sin(2 * Math.PI * freq * 2 * t) * 0.15;
    s[i] = smp * 0.28;
  }
  return s;
}

function padDark(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.55;
    smp += Math.sin(2 * Math.PI * freq * 0.25 * t) * 0.4;
    smp += Math.sin(2 * Math.PI * freq * 1.3 * t) * 0.25;
    smp += (Math.random() * 2 - 1) * 0.015;
    s[i] = smp * 0.32;
  }
  return s;
}

function padWarm(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.6;
    smp += Math.sin(2 * Math.PI * freq * 0.25 * t) * 0.3;
    smp += Math.sin(2 * Math.PI * freq * 2 * t) * 0.2;
    smp = Math.tanh(smp * 1.2);
    s[i] = smp * 0.3;
  }
  return s;
}

function padAiry(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.4;
    smp += (Math.random() * 2 - 1) * 0.04;
    s[i] = smp * 0.25;
  }
  return s;
}

function lead(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = 0;
    for (let h = 1; h < 10; h++) {
      smp += Math.sin(2 * Math.PI * freq * h * t) / (h * 1.2);
    }
    smp = Math.tanh(smp * 1.5);
    s[i] = smp * 0.35;
  }
  return s;
}

function leadDistorted(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = 0;
    for (let h = 1; h < 14; h++) {
      smp += Math.sin(2 * Math.PI * freq * h * t) / h;
    }
    smp = Math.tanh(smp * 4);
    s[i] = smp * 0.45;
  }
  return s;
}

function leadSaw(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = 0;
    for (let h = 1; h < 16; h++) {
      smp += Math.sin(2 * Math.PI * freq * h * t) / h;
    }
    smp = Math.tanh(smp * 1.8);
    s[i] = smp * 0.4;
  }
  return s;
}

function leadSoft(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 2 * t) * 0.3;
    smp += Math.sin(2 * Math.PI * freq * 3 * t) * 0.15;
    smp += (Math.random() * 2 - 1) * 0.01;
    s[i] = smp * 0.3;
  }
  return s;
}

function pluck(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 7);
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 2 * t) * 0.45;
    smp += Math.sin(2 * Math.PI * freq * 3 * t) * 0.2;
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.3;
    s[i] = smp * env * 0.55;
  }
  return s;
}

function pluckDark(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 5);
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 1.5 * t) * 0.55;
    smp += Math.sin(2 * Math.PI * freq * 2.7 * t) * 0.25;
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.4;
    s[i] = smp * env * 0.5;
  }
  return s;
}

function pluckSoft(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 5);
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 2 * t) * 0.35;
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.5;
    s[i] = smp * env * 0.45;
  }
  return s;
}

function bell(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 2.5);
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 2.1 * t) * 0.5;
    smp += Math.sin(2 * Math.PI * freq * 3.5 * t) * 0.35;
    smp += Math.sin(2 * Math.PI * freq * 5.2 * t) * 0.2;
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.3;
    s[i] = smp * env * 0.5;
  }
  return s;
}

function bellDark(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 1.8);
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 1.7 * t) * 0.6;
    smp += Math.sin(2 * Math.PI * freq * 3.1 * t) * 0.4;
    smp += Math.sin(2 * Math.PI * freq * 4.8 * t) * 0.25;
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.35;
    s[i] = smp * env * 0.45;
  }
  return s;
}

function bellSoft(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 1.5);
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 2 * t) * 0.4;
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.5;
    s[i] = smp * env * 0.4;
  }
  return s;
}

function string(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 1.3);
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 2 * t) * 0.45;
    smp += Math.sin(2 * Math.PI * freq * 3 * t) * 0.22;
    smp += Math.sin(2 * Math.PI * freq * 4 * t) * 0.1;
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.35;
    s[i] = smp * env * 0.4;
  }
  return s;
}

function stringDark(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 1.1);
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 1.4 * t) * 0.5;
    smp += Math.sin(2 * Math.PI * freq * 2.3 * t) * 0.3;
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.4;
    smp += (Math.random() * 2 - 1) * 0.015;
    s[i] = smp * env * 0.45;
  }
  return s;
}

function stringSoft(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 0.8);
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 2 * t) * 0.35;
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.5;
    s[i] = smp * env * 0.35;
  }
  return s;
}

function brass(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = 0;
    for (let h = 1; h < 12; h += 2) {
      smp += Math.sin(2 * Math.PI * freq * h * t) / h;
    }
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.3;
    smp = Math.tanh(smp * 1.6);
    s[i] = smp * 0.4;
  }
  return s;
}

function brassDark(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = 0;
    for (let h = 1; h < 14; h += 2) {
      smp += Math.sin(2 * Math.PI * freq * h * t) / h;
    }
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.4;
    smp = Math.tanh(smp * 2.5);
    s[i] = smp * 0.45;
  }
  return s;
}

function brassSoft(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 3 * t) * 0.3;
    smp += Math.sin(2 * Math.PI * freq * 5 * t) * 0.15;
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.4;
    s[i] = smp * 0.35;
  }
  return s;
}

function flute(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 0.4);
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 2 * t) * 0.12;
    smp += Math.sin(2 * Math.PI * freq * 3 * t) * 0.04;
    smp += (Math.random() * 2 - 1) * 0.02;
    s[i] = smp * env * 0.3;
  }
  return s;
}

function fluteDark(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 0.35);
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 1.5 * t) * 0.15;
    smp += (Math.random() * 2 - 1) * 0.025;
    s[i] = smp * env * 0.32;
  }
  return s;
}

function organ(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = 0;
    for (let h = 1; h < 7; h++) {
      smp += Math.sin(2 * Math.PI * freq * h * t) * (1 / h);
    }
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.3;
    smp = Math.tanh(smp * 1.1);
    s[i] = smp * 0.35;
  }
  return s;
}

function organDark(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = 0;
    for (let h = 1; h < 9; h++) {
      smp += Math.sin(2 * Math.PI * freq * h * t) * (1 / h);
    }
    smp += Math.sin(2 * Math.PI * freq * 1.3 * t) * 0.4;
    smp = Math.tanh(smp * 1.8);
    s[i] = smp * 0.4;
  }
  return s;
}

function vox(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const formant = Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.4 + 0.6;
    let smp = Math.sin(2 * Math.PI * freq * t * formant);
    smp += Math.sin(2 * Math.PI * freq * 2 * t) * 0.25;
    smp += Math.sin(2 * Math.PI * freq * 3 * t) * 0.12;
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.4;
    s[i] = smp * 0.3;
  }
  return s;
}

function voxDark(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const growl = Math.sin(t * 18) * 0.35 + 0.65;
    let smp = Math.sin(2 * Math.PI * freq * t * growl);
    smp += Math.sin(2 * Math.PI * freq * 1.5 * t) * 0.4;
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.5;
    smp = Math.tanh(smp * 2.5);
    s[i] = smp * 0.35;
  }
  return s;
}

function voxSoft(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 2 * t) * 0.2;
    smp += (Math.random() * 2 - 1) * 0.015;
    s[i] = smp * 0.25;
  }
  return s;
}

function choir(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 1.005 * t) * 0.7;
    smp += Math.sin(2 * Math.PI * freq * 2 * t) * 0.35;
    smp += Math.sin(2 * Math.PI * freq * 3 * t) * 0.18;
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.4;
    s[i] = smp * 0.3;
  }
  return s;
}

function choirDark(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 0.995 * t) * 0.7;
    smp += Math.sin(2 * Math.PI * freq * 1.5 * t) * 0.45;
    smp += Math.sin(2 * Math.PI * freq * 2.4 * t) * 0.25;
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.5;
    smp = Math.tanh(smp * 1.3);
    s[i] = smp * 0.35;
  }
  return s;
}

function choirSoft(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 1.003 * t) * 0.6;
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.5;
    s[i] = smp * 0.25;
  }
  return s;
}

function guitar(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 3);
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 2 * t) * 0.4;
    smp += Math.sin(2 * Math.PI * freq * 3 * t) * 0.2;
    smp += Math.sin(2 * Math.PI * freq * 4 * t) * 0.1;
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.3;
    smp += (Math.random() * 2 - 1) * 0.01;
    s[i] = smp * env * 0.45;
  }
  return s;
}

function guitarDark(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 2.5);
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 1.5 * t) * 0.5;
    smp += Math.sin(2 * Math.PI * freq * 2.5 * t) * 0.3;
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.4;
    smp = Math.tanh(smp * 1.8);
    s[i] = smp * env * 0.5;
  }
  return s;
}

function guitarSoft(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 2);
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 2 * t) * 0.3;
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.5;
    s[i] = smp * env * 0.35;
  }
  return s;
}

// ============================================================
// FX
// ============================================================

function fx(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const sweep = freq * (0.5 + t * 2);
    let smp = Math.sin(2 * Math.PI * sweep * t);
    smp += (Math.random() * 2 - 1) * 0.2;
    s[i] = smp * Math.exp(-t) * 0.45;
  }
  return s;
}

function fxRise(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const f = freq * (0.2 + t * 8);
    let smp = Math.sin(2 * Math.PI * f * t);
    smp += (Math.random() * 2 - 1) * t * 0.25;
    s[i] = smp * Math.min(1, t * 3) * 0.45;
  }
  return s;
}

function fxDown(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const f = freq * (3 - t * 5);
    s[i] = Math.sin(2 * Math.PI * Math.max(20, f) * t) * Math.exp(-t * 0.5) * 0.45;
  }
  return s;
}

function fxGlitch(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const glitch = Math.sin(t * 100) > 0 ? 1 : 0;
    let smp = Math.sin(2 * Math.PI * freq * t * glitch);
    s[i] = smp * 0.45;
  }
  return s;
}

function fxNoise(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    s[i] = (Math.random() * 2 - 1) * 0.4;
  }
  return s;
}

function fxStatic(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    s[i] = (Math.random() * 2 - 1) * Math.exp(-t * 3) * 0.5;
  }
  return s;
}

function fxBuzz(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = 0;
    for (let h = 1; h < 20; h += 2) {
      smp += Math.sin(2 * Math.PI * freq * h * t) / h;
    }
    s[i] = Math.tanh(smp * 2.5) * 0.25;
  }
  return s;
}

function fxClick(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    s[i] = Math.sin(2 * Math.PI * 2000 * t) * Math.exp(-t * 80) * 0.5;
  }
  return s;
}

function fxRing(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const ring = Math.sin(2 * Math.PI * freq * t);
    const mod = Math.sin(2 * Math.PI * freq * 1.7 * t);
    s[i] = ring * mod * Math.exp(-t * 1.8) * 0.45;
  }
  return s;
}

function fxLaser(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const f = freq * (5 - t * 10);
    s[i] = Math.sin(2 * Math.PI * Math.max(100, f) * t) * Math.exp(-t * 3.5) * 0.35;
  }
  return s;
}

function fxZap(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const zaps = [100, 300, 600, 1200, 2400];
    let smp = 0;
    for (let z = 0; z < zaps.length; z++) {
      smp += Math.sin(2 * Math.PI * zaps[z] * t * (z + 1)) * Math.exp(-t * (10 + z * 5)) * 0.12;
    }
    s[i] = smp * 0.45;
  }
  return s;
}

function fxCrush(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 2 * t) * 0.45;
    smp = Math.tanh(smp * 5);
    s[i] = smp * Math.exp(-t) * 0.5;
  }
  return s;
}

function fxEarrape(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = 0;
    for (let h = 1; h < 25; h++) {
      smp += Math.sin(2 * Math.PI * freq * h * t) / h;
    }
    smp = Math.tanh(smp * 10);
    s[i] = Math.max(-0.9, Math.min(0.9, smp * 0.85));
  }
  return s;
}

function fxHell(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const demon = Math.sin(t * 25) * 0.4 + 0.6;
    let smp = Math.sin(2 * Math.PI * freq * t * demon);
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.7;
    smp += Math.sin(2 * Math.PI * freq * 3 * t) * 0.5;
    smp += (Math.random() * 2 - 1) * demon * 0.4;
    smp = Math.tanh(smp * 8);
    s[i] = smp * Math.exp(-t * 0.12) * 0.75;
  }
  return s;
}

function fxVoid(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const emptiness = Math.sin(t * 0.4) * 0.4 + 0.6;
    let smp = Math.sin(2 * Math.PI * freq * 0.25 * t);
    smp += (Math.random() * 2 - 1) * emptiness * 0.25;
    s[i] = smp * emptiness * 0.35;
  }
  return s;
}

function fxDemon(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const scream = Math.sin(t * 50) * 0.4 + 0.6;
    const growl = Math.sin(t * 7) * 0.4 + 0.6;
    let smp = Math.sin(2 * Math.PI * freq * t * scream);
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t * growl) * 0.7;
    smp += Math.sin(2 * Math.PI * freq * 3 * t) * 0.6;
    smp += (Math.random() * 2 - 1) * scream * 0.5;
    smp = Math.tanh(smp * 10);
    s[i] = smp * 0.75;
  }
  return s;
}

function fxScreech(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const f = freq * (0.5 + Math.sin(t * 35) * 3);
    let smp = Math.sin(2 * Math.PI * Math.abs(f) * t);
    smp = Math.tanh(smp * 5);
    s[i] = smp * 0.6;
  }
  return s;
}

function fxTexture(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const grain = Math.sin(t * freq * 0.01) * 0.5 + 0.5;
    let smp = Math.sin(2 * Math.PI * freq * t * grain);
    smp += (Math.random() * 2 - 1) * 0.15;
    s[i] = smp * 0.3;
  }
  return s;
}

function fxWash(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = Math.sin(2 * Math.PI * freq * t);
    smp += Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.5;
    smp += (Math.random() * 2 - 1) * 0.08;
    s[i] = smp * Math.exp(-t * 0.3) * 0.35;
  }
  return s;
}

function fxVinyl(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const crackle = (Math.random() * 2 - 1) * Math.exp(-t * 0.5) * 0.15;
    const warmth = Math.sin(2 * Math.PI * freq * 0.5 * t) * 0.2;
    s[i] = crackle + warmth;
  }
  return s;
}

function fxRain(freq, duration, sampleRate) {
  const n = Math.floor(duration * sampleRate);
  const s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    let smp = 0;
    const drops = 8;
    for (let d = 0; d < drops; d++) {
      const dropTime = (d / drops) * duration + (Math.random() * 0.02);
      const dist = Math.abs(t - dropTime);
      smp += (Math.random() * 2 - 1) * Math.exp(-dist * 200) * 0.3;
    }
    s[i] = smp * 0.35;
  }
  return s;
}

module.exports = { generate };
