
import Ajv from 'ajv';

const handleError = (errors) => {
    errors.map((error) => {

    });
    return errors;
}
const validate = (data, schema) => {
    const ajv = new Ajv({allErrors: true});
    const validator = ajv.compile(schema);
    const valid = validator(data);
    const errors = valid ? [] : handleError(validator.errors)
    return { valid, errors };
}

export { validate };