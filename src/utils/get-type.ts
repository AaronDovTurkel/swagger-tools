export function getType(arg: any) {
    if (Array.isArray(arg)) {
        return "array";
    }
    return typeof arg;
}