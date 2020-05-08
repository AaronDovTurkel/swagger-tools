
import * as vscode from 'vscode';
import { parse } from '../utils/parse';
import { ParsedClipboard } from '../types';

export function getParsedClipboard(): Thenable<ParsedClipboard> {

    const clipBoardErrorMessage = "Please make sure to copy a valid Javascript object or array.";

    return new Promise((resolve, reject) => {

        vscode.env.clipboard.readText().then(
            (clipboardText: string) => {
                try {

                    const splitClipboard = clipboardText.split("=");

                    const dataName = splitClipboard.length === 2
                        ? splitClipboard[0].replace("const", "").trim()
                        : null;

                    const dataBody = splitClipboard[1] || splitClipboard[0];

                    const parsedBody = parse('(' + dataBody + ')');

                    if (parsedBody) {
                        resolve({
                            clipboard: clipboardText,
                            name: dataName,
                            body: parsedBody
                        });
                    } else {
                        console.error(Error("Clipboard is empty."));
                        reject("Clipboard is empty.");
                    }

                } catch (error) {
                    console.error(clipBoardErrorMessage, error);
                    reject(clipBoardErrorMessage);
                }

            },
            (error: any) => {
                console.error(clipBoardErrorMessage, error);
                reject(clipBoardErrorMessage);
            }
        );
    });
}