import { IComponentOptions } from "../types";
import { getType } from "../utils/get-type";
import { compareObjects } from "../utils/compare-objects";
import { arrayToObject } from "../utils/array-to-object";

export function componentGenerator(interfaceObj: any, interfaceName: string, componentOptions?: IComponentOptions, description?: string) {
    const { 
        ref = true,
        arrayType = "oneOf",
        componentType = "schemas"
    } = componentOptions || {};

    let list: any[] = [];

    const openAPISchema = {
        title: interfaceName,
        description,
        ...genByType(interfaceObj)
    };
    
    function genByType(varName: any) {
        if (getType(varName) === "array") {
            return genArray(varName);
        }
        if (getType(varName) === "object") {
            return genObj(varName);
        }
        return {
            type: getType(varName),
            example: `${varName || "Example string"}`
        };
    }
    function genArray(array: any[]) {
        const openArray: any = {
            type: "array",
            items: {}
        };
        if (
            (array.every(arrayItem => getType(arrayItem) === "object") && array.every((arrayItem, _, array) => compareObjects(arrayItem, array[0]))) ||
            array.every(arrayItem => getType(arrayItem) === "array") ||
            array.every(arrayItem => getType(arrayItem) === "string") ||
            array.every(arrayItem => getType(arrayItem) === "number")
        ) {
            array.forEach(arrayItem => {
                openArray.items = genByType(arrayItem);
            });
        } else {
            openArray.items[arrayType] = [];
            array.forEach(arrayItem => {
                openArray.items[arrayType] = [
                    ...openArray.items[arrayType],
                    genByType(arrayItem)
                ];
            });
        }
        return openArray;
    }
    function genObj(obj: any) {
        const openObj: any = {
            type: "object",
            properties: {}
        };
        Object.keys(obj).forEach(key => {
            const entityName = key.charAt(0).toUpperCase() + key.slice(1);
            if (ref && ((getType(obj[key]) === "object") || (getType(obj[key]) === "array"))) {
                openObj.properties[key] = { $ref: "#/components/" + componentType + "/" + entityName };
                return list = [...list, (componentGenerator(obj[key], entityName, componentOptions))];
            } else {
                openObj.properties[key] = genByType(obj[key]);
            }
        });
        return openObj;
    }

    list = [...list, openAPISchema];
    const flatList = list.flat(Infinity);
    return flatList;
}

export function componentListGenerator(interfaceObj: any, interfaceName: string, componentOptions?: IComponentOptions, description?: string) {
    const components = componentGenerator(interfaceObj, interfaceName, componentOptions, description).reverse();
    return arrayToObject(components, "title");
}
