
import Ajv from 'ajv';

const handleError = (errors) => {
    return errors.map((error) => {
        delete error.dataPath;
        delete error.schemaPath;
        return error;
    });
}
const validate = (data, schema) => {
    const ajv = new Ajv({allErrors: true});
    const validator = ajv.compile(schema);
    const valid = validator(data);
    const errors = valid ? [] : handleError(validator.errors);
    return { valid, errors };
}

export { validate };