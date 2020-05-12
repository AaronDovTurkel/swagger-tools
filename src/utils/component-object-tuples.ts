export const createComponentObjectTuple = (...variables: any): any => ({
    schemas: [{
        [variables[0]]: {
            title: [variables[0]]
        }
    }, [variables[0]]]
});