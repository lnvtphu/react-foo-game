
// import custom format tv4
import { emailFormat, passwordFormat } from '../utils/customFormatTV4';

import * as tv4 from 'tv4';

const handleError = (data) => {

    return data.errors.map((error) => {
        const {
            message = null,
            params: {
                message: messageCustom = null
            } = {}
        } = error;

        return messageCustom ? messageCustom : message;
    });
}
const validate = (data, schema) => {
    const formats = {
        email: emailFormat,
        password: passwordFormat
    }

    tv4.addFormat(formats);
    const result = tv4.validateMultiple(data, schema);
    const response = {
        valid: result.valid,
        error: handleError(result)
    }

    return response;
}

export { validate };