
import * as vscode from 'vscode';

export function setClipboardAndPaste(value: string, previousValue: string) {
    return new Promise((resolve, reject) => {
        vscode.env.clipboard.writeText(value).then(
            (_) => {
                return vscode.commands.executeCommand("editor.action.clipboardPasteAction");
            },
            (error) => {
                reject({msg: "Could not set clipboard", error});
            }
        ).then( // Reset clipboard
            (_) => {
                return vscode.env.clipboard.writeText(previousValue);
            },
            (error) => {
                console.error(error);
                reject("Could not paste schema.");
                return vscode.env.clipboard.writeText(previousValue);
            }
        ).then(
            (_) => resolve(),
            (error) => console.error(error)
        );
    });
}