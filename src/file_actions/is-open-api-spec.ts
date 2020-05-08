
import * as vscode from "vscode";

export function isOpenApiSpec(document: vscode.TextDocument) {
    return document.getText()?.includes("openapi");
}