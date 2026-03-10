# MDence

MDence is a block-based Markdown editor for VS Code with a Confluence-like editing experience. It lets you work visually while keeping every document as plain Markdown.

MDence is an independent project and is not affiliated with Atlassian.

## Positioning

MDence is aimed at people who like the editing feel of wiki tools, but want files that stay local, portable, and Git-friendly.

- Write visually instead of living in raw Markdown syntax
- Keep documents as `.md` files
- Stay inside VS Code for editing, review, and version control

## Core Features

### Slash Commands

Type `/` to insert headings, lists, code blocks, tables, callouts, toggles, dividers, and more.

### Block Editing

- Drag and drop blocks to reorder content
- Use `Tab` and `Shift+Tab` to indent and outdent
- Use `Alt+Up` and `Alt+Down` to move blocks

### Markdown Output

| Block Type      | Markdown Output         |
| --------------- | ----------------------- |
| Headings        | `# ## ###`              |
| Bullet lists    | `- item`                |
| Numbered lists  | `1. item`               |
| Todo checkboxes | `- [ ] task`            |
| Blockquotes     | `> quote`               |
| Code blocks     | ` ```lang ``` `         |
| Tables          | GFM tables              |
| Callouts        | `> [!NOTE]` admonitions |
| Toggles         | `<details>` HTML        |
| Images          | `![alt](path)`          |
| Dividers        | `---`                   |

### Inline Formatting

- Bold with `Cmd/Ctrl+B`
- Italic with `Cmd/Ctrl+I`
- Inline code with `Cmd/Ctrl+E`
- Links with `Cmd/Ctrl+K`
- Strikethrough from the floating toolbar

### Images and Theme Integration

- Paste or drag images directly into the editor
- Save pasted images into your configured assets folder
- Follow the active VS Code light or dark theme automatically

### Default Editor Prompt

- Prompt once on startup to let users set MDence as the default editor for `.md` and `.markdown`
- Respect existing editor associations instead of overwriting them
- Keep a command available for users who want to enable it later

## Settings

MDence currently exposes these main settings:

- `mdence.assets.folder`
- `mdence.assets.imagePathResolution`
- `mdence.callouts.style`
- `mdence.toggles.syntax`
- `mdence.theme.codeTheme`
- `mdence.theme.headingColor`
- `mdence.theme.h1Color` through `mdence.theme.h5Color`
- `mdence.theme.h1Indent` through `mdence.theme.h5Indent`
- `mdence.theme.boldColor`
- `mdence.theme.italicColor`

## Commands

- `MDence: Open as Raw Markdown`
- `MDence: Open as MDence`
- `MDence: Copy Markdown Content`
- `MDence: Set as Default Markdown Editor`

## Repository Layout

- `packages/extension-host` contains the VS Code extension host
- `packages/webview-ui` contains the React and Lexical editor UI
- `packages/shared` contains shared message and schema types

## Development

```bash
npm ci
npm run build
npm run package
```

Press `F5` in VS Code to launch an Extension Development Host and test MDence against local Markdown files.

## Links

- [GitHub Repository](https://github.com/MiUPa/mdence)
- [Issue Tracker](https://github.com/MiUPa/mdence/issues)

## License

MIT
