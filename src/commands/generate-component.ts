import * as vscode from 'vscode';
import { componentListGenerator } from '../generators/component-generator';
import { TextEdit } from 'vscode';
import { PositionArray } from '../types';
import { getPosition } from '../utils/get-position';

export function generateComponent(configs: any) {
    const editor = vscode.window.activeTextEditor;
    const schemaText = "\"schemas\": {";
    const componentsText = "\"components\": {";

    if (editor) {

        if (!editor.document.getText()?.includes("openapi")) {
            console.error("No OpenAPI spec file detected...", editor.document);
            vscode.window.showWarningMessage("No OpenAPI spec file detected...");
            return;
        }

        Promise
            .all([
                generateSchemasFromClipboard(),
                getPositionOfSchemasOrComponents(editor.document)
            ])
            .then(([generatedSchemas, positionArray]: [string, PositionArray] | any) => {
                handleInsertSchema(generatedSchemas, positionArray, editor);
            })
            .catch((error: Error) => {
                console.log(error);
                vscode.window.showWarningMessage(error.message);
            });

    }

    function generateSchemasFromClipboard() {

        const clipBoardErrorMessage = "Please make sure to copy a valid Javascript object or array.";

        return vscode.env.clipboard.readText().then(
            (clipboardText: string) => {
                try {

                    const splitClipboard = clipboardText.split(" = ");
                    const evaluatedText = eval('(' + splitClipboard[1] + ')');
                    const schemaName = splitClipboard[0].replace("const", "").trim();
                    const generatedSchemas = JSON.stringify(componentListGenerator(evaluatedText, schemaName, configs));

                    return new Promise((resolve, reject) => {
                        if (generatedSchemas) {
                            resolve(generatedSchemas);
                        } else {
                            reject(clipboardText);
                        }
                    });

                } catch (error) {

                    console.log(error);
                    return new Promise((_, reject) => reject(Error(clipBoardErrorMessage)));

                }


            },
            (error: any) => {
                console.log(error);
                return new Promise((_, reject) => reject(Error(clipBoardErrorMessage)));
            }
        );
    }

    function getPositionOfSchemasOrComponents(document: vscode.TextDocument) {
        return new Promise((resolve, reject) => {
            const positionRes = getPosition(document, [schemaText, componentsText]);

            if (positionRes instanceof Error) {
                reject(positionRes);
            } else {
                resolve(positionRes);
            }
        });
    }

    function insertAndFormatSchema(uri: vscode.Uri, position: vscode.Position, text: string, formatOptions: any) {
        const insertEdit = new vscode.WorkspaceEdit();
        insertEdit.insert(uri, position, text);
        vscode.workspace.applyEdit(insertEdit).then(() => {
            vscode.commands.executeCommand("vscode.executeFormatDocumentProvider", uri, formatOptions).then(
                (formatEdits: TextEdit[] | any) => {
                    const formatEdit = new vscode.WorkspaceEdit();
                    formatEdit.set(uri, formatEdits);
                    vscode.workspace.applyEdit(formatEdit);
                }
            );
        });
    }

    function handleInsertSchema(
        generatedSchemas: string,
        positionArray: PositionArray,
        editor: vscode.TextEditor
    ) {
        if (positionArray[1] === schemaText) {
            const schemaInsert = generatedSchemas.substr(1).substring(0, generatedSchemas.length - 2) + ",";
            insertAndFormatSchema(editor?.document.uri, positionArray[0], schemaInsert, editor.options);
        } else if (positionArray[1] === componentsText) {
            const componentsInsert = "\"schemas\": " + generatedSchemas + ",";
            insertAndFormatSchema(editor?.document.uri, positionArray[0], componentsInsert, editor.options);
        } else {
            const generalInsert = ",\"components\": {" + "\"schemas\": " + generatedSchemas + "}";
            insertAndFormatSchema(editor?.document.uri, positionArray[0], generalInsert, editor.options);
        }
    }

}