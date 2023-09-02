import * as crypto from "crypto";
import {User} from "../models/users";
import {generateToken} from "../middleware/jwt";
import {ApplicationError} from '../helper/error_handler';
import { v4 } from 'uuid';

export const login = async (body) => {
    const user:any = await User.query().findOne({
        username : body.username
    })

    if(!user){
        throw new ApplicationError({
            message: 'User not found',
            http_code: 404
        })
    }

    const password = crypto.pbkdf2Sync(body.password.toString(), user.salt, 50, 100, 'sha512').toString('hex');
    if(user.password !== password){
        throw new ApplicationError({
            message: 'Password did not match',
            http_code: 400
        })
    };

    const token = await generateToken(user);

    return {
        token
    }
}

export const register = async (body: any) => {
    const checkUsername =  await User.query().findOne({username: body.username});

    if(checkUsername){
        throw new ApplicationError({
            message: 'Username Already Exist',
            type: 'BodyValidationError',
            detail: body
        });
    }
    
    try {
        const {salt, password} = generatePassword(body.password);
        return User.query().insert({
            username: body.username,
            password: password,
            salt: salt,
        });
    } catch (e) {
        throw e;
    }
}


export const generatePassword = (passwordString) => {
    let salt = v4().replace(/-/g, "");
    let password = crypto
        .pbkdf2Sync(
            passwordString,
            salt,
            50,
            100,
            "sha512"
        )
        .toString("hex");

    return {
        salt,
        password
    }
}
