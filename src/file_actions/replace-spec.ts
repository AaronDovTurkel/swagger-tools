import * as vscode from 'vscode';
import { formatDocument } from './format-document';


export function replaceSpec(updatedSpec: any) {
    const editor = vscode.window.activeTextEditor;
    const docLineCount = editor?.document.lineCount;
    const docRange = new vscode.Range(new vscode.Position(0, 0), new vscode.Position((docLineCount || 0 + 1), 0));
    editor?.edit(
        (editBuilder) => {
            return editBuilder.replace(docRange, updatedSpec);
        }
    ).then(
        () => formatDocument(editor.document.uri)
    );
}