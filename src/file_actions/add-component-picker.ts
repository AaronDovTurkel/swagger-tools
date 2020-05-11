
import * as vscode from 'vscode';
import { addSchemaPicker } from './add-schema-picker';
import { ComponentTypeDisplayNames } from '../types';

const componentTypes: ComponentTypeDisplayNames[] = [
    "Schemas"
];

let selectedType: ComponentTypeDisplayNames;

export function addComponentPicker() {
    return new Promise((resolve, reject) => {
        vscode.window.showQuickPick(componentTypes).then(
            (componentType: ComponentTypeDisplayNames | any) => {
    
                selectedType = componentType;

                if (componentType === "Schemas") {
                    resolve(addSchemaPicker());
                }
    
            }
        );
    });
}