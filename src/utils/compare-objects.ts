export function compareObjects(obj1: any, obj2: any) {
    return Object.keys(obj1).every(key => {
        return obj1[key] === obj2[key];
    });
}