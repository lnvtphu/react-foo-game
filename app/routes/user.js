// import the user schema
import User from '../models/user';
// import handle token
import { sign } from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcryptjs';
import { verifyTokenKey } from '../config/token';
// import handle validate data request
import { validate } from '../utils/validateData';
// import schema for validate
import { registerSchema, loginSchema, updateUserSchema } from '../utils/schemaValidate';

const register = (req, res) => {
    // validate request data
    const result = validate(req.body, registerSchema);
    if (!result.valid) {
        return res.status(400).send({
            statusCode: 400,
            message: 'Bad request.',
            error: result.error
        });
    }

    // find the user base on email
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send({
            statusCode: 500,
            message: 'Error on the server.',
            error: err
        });
        if (user) return res.status(409).send({
            statusCode: 409,
            message: "This email has been registered."
        });
        // hass password
        const hashedPassword = hashSync(req.body.password, 8);
        // create user on mongodb
        User.create({
            displayName: req.body.displayName,
            email: req.body.email,
            password: hashedPassword
        },
            (err, user) => {
                if (err) return res.status(500).send({
                    statusCode: 500,
                    message: "There was a problem finding the user.",
                    error: err
                });

                // if user is registered without errors
                // create a token
                const token = sign({
                    id: user._id
                }, verifyTokenKey.key, {
                        expiresIn: 86400 // expires in 24 hours
                    });

                res.status(200).send({
                    statusCode: 200,
                    auth: true,
                    token: token,
                    message: "Successfully registered."
                });
            });
    });
}

const login = (req, res) => {
    // validate request data
    const result = validate(req.body, loginSchema);
    if (!result.valid) {
        return res.status(400).send({
            statusCode: 400,
            message: 'Bad request.',
            error: result.error
        });
    }
    // find the user base on email
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send({
            statusCode: 500,
            message: 'Error on the server.',
            error: error
        });
        if (!user) return res.status(401).send({
            statusCode: 401,
            message: "The email incorrect."
        });

        // check if the password is valid
        const passwordIsValid = compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({
            statusCode: 401,
            auth: false,
            token: null,
            message: 'Failed login.'
        });

        // if user is found and password is valid
        // create a token
        const token = sign({ id: user._id }, verifyTokenKey.key, {
            expiresIn: 86400 // expires in 24 hours
        });

        // return the information including token as JSON
        res.status(200).send({
            statusCode: 200,
            auth: true,
            token: token,
            message: "Successfully login."
        });
    });
}

// logout
const logout = (req, res) => {
    res.status(200).send(
        { statusCode: 200, auth: false, token: null, message: "Successfully logout." }
    );
}

//update info
const updateUser = (req, res) => {
    const result = validate(req.body, updateUserSchema);
    
    if (!result.valid) {
        return res.status(400).send({
            statusCode: 400,
            message: 'Bad request.',
            error: result.error
        });
    }
    res.status(200).send({
        passed: true
    })
    // User.findByIdAndUpdate(req.params.id, req.body, { new: true, password: 0 }, function (err, user) {
    //     if (err) return res.status(500).send(
    //         {
    //             statusCode: 500,
    //             message: "There was a problem updating the user.",
    //             error: err
    //         }
    //     );
    //     res.status(200).send(
    //         { statusCode: 200, message: "Successfully updated.", data: user }
    //     );
    // });
}
// delete user
const deleteUser = (req, res) => {

}

export { register, login, logout, updateUser, deleteUser };