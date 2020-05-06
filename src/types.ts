export interface IComponentOptions {
    ref: boolean;
    arrayType: "anyOf" | "oneOf" | "allOf",
    componentType: "schemas" |
    "responses" |
    "parameters" |
    "examples" | 
    "requestBodies" |
    "headers" |
    "securitySchemes" |
    "links" |
    "callbacks"
}