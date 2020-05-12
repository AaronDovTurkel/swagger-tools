import * as vscode from 'vscode';
import { isOpenApiSpec } from '../file_actions/is-open-api-spec';
import { getParsedSpec } from '../file_actions/get-parsed-spec';
import { addComponentPicker } from '../file_actions/add-component-picker';
import { insertComponentIntoSpec } from '../file_actions/insert-component-into-spec';
import { replaceSpec } from '../file_actions/replace-spec';

export function addComponent() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {

        if (!isOpenApiSpec(editor.document)) {
            console.error("No OpenAPI spec file detected...", editor.document);
            vscode.window.showWarningMessage("No OpenAPI spec file detected...");
            return;
        }

        Promise.all([getParsedSpec(), addComponentPicker()])
            .then(
                ([parsedSpec, componentInfo]) => {
                    return insertComponentIntoSpec(parsedSpec, componentInfo);
                },
                (error) => {
                    vscode.window.showErrorMessage(error);
                }
            )
            .then(
                (updatedSpec) => {
                    return replaceSpec(JSON.stringify(updatedSpec));
                },
                (error) => {
                    vscode.window.showErrorMessage(error);
                }
            ).then(
                () => {},
                (error) => {
                    vscode.window.showErrorMessage(error);
                }
            );
    }
}







