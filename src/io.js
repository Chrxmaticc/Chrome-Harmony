// src/io.js
// Owns all filesystem access for Chrome Harmony.
// Everything else in src/ stays pure and portable.

const fs = require('fs');
const path = require('path');
const parser = require('./parser');

function parseChFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return parser.parseChString(content);
}

function resolveImportPath(importPath, baseDir) {
  if (path.isAbsolute(importPath)) return importPath;
  return path.resolve(baseDir || process.cwd(), importPath);
}

module.exports = { parseChFile, resolveImportPath };
