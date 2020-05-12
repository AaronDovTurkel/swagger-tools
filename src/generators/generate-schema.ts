import { ISchemaOptions, ComponentObjectTuple } from "../types";
import { compareObjects } from "../utils/compare-objects";
import { setObjectKey } from "../utils/set-object-key";
import { createComponentObjectTuple } from "../utils/component-object-tuples";

export function generateSchema(
    schemaData: {} | [],
    schemaOptions: ISchemaOptions,
    componentObjectTuple?: ComponentObjectTuple
): {schema: {}; refs: {}[]} {
    const { ref = true, arrayType = "oneOf" } = schemaOptions;

    let refs: any[] = [];

    const schema = {
        ...genByType(schemaData)
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

    function getType(arg: any) {
        if (Array.isArray(arg)) {
            return "array";
        }
        return typeof arg;
    }

    function genArray(array: any[]) {
        const openArray: any = {
            type: "array",
            items: {}
        };
        if (
            (array.every(arrayItem => getType(arrayItem) === "object") &&
                array.every((arrayItem, _, array) => compareObjects(arrayItem, array[0]))) ||
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

            // Populates ref list if (schemaOptions.ref === true)
            if (ref && ((getType(obj[key]) === "object") || (getType(obj[key]) === "array"))) {

                const entityName = key.charAt(0).toUpperCase() + key.slice(1);
                const entityObjectTuple = createComponentObjectTuple(entityName)["schemas"];
                const generatedSchema = generateSchema(obj[key], schemaOptions, entityObjectTuple);

                openObj.properties[key] = { $ref: "#/components/schemas/" + entityName };

                refs = [
                    ...refs,
                    generatedSchema.schema,
                    ...generatedSchema.refs.flat(Infinity)
                ];

                return;

            } else {

                openObj.properties[key] = genByType(obj[key]);

            }
        });
        return openObj;
    }

    return componentObjectTuple
        ? { schema: setObjectKey(schema, componentObjectTuple[0], componentObjectTuple[1]), 
            refs }
        : { schema, refs };
}