# AGENTS.md

This file provides guidance to coding agents working in this repository.

## Project Overview

MDence is a VS Code/Cursor extension that opens Markdown files in a block-based custom editor with a Confluence-like editing experience while keeping files stored as plain Markdown.

## Build Commands

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Watch mode for development
npm run dev

# Lint all packages
npm run lint

# Run tests
npm run test

# Security audit
npm run audit

# Package the extension for distribution
npm run package

# Build specific package
npm run build --workspace=packages/extension-host
npm run build --workspace=packages/webview-ui
```

## Development Workflow

1. Run `npm run dev` to start watch mode for all packages
2. Press `F5` in VS Code to launch the Extension Development Host
3. Use `Run MDence Extension (with build)` when you want a fresh build before launch
4. Open any `.md` file to test the custom editor

## Architecture

### Monorepo Structure

- `packages/extension-host/` contains the VS Code extension host
- `packages/webview-ui/` contains the React UI running in the webview
- `packages/shared/` contains shared TypeScript types for the messaging protocol

### Data Flow

```text
User ⇄ Webview (Lexical) ⇄ postMessage ⇄ Extension Host ⇄ TextDocument
              ↓                              ↓
        mdast mapper                   WorkspaceEdit
```

### Key Files

- `packages/extension-host/src/customEditor.ts` custom editor provider, webview initialization, and host-side message handling
- `packages/webview-ui/src/app/App.tsx` main React state and message wiring
- `packages/webview-ui/src/app/mapper/` mdast and Lexical conversion
- `packages/webview-ui/src/app/editor/` editor configuration, toolbar, slash menu, and drag handles
- `packages/webview-ui/src/app/editor/nodes/` custom Lexical nodes such as callouts, toggles, and images
- `packages/shared/src/index.ts` shared message schemas and types

### Messaging Protocol

UI → Host messages: `APPLY_TEXT_EDITS`, `WRITE_ASSET`, `REQUEST_INIT`, `REQUEST_SETTINGS`

Host → UI messages: `DOC_INIT`, `DOC_CHANGED`, `ASSET_WRITTEN`, `SETTINGS_CHANGED`, `ERROR`

## Technical Constraints

- Requires VS Code 1.85.0+ or Cursor
- Use stable VS Code APIs for Cursor compatibility
- Keep the underlying file as plain Markdown with no sidecar state
- Keep the webview bundle local and compatible with the strict CSP
- The webview bundle must be copied to `packages/extension-host/dist/` for packaging
