const registerSchema = {
    title: 'Register schema',
    type: 'object',
    properties: {
        email: {
            type: 'string',
            format: 'email'
        },
        password: {
            type:'string'
        },
        displayName: {
            type: 'string'
        }
    },
    required: ["email", "password"]
};

export { registerSchema };