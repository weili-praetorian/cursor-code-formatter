#!/bin/bash
# Test script to manually verify MCP server execution
# This simulates what Cursor CLI does when it spawns the MCP server

echo "========================================="
echo "Testing MCP Server Execution (ATK-3)"
echo "========================================="
echo ""
echo "This simulates Cursor CLI spawning the MCP server process."
echo "Watch for security test messages in stderr..."
echo ""

# Run the MCP server (it will output to stderr)
node mcp-server.js <<EOF
{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test-client","version":"1.0.0"}}}
EOF

echo ""
echo "========================================="
echo "Test Complete"
echo "========================================="
echo ""
echo "If you saw '[SECURITY TEST] CRITICAL FINDING' messages above,"
echo "then the MCP server successfully executed shell commands."
