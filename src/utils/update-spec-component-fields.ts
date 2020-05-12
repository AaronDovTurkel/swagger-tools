import * as vscode from 'vscode';
import { ComponentTypes } from '../types';


export function updateSpecComponentFields(componentType: ComponentTypes, spec: any, schemaObj: any) {
    let newSpec = { ...spec };

    function insert(schema: any) {
        if (!(newSpec.components)) {
            newSpec.components = {
                [componentType]: {
                    ...schema
                }
            };
        } else if (!(newSpec.components[componentType])) {
            newSpec.components[componentType] = {
                ...schema
            };
        } else {
            newSpec.components[componentType] = {
                ...newSpec.components[componentType],
                ...schema
            };
        }
    }

    insert(schemaObj.schema);
    schemaObj.refs.forEach((ref: any) => insert(ref));

    return newSpec;
}