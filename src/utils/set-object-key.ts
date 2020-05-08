export function setObjectKey(value: any, obj: {}, pathList: string[]) {
    let newObj = obj;  // global object

    function set(pathList: string[], value: any) {
        let schema: any = newObj;
        let len = pathList.length;
        for (var i = 0; i < len - 1; i++) {
            let elem = pathList[i];
            if (!schema[elem]) {
                schema[elem] = {};
            } else {
                schema = schema[elem];
            }
        }

        schema[pathList[len - 1]] = value;
    }

    set(pathList, value);

    return newObj;
}