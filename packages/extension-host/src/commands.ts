import * as vscode from 'vscode';

const MARKDOWN_EDITOR_ASSOCIATION_PATTERNS = ['*.md', '*.markdown'] as const;
const DEFAULT_EDITOR_PROMPT_STATE_KEY = 'mdence.defaultEditorPromptHandled';

type EditorAssociations = Record<string, string>;

// Helper to get the current markdown file URI
function getActiveMarkdownUri(): vscode.Uri | undefined {
  const activeEditor = vscode.window.activeTextEditor;
  if (activeEditor?.document.uri) {
    return activeEditor.document.uri;
  }

  // For custom editors, check the active tab
  const activeTab = vscode.window.tabGroups.activeTabGroup.activeTab;
  if (activeTab?.input && typeof activeTab.input === 'object' && 'uri' in activeTab.input) {
    const uri = (activeTab.input as { uri: vscode.Uri }).uri;
    if (uri.path.endsWith('.md') || uri.path.endsWith('.markdown')) {
      return uri;
    }
  }

  return undefined;
}

function getMarkdownEditorAssociations(
  associations: EditorAssociations | undefined
): EditorAssociations {
  const nextAssociations = { ...(associations ?? {}) };

  for (const pattern of MARKDOWN_EDITOR_ASSOCIATION_PATTERNS) {
    nextAssociations[pattern] = 'mdence.editor';
  }

  return nextAssociations;
}

function hasExplicitMarkdownEditorAssociation(
  associations: EditorAssociations | undefined
): boolean {
  return MARKDOWN_EDITOR_ASSOCIATION_PATTERNS.some((pattern) => {
    const editor = associations?.[pattern];
    return typeof editor === 'string' && editor.trim().length > 0;
  });
}

function hasExplicitMarkdownEditorAssociationAtAnyScope(
  config: vscode.WorkspaceConfiguration
): boolean {
  const inspected = config.inspect<EditorAssociations>('editorAssociations');

  if (!inspected) {
    return false;
  }

  return [
    inspected.globalValue,
    inspected.workspaceValue,
    inspected.workspaceFolderValue,
  ].some(hasExplicitMarkdownEditorAssociation);
}

async function setAsDefaultMarkdownEditor(): Promise<void> {
  const workbenchConfig = vscode.workspace.getConfiguration('workbench');
  const currentAssociations =
    workbenchConfig.get<EditorAssociations>('editorAssociations') ?? {};

  await workbenchConfig.update(
    'editorAssociations',
    getMarkdownEditorAssociations(currentAssociations),
    vscode.ConfigurationTarget.Global
  );
}

export async function promptToSetDefaultMarkdownEditor(
  context: vscode.ExtensionContext
): Promise<void> {
  const hasHandledPrompt = context.globalState.get<boolean>(
    DEFAULT_EDITOR_PROMPT_STATE_KEY,
    false
  );
  if (hasHandledPrompt) {
    return;
  }

  const workbenchConfig = vscode.workspace.getConfiguration('workbench');
  if (hasExplicitMarkdownEditorAssociationAtAnyScope(workbenchConfig)) {
    await context.globalState.update(DEFAULT_EDITOR_PROMPT_STATE_KEY, true);
    return;
  }

  const selection = await vscode.window.showInformationMessage(
    'Set MDence as the default editor for Markdown files?',
    'Set Default',
    'Not Now'
  );

  if (selection === 'Set Default') {
    try {
      await setAsDefaultMarkdownEditor();
      vscode.window.showInformationMessage(
        'MDence is now the default editor for Markdown files.'
      );
    } catch (error) {
      vscode.window.showErrorMessage('Failed to update Markdown editor associations');
      return;
    }
  }

  await context.globalState.update(DEFAULT_EDITOR_PROMPT_STATE_KEY, true);
}

export function registerCommands(context: vscode.ExtensionContext): void {
  // Open as Raw Markdown command
  context.subscriptions.push(
    vscode.commands.registerCommand('mdence.openAsText', async () => {
      const uri = getActiveMarkdownUri();
      if (uri) {
        // Close current tab and open in default editor (same tab position)
        await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
        await vscode.commands.executeCommand('vscode.openWith', uri, 'default');
      } else {
        vscode.window.showWarningMessage('No Markdown file is currently active');
      }
    })
  );

  // Open as MDence command (switch from raw text to MDence)
  context.subscriptions.push(
    vscode.commands.registerCommand('mdence.openAsMDence', async () => {
      const uri = getActiveMarkdownUri();
      if (uri) {
        // Close current tab and open in MDence editor (same tab position)
        await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
        await vscode.commands.executeCommand('vscode.openWith', uri, 'mdence.editor');
      } else {
        vscode.window.showWarningMessage('No Markdown file is currently active');
      }
    })
  );

  // Copy markdown content command
  context.subscriptions.push(
    vscode.commands.registerCommand('mdence.copyContent', async () => {
      const uri = getActiveMarkdownUri();
      if (!uri) {
        vscode.window.showWarningMessage('No Markdown file is currently active');
        return;
      }

      // Try to get content from active text editor first
      const activeEditor = vscode.window.activeTextEditor;
      if (activeEditor?.document.uri.toString() === uri.toString()) {
        await vscode.env.clipboard.writeText(activeEditor.document.getText());
        vscode.window.showInformationMessage('Copied to clipboard');
        return;
      }

      // For custom editor, read the file directly
      try {
        const document = await vscode.workspace.openTextDocument(uri);
        await vscode.env.clipboard.writeText(document.getText());
        vscode.window.showInformationMessage('Copied to clipboard');
      } catch (error) {
        vscode.window.showErrorMessage('Failed to copy content');
      }
    })
  );

  // Set MDence as the default editor for Markdown files
  context.subscriptions.push(
    vscode.commands.registerCommand('mdence.setAsDefaultMarkdownEditor', async () => {
      try {
        await setAsDefaultMarkdownEditor();
        await context.globalState.update(DEFAULT_EDITOR_PROMPT_STATE_KEY, true);
        vscode.window.showInformationMessage(
          'MDence is now the default editor for Markdown files.'
        );
      } catch (error) {
        vscode.window.showErrorMessage('Failed to update Markdown editor associations');
      }
    })
  );

  // Insert Block command (placeholder for slash menu integration)
  context.subscriptions.push(
    vscode.commands.registerCommand('mdence.insertBlock', async () => {
      const items: vscode.QuickPickItem[] = [
        { label: 'Paragraph', description: 'Plain text block' },
        { label: 'Heading 1', description: '# Large heading' },
        { label: 'Heading 2', description: '## Medium heading' },
        { label: 'Heading 3', description: '### Small heading' },
        { label: 'Bullet List', description: '- List items' },
        { label: 'Numbered List', description: '1. Numbered items' },
        { label: 'Todo List', description: '- [ ] Task items' },
        { label: 'Quote', description: '> Blockquote' },
        { label: 'Code Block', description: '``` Code fence' },
        { label: 'Divider', description: '--- Horizontal rule' },
        { label: 'Table', description: 'GFM table' },
        { label: 'Toggle', description: '<details> Collapsible section' },
        { label: 'Callout', description: '> [!NOTE] Admonition' },
      ];

      const selection = await vscode.window.showQuickPick(items, {
        placeHolder: 'Select a block type to insert',
      });

      if (selection) {
        // This will be handled by the webview in the actual implementation
        vscode.window.showInformationMessage(`Insert ${selection.label} - handled in editor`);
      }
    })
  );
}
