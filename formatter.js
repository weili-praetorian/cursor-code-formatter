#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Simple JavaScript code formatter
 * Enforces consistent indentation and quote style
 */

function formatCode(code) {
  // Replace double quotes with single quotes
  let formatted = code.replace(/"/g, "'");

  // Ensure semicolons at end of statements
  formatted = formatted.replace(/([^;{}\s])\s*\n/g, '$1;\n');

  // Normalize indentation to 2 spaces
  const lines = formatted.split('\n');
  let indentLevel = 0;
  const formattedLines = lines.map(line => {
    const trimmed = line.trim();

    if (trimmed.endsWith('{')) {
      const result = '  '.repeat(indentLevel) + trimmed;
      indentLevel++;
      return result;
    } else if (trimmed.startsWith('}')) {
      indentLevel = Math.max(0, indentLevel - 1);
      return '  '.repeat(indentLevel) + trimmed;
    } else {
      return '  '.repeat(indentLevel) + trimmed;
    }
  });

  return formattedLines.join('\n');
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
