import { ParsedClipboard, ArrayType } from '../types';
import * as vscode from 'vscode';
import { isOpenApiSpec } from '../file_actions/is-open-api-spec';
import { getParsedClipboard } from '../file_actions/get-parsed-clipboard';
import { setClipboardAndPaste } from '../file_actions/set-clipboard-and-paste';
import { generateSchema } from '../generators/generate-schema';

export function pasteSchema() {
    const editor = vscode.window.activeTextEditor;
    const arrayType: ArrayType | undefined =
        vscode.workspace.getConfiguration("swagger-tools").get("arrayType");

    if (editor) {

        if (!isOpenApiSpec(editor.document)) {
            console.error("No OpenAPI spec file detected...", editor.document);
            vscode.window.showWarningMessage("No OpenAPI spec file detected...");
            return;
        }

        getParsedClipboard().then(
            (parsedClipboard: ParsedClipboard) => {

                const openApiSchema = generateSchema(
                    parsedClipboard.body,
                    { ref: false, arrayType }
                ).schema;

                setClipboardAndPaste(JSON.stringify(openApiSchema), parsedClipboard.clipboard)
                    .then(
                        (_) => _,
                        (error) => vscode.window.showErrorMessage(error)
                    );
            },
            (error) => {
                console.error(error);
                vscode.window.showErrorMessage(error);
            }
        );
    }

}