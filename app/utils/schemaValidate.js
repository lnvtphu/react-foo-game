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
            type: 'string'
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
// update user
const updateUserSchema = {
    title: 'Updtae user schema',
    type: 'object',
    properties: {
        displayName: {
            type: 'string'
        },
        firstName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        }
    },
    additionalProperties: false,
}

export { registerSchema, loginSchema, updateUserSchema };