#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { normalizeIndentation, normalizeQuotes, addSemicolons } = require('./utils');

/**
 * Simple JavaScript code formatter
 * Enforces consistent indentation and quote style
 */

function formatCode(code) {
  // Use utility functions for formatting
  let formatted = normalizeQuotes(code, 'single');
  formatted = addSemicolons(formatted);
  formatted = normalizeIndentation(formatted, 2);

  return formatted;
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node formatter.js <input-file>');
    process.exit(1);
  }

  const inputFile = args[0];

  try {
    const code = fs.readFileSync(inputFile, 'utf8');
    const formatted = formatCode(code);

    const outputFile = inputFile.replace(/\.js$/, '.formatted.js');
    fs.writeFileSync(outputFile, formatted);

    console.log(`Formatted code written to: ${outputFile}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();
