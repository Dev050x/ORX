# orx

`orx` is a command-line AI coding agent built with Bun, TypeScript, and the Vercel AI SDK. It allows users to interact with AI models directly from the terminal to execute shell commands, manage files, and interact with various AI providers.

## Features

- **Interactive TUI Mode**: Launch an interactive command line interface to chat with the agent.
- **CLI Commands**: Execute single prompts or manage provider configurations directly from the terminal.
- **Provider Management**: Configure, login, logout, and set default AI providers and models.
- **Autonomous Tool Execution**: Equipped with shell command execution capabilities to read, create, update, and delete workspace files.

## Prerequisites

- [Bun](https://bun.com) (v1.0.0 or higher recommended)
- API key for supported AI providers (e.g., Google Generative AI / Gemini API key)

## Installation

Clone the repository and install dependencies:

```bash
bun install
```

## Configuration

`orx` stores provider credentials and settings in `~/.orx/auth.json`.

### Login to a Provider

Save an API key for a specific provider:

```bash
bun run index.ts providers login -p gemini -a YOUR_API_KEY
```

### Set Default Provider and Model

Specify the active provider and model:

```bash
bun run index.ts providers set google/gemini-2.5-flash
```

### List Supported Providers and Models

View available providers and model presets:

```bash
bun run index.ts providers list
```

### Logout

Remove authentication configuration for a provider:

```bash
bun run index.ts providers logout -p gemini
```

## Usage

### Interactive TUI Mode

Run `orx` without additional arguments to enter the interactive TUI shell:

```bash
bun run index.ts
```

Within the shell, type your requests or prompt commands. Type `exit` to quit.

### Single Prompt Mode

Run a single prompt through the agent command line interface:

```bash
bun run index.ts agent -p "List all files in the current directory and check git status"
```

## Project Structure

```
orx/
├── index.ts                 # CLI entrypoint and interactive TUI interface
├── commands/
│   ├── agent/               # Agent prompt command implementation
│   └── providers/           # Provider authentication and configuration commands
├── utils/
│   ├── ai.ts                # AI SDK integration, streaming, and shell tool execution
│   └── config.ts            # Configuration and auth storage helpers (~/.orx/auth.json)
├── package.json             # Dependencies and project metadata
└── tsconfig.json            # TypeScript configuration
```

## Development

To run the project:

```bash
bun run index.ts
```

## License

MIT
