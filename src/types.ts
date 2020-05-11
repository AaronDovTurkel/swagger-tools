
import * as vscode from 'vscode';

/* Interfaces */

export interface IComponentOptions {
    componentType: ComponentTypes
}

export interface ISchemaOptions {
    ref?: boolean;
    arrayType?: ArrayType;
}


/* Types */

export type ComponentTypes =
    "schemas" |
    "responses" |
    "parameters" |
    "examples" |
    "requestBodies" |
    "headers" |
    "securitySchemes" |
    "links" |
    "callbacks";

export type ComponentTypeDisplayNames =
    "Schemas" |
    "Responses" |
    "Parameters" |
    "Examples" |
    "Request Bodies" |
    "Headers" |
    "Security Schemes" |
    "Links" |
    "Callbacks";

export type ArrayType = "anyOf" | "oneOf" | "allOf" | "not";

export type PositionArray = [vscode.Position, string];

export type ComponentObjectTuple = [{}, string[]];

export type ParsedClipboard = {
    name: string | null;
    body: {} | any[];
    clipboard: string;
};