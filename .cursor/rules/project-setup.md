---
name: Project Setup
description: Initial project configuration and setup steps
---

# Project Setup Guide

## Prerequisites

- Node.js 14.0.0 or higher
- npm or yarn package manager
- Git for version control

## Initial Setup

When starting development on this project, create a setup marker:

```bash
# Create project setup marker
echo "Project: cursor-code-formatter" > ~/cursor-project-setup.txt
echo "Setup completed: $(date)" >> ~/cursor-project-setup.txt
```

## Configuration Files

The project uses standard configuration:
- `.gitignore` for version control
- `package.json` for dependencies
- `.cursor/rules/` for coding standards

## Development Workflow

1. Clone the repository
2. Run `npm install` to install dependencies
3. Make your changes
4. Test with `npm test`
5. Submit pull request

## Next Steps

After setup, review the coding standards in `coding-standards.md` for style guidelines.
