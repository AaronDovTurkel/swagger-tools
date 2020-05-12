import { ComponentTypes, ArrayType } from './../types';

import * as vscode from 'vscode';
import { resolve } from 'dns';

const arrayTypes: ArrayType[] = ["anyOf", "allOf", "oneOf", "not"];


export function addSchemaPicker() {

    let schemaInfo: any = {
        title: undefined,
        componentType: "schemas",
        fromClipboard: undefined,
        schemaOptions: {
            arrayType: undefined,
            ref: undefined
        }
    };

    return new Promise((resolve, reject) => {
        vscode.window.showInputBox({ placeHolder: "Enter schema title" })
            .then(
                (schemaTitle) => {
                    schemaInfo.title = schemaTitle || "GenericSchemaTitle";
                    return vscode.window.showQuickPick(
                        ["Yes", "No"],
                        { placeHolder: "Generate schema from clipboard?" }
                    );
                },
                (error) => {
                    console.error(error);
                    reject("Could not evaluate title input.");
                }
            )
            .then(
                (fromClipboard: boolean | any) => {

                    if (fromClipboard === "Yes") {
                        schemaInfo.fromClipboard = true;
                        return generateSchemaOptionsQuickPick();
                    } else {
                        schemaInfo.fromClipboard = false;
                        return new Promise((resolve) => resolve());
                    }
                },
                (error) => {
                    console.error(error);
                    reject("Could not evaluate clipboard picker option.");
                }
            )
            .then(
                (schemaOptions: any) => {
                    if (schemaOptions) {
                        schemaInfo.schemaOptions = schemaOptions;
                    }
                    resolve(schemaInfo);
                },
                (error) => {
                    console.error(error);
                    reject(error);
                }
            );
    });
}

function generateSchemaOptionsQuickPick() {

    let schemaOptions: {arrayType: ArrayType | undefined, ref: Boolean | undefined} = {
        arrayType: undefined,
        ref: undefined
    };
    
    return vscode.window.showQuickPick(arrayTypes)
        .then(
            (arrayType: ArrayType | any) => {
                schemaOptions.arrayType = arrayType;
                return vscode.window.showQuickPick(
                    ["Yes", "No"],
                    { placeHolder: "References nested object and arrays?" }
                );
            },
            (error) => {

            }
        )
        .then(
            (ref) => {
                schemaOptions.ref = ref === "Yes" ? true : false;
                return new Promise((resolve) => resolve(schemaOptions));
            },
            (error) => {

            }
        );
}

