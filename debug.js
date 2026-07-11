
const fs = require('fs');
const content = fs.readFileSync('chrx.ch', 'utf-8');
const clean = content.replace(/\/\/.*$/gm, '');
const scoreMatch = clean.match(/\[SCORE\]([\s\S]*?)\[\/SCORE\]/i);
console.log('Score found:', !!scoreMatch);
if (scoreMatch) {
  console.log('Score length:', scoreMatch[1].length, 'chars');
  console.log('First 200 chars:', scoreMatch[1].trim().substring(0, 200));
  const lines = scoreMatch[1].trim().split('\n').filter(l => l.trim() && !l.trim().startsWith('//'));
  console.log('Non-comment lines:', lines.length);
  if (lines.length > 0) {
    console.log('First line:', lines[0]);
    const m = lines[0].match(/^(\w+):(\S+)\s+(\w+)(.*)/);
    console.log('First line match:', m ? 'PASS' : 'FAIL');
  }
}