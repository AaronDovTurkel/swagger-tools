import * as vscode from 'vscode';
import { componentGenerator, componentListGenerator } from '../generators/component-generator';
import { arrayToObject } from '../utils/array-to-object';
import { TextEdit } from 'vscode';

export function generateComponent() {
    const editor = vscode.window.activeTextEditor;
    const documentText = editor && editor.document.getText();
    let schemaName: string;
    let schemaDescription: string;
    let arrayType: "anyOf" | "oneOf" | "allOf";
    let evaluatedSchemaText: string;

    if (!documentText?.includes("openapi")) {
        console.log("No OpenAPI spec file detected...");
        return;
    }

    // Get clipboardText in background
    vscode.env.clipboard.readText().then((clipboardText: string) => {
        const splitClipboard = clipboardText.split(" = ");
        const trimmedText = splitClipboard[1];
        schemaName = splitClipboard[0].trimStart();
        const evaluatedText = eval('(' + trimmedText + ')');
        evaluatedSchemaText = evaluatedText;
    });

    // Initiate quickPicker for component generation data
    vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: "Enter schema name" })
        .then((name: string | any) => {
            // schemaName = name;
            return vscode.window.showInputBox({ ignoreFocusOut: true, placeHolder: "Enter schema description (optional)" });
        })
        .then((description: string | any) => {
            schemaDescription = description;
            return vscode.window.showQuickPick(["anyOf", "oneOf", "allOf"], { ignoreFocusOut: true, placeHolder: "Enter your default dynamic array type" });
        })
        .then((type: string | any) => {
            arrayType = type;
            return new Promise((resolve, reject) => resolve());
        })
        .then(() => {
            // console.log({schemaName, schemaDescription, arrayType});
            const generatedSchemas = componentListGenerator(evaluatedSchemaText, (schemaName || "Filler Schema Name"), { arrayType: "anyOf", ref: true, componentType: "schemas" }, schemaDescription);

            const lineCountArray = Array.from(Array(editor?.document.lineCount).keys());
            let lineNumberOfSchemas = lineCountArray.find((lineNumber: number) => {
                return editor?.document.lineAt(lineNumber).text.includes("\"schemas\": {");
            });
            if (lineNumberOfSchemas) {
                const jsonSchemas = JSON.stringify(generatedSchemas);
                const text = jsonSchemas.substr(1).substring(0, jsonSchemas.length - 2) + ",";
                const position = new vscode.Position(lineNumberOfSchemas, 19);
                const uri = editor?.document.uri;
                const insertEdit = new vscode.WorkspaceEdit();

                if (uri && editor) {
                    insertEdit.insert(uri, position, text);
                    vscode.workspace.applyEdit(insertEdit).then(() => {
                        vscode.commands.executeCommand("vscode.executeFormatDocumentProvider", uri, editor.options).then(
                            (formatEdits: TextEdit[] | any) => {
                                const formatEdit = new vscode.WorkspaceEdit();
                                formatEdit.set(uri, formatEdits);
                                vscode.workspace.applyEdit(formatEdit);
                            }
                        );
                    });
                }
            }

        });

}