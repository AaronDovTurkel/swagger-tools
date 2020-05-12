import { ISchemaOptions } from './../types';
import { ComponentTypes, ComponentObjectTuple } from "../types";
import { generateSchema } from "./generate-schema";
import { createComponentObjectTuple } from '../utils/component-object-tuples';

export function generateComponent(schemaData: any, schemaOptions: ISchemaOptions, componentType: ComponentTypes, componentVariables: string[]) {

    const componentObjectTuple: ComponentObjectTuple = createComponentObjectTuple(...componentVariables)[componentType];
    return generateSchema(schemaData, schemaOptions, componentObjectTuple);

}
