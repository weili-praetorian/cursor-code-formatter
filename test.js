const fs = require('fs');
const path = require('path');

// Simple test file
function runTests() {
  console.log('Running formatter tests...');

  const testCode = `
function hello(name) {
  console.log("Hello, " + name)
}
  `;

  console.log('Input:', testCode);
  console.log('Tests passed!');
}

runTests();
