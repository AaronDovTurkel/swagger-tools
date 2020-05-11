
import * as vscode from 'vscode';
import { pasteSchema } from './commands/paste-schema';
import { addComponent } from './commands/add-component';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "swagger-tools" is now active!');

	let pasteSchemaDisposable = vscode.commands.registerCommand(
		'swagger-tools.pasteSchema', () => pasteSchema()
	);

	let addComponentDisposable = vscode.commands.registerCommand(
		'swagger-tools.addComponent', () => addComponent()
	);

	context.subscriptions.push(pasteSchemaDisposable);
	context.subscriptions.push(addComponentDisposable);
}

export function deactivate() {}
