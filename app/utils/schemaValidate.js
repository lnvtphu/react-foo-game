// schema for register validate
const registerSchema = {
    title: 'Register schema',
    type: 'object',
    properties: {
        email: {
            type: 'string',
            format: 'email'
        },
        password: {
            type: 'string',
            format: 'password'
        },
        displayName: {
            type: 'string'
        },
        firstName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        },
        status: {
            type: 'number'
        },
        creatdate: {
            type: 'string'
        },
        updatedDate: {
            type: 'string'
        }
    },
    required: ["email", "password", 'displayName', 'firstName', 'lastName']
};
// schema for login validate
const loginSchema = {
    title: 'Login schema',
    type: 'object',
    properties: {
        email: {
            type: 'string',
            format: 'email'
        },
        password: {
            type: 'string'
        }
    },
    required: ["email", "password"]
}
export { registerSchema, loginSchema };