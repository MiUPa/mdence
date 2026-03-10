# MDence — Confluence-Like Markdown Editor

MDence is a block-based Markdown editor with a Confluence-like editing experience for VS Code. Write visually and keep your files as plain Markdown.

MDence is an independent project and is not affiliated with Atlassian.

## Why MDence?

Markdown is powerful, but raw syntax gets in the way when you want a wiki-style editing flow. MDence aims for the feel of a modern knowledge-base editor while keeping the source file portable.

- **Write visually** — Spend less time managing raw syntax
- **Store as Markdown** — Keep files readable, portable, and version-control friendly
- **Stay in VS Code** — Open `.md` files directly in a richer editor

## Features

### Slash Commands

Type `/` anywhere to insert blocks with fuzzy search. Headings, lists, code blocks, tables, callouts — all just a keystroke away.

### Block-Based Editing

- **Drag & drop** blocks to reorder content
- **Indent/outdent** with Tab and Shift+Tab
- **Move blocks** with Alt+Arrow keys

### Rich Content

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

Select text to reveal the formatting toolbar:

- **Bold** (Cmd/Ctrl+B)
- _Italic_ (Cmd/Ctrl+I)
- `Code` (Cmd/Ctrl+E)
- [Links](.) (Cmd/Ctrl+K)
- ~~Strikethrough~~

### Image Support

Paste or drag images directly into the editor. MDence automatically saves them to your assets folder and inserts the Markdown reference.

### Theme Integration

MDence respects your VS Code color theme — light, dark, or high contrast.

### Default Editor Prompt

On first startup, MDence can offer to become the default editor for Markdown files. If you skip that prompt, you can always run the command below later.

#### Code Block Themes

By default, code block syntax highlighting automatically adapts to your VS Code theme (light or dark). You can also choose a specific theme:

| Theme          | Description                |
| -------------- | -------------------------- |
| `auto`         | Matches your VS Code theme |
| `dark`         | VS Code Dark+ colors       |
| `light`        | VS Code Light+ colors      |
| `github-dark`  | GitHub's dark theme        |
| `github-light` | GitHub's light theme       |
| `monokai`      | Classic Monokai colors     |

Change this in Settings → `mdence.theme.codeTheme`

#### Typography Colors

Customize colors for headings, bold, and italic text:

- `mdence.theme.headingColor` — Color for all headings (fallback)
- `mdence.theme.h1Color` / `h2Color` / `h3Color` / `h4Color` / `h5Color` — Per-level heading colors (override headingColor)
- `mdence.theme.boldColor` — Color for bold text
- `mdence.theme.italicColor` — Color for italic text

#### Heading Indentation

Add left indentation to create a visual hierarchy:

- `mdence.theme.h1Indent` / `h2Indent` / `h3Indent` / `h4Indent` / `h5Indent` — e.g., `0`, `16px`, `2em`

Leave any setting empty to use the default.

## Keyboard Shortcuts

| Shortcut      | Action             |
| ------------- | ------------------ |
| `/`           | Open slash menu    |
| `Cmd/Ctrl+B`  | Bold               |
| `Cmd/Ctrl+I`  | Italic             |
| `Cmd/Ctrl+E`  | Inline code        |
| `Cmd/Ctrl+K`  | Insert link        |
| `Tab`         | Indent list item   |
| `Shift+Tab`   | Outdent list item  |
| `Alt+Up/Down` | Move block up/down |

## Commands

- **MDence: Open as Raw Markdown** — Switch to the plain text editor
- **MDence: Open as MDence** — Open a Markdown file in MDence
- **MDence: Copy Markdown Content** — Copy the document to clipboard
- **MDence: Set as Default Markdown Editor** — Register MDence as the default editor for `.md` and `.markdown`

## Settings

| Setting                      | Description                              | Default      |
| ---------------------------- | ---------------------------------------- | ------------ |
| `mdence.assets.folder`       | Folder for pasted images                 | `assets`     |
| `mdence.callouts.style`      | Callout syntax (`admonition` or `emoji`) | `admonition` |
| `mdence.toggles.syntax`      | Toggle syntax (`details` or `list`)      | `details`    |
| `mdence.theme.codeTheme`     | Code block syntax highlighting theme     | `auto`       |
| `mdence.theme.headingColor`  | Color for all headings (fallback)        | _(none)_     |
| `mdence.theme.h1Color`       | Color for H1 headings                    | _(none)_     |
| `mdence.theme.h2Color`       | Color for H2 headings                    | _(none)_     |
| `mdence.theme.h3Color`       | Color for H3 headings                    | _(none)_     |
| `mdence.theme.h4Color`       | Color for H4 headings                    | _(none)_     |
| `mdence.theme.h5Color`       | Color for H5 headings                    | _(none)_     |
| `mdence.theme.h1Indent`      | Left indent for H1 headings              | _(none)_     |
| `mdence.theme.h2Indent`      | Left indent for H2 headings              | _(none)_     |
| `mdence.theme.h3Indent`      | Left indent for H3 headings              | _(none)_     |
| `mdence.theme.h4Indent`      | Left indent for H4 headings              | _(none)_     |
| `mdence.theme.h5Indent`      | Left indent for H5 headings              | _(none)_     |
| `mdence.theme.boldColor`     | Color for bold text                      | _(none)_     |
| `mdence.theme.italicColor`   | Color for italic text                    | _(none)_     |

## Requirements

- VS Code 1.85.0+ or Cursor

## Links

- [GitHub Repository](https://github.com/MiUPa/mdence)
- [Report Issues](https://github.com/MiUPa/mdence/issues)

## License

MIT
