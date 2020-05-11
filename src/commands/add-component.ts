import * as vscode from 'vscode';
import { isOpenApiSpec } from '../file_actions/is-open-api-spec';
import { getParsedSpec } from '../file_actions/get-parsed-spec';
import { addComponentPicker } from '../file_actions/add-component-picker';

export function addComponent() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {

        if (!isOpenApiSpec(editor.document)) {
            console.error("No OpenAPI spec file detected...", editor.document);
            vscode.window.showWarningMessage("No OpenAPI spec file detected...");
            return;
        }

        getParsedSpec().then(
            (parsedSpec) => {
                console.log(parsedSpec);
            },
            (error) => vscode.window.showErrorMessage(error)
        );

        addComponentPicker().then(
            (componentInfo) => console.log(componentInfo)
        )
    }
}