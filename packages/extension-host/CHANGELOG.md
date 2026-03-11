# Changelog

## 0.3.3

- Redesigned the Marketplace icon with the new MDence visual identity
- Updated DOMPurify to 3.3.2 in the MDence webview bundle
- Refreshed build dependencies, including esbuild 0.25.0
- Updated website security lockfiles and removed a redundant nested website manifest

## 0.3.2

- Improved Markdown import for paragraphs that mix text and images
- Kept the slash-command menu inside the viewport on shorter screens and near the bottom of long documents
- Added a safer prompt and command for setting MDence as the default Markdown editor without copying workspace associations into global settings

## 0.3.1

- Replaced the extension icon with original MDence branding
- Updated repository and issue tracker links to the public GitHub repository
- Reworked document sync to serialize full-document updates and avoid markdown corruption during rapid edits

## 0.3.0

- Initial MDence-branded release candidate
- Reframed the editor around a Confluence-like Markdown editing experience
- Block-based editing with slash commands, drag and drop, tables, callouts, toggles, and image support
- Theme-aware rendering while keeping documents stored as plain Markdown
