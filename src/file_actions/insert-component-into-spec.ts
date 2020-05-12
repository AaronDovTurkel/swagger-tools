import { getParsedClipboard } from './get-parsed-clipboard';
import { generateComponent } from '../generators/generate-component';
import { updateSpecComponentFields } from '../utils/update-spec-component-fields';


export function insertComponentIntoSpec(spec: any, componentInfo: any) {
    return new Promise((resolve, reject) => {
        const schemaPromise =
            new Promise(resolve => {
                if (componentInfo.fromClipboard) {
                    resolve(getParsedClipboard());
                } else {
                    resolve({ body: {} });
                }
            });

        schemaPromise
            .then(
                (parsedClipboard: any) => {
                    return generateComponent(
                        parsedClipboard.body,
                        componentInfo.schemaOptions,
                        componentInfo.componentType,
                        [componentInfo.title]
                    );
                },
                (error) => {
                    reject(error);
                }
            )
            .then(
                (newSchema) => {
                    try {
                        const updatedSpec = updateSpecComponentFields(
                            componentInfo.componentType, spec, newSchema);
                        resolve(updatedSpec);
                    } catch (error) {
                        console.error(error);
                        reject("Could not insert schema into spec object.");
                    }
                },
                (error) => {
                    console.error(error);
                    reject("Could not generate component from clipboard.");
                }
            );
    });
}