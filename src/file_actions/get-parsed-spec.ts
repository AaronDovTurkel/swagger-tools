
import * as vscode from 'vscode';
import { parse } from '../utils/parse';

export function getParsedSpec() {

    return new Promise((resolve, reject) => {

        try {
            const unParsedSpec = vscode.window.activeTextEditor?.document.getText();
            const parsedSpec = parse(unParsedSpec);
            resolve(parsedSpec);
        } catch (err) {
            console.error(err);
            reject("Could not parse openAPI spec file.");
        }


    });

}