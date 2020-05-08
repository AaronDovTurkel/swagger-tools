export function parse(data: any) {
    return Function('"use strict";return (' + data + ')')();
}