export function arrayToObject(array: any[], key: string) {
    let object: any = {};
    array.forEach(item => {
        object[item[key]] = item;
    });
    return object;
}