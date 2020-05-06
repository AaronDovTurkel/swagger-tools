
import * as vscode from 'vscode';
import { generateComponent } from './commands/generate-component';

export function activate(context: vscode.ExtensionContext) {

	const workspace = vscode.workspace;
	const arrayType = workspace.getConfiguration("swagger-bot").get("arrayType") ;

	console.log('Congratulations, your extension "swagger-bot" is now active!');

	let generateComponentCommand = vscode.commands.registerCommand(
		'swagger-bot.generateComponent', () => generateComponent({
			arrayType
		})
	);

	context.subscriptions.push(generateComponentCommand);
}

export function deactivate() {}
