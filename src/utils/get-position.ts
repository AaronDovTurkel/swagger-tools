import { PositionArray } from "../types";
import * as vscode from 'vscode';

export function getPosition(
    document: vscode.TextDocument,
    argsToFind: string[],
    endPosition: boolean = true,
    errorMessage: string = `Cant find position of: ${argsToFind.join(", ")}, in ${document.uri.path}`
): PositionArray | Error {

    if (!argsToFind.length) {
        if (endPosition) {
            const position = new vscode.Position(document.lineCount - 2, 0);
            return [position, ""];
        }
        return Error(errorMessage);
    }

    const lineCountArray = Array.from(Array(document.lineCount || 1).keys());
    const lineNumber = lineCountArray.find(
        (lineNumber: number) => document.lineAt(lineNumber).text.includes(argsToFind[0]));

    if (lineNumber || lineNumber === 0) {
        const characterNumber = document.lineAt(lineNumber).range as vscode.Range;
        const position = new vscode.Position(characterNumber.end.line, characterNumber.end.character);
        return [position, argsToFind[0]];
    } else {
        const [_, ...restOfArgsToFind] = argsToFind;
        return getPosition(document, restOfArgsToFind, endPosition, errorMessage);
    }

}