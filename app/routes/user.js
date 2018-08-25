// import the user schema
import User from '../models/user';

import { sign } from 'jsonwebtoken';
import { hashSync } from 'bcryptjs';
import {verifyTokenKey  } from '../config/token';

const register = (req, res) => {
    if (!req.body || !req.body.displayName || !req.body.email || !req.body.password) {
        return res.status(400).send({
            statusCode: 400,
            message: "Bad Request. The body request are empty!!!"
        });
    }

    let hashedPassword = hashSync(req.body.password, 8);

    User.create({
        displayName: req.body.displayName,
        email: req.body.email,
        password: hashedPassword
    },
    (err, user) => {
        if (err) return res.status(500).send({
            statusCode: 500,
            message: "There was a problem finding the user."
        });

        // if user is registered without errors
        // create a token
        let token = sign({
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
}
export { register };