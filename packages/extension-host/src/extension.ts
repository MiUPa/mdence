import * as vscode from 'vscode';
import { MDenceEditorProvider } from './customEditor';
import { registerCommands } from './commands';

export function activate(context: vscode.ExtensionContext): void {
  // Register the custom editor provider
  context.subscriptions.push(MDenceEditorProvider.register(context));

  // Register commands
  registerCommands(context);

  console.log('MDence extension activated');
}

export function deactivate(): void {
  console.log('MDence extension deactivated');
}
