
import * as vscode from 'vscode';
import { pasteSchema } from './commands/paste-schema';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "swagger-tools" is now active!');

	let pasteSchemaDisposable = vscode.commands.registerCommand(
		'swagger-tools.pasteSchema', () => pasteSchema()
	);

	context.subscriptions.push(pasteSchemaDisposable);
}

export function deactivate() {}
