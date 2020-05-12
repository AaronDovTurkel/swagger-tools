import * as vscode from 'vscode';


export function formatDocument(uri: vscode.Uri) {
    return new Promise((resolve, reject) => {
        vscode.commands.executeCommand("vscode.executeFormatDocumentProvider", uri,  vscode.window.activeTextEditor?.options)
        .then(
            (edits: vscode.TextEdit | any) => {
                const newEdit = new vscode.WorkspaceEdit();
                newEdit.set(uri, edits);
                vscode.workspace.applyEdit(newEdit);
                resolve();
            },
            (error) => {
                console.error(error);
                reject("Could not format document");
            }
        );
    });
}