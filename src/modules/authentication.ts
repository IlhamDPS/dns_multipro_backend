import {module} from '../decorator/module';
import {del, get, post,put} from "../decorator/route";
import {createModuleLogger} from '../helper/logger';
import {Users} from "../models/users";
import {appConfig} from "../../config/app";
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import {validator} from "../middleware/validation";

const log = createModuleLogger("authentication");

@module("/v1/authentication")
export default class AuthenticationModule {
    @post("/login",[validator.body({
        email : "string",
        password: "string"
    })])
    async login(ctx) {
        const {request: {body}} = ctx;

        const user = await Users.query().findOne({
            email: body.email,
            deleted_at : null
        });

        if(!user) {
            ctx.status = 400;
            ctx.body = {
                message: 'User not found'
            };
            return;
        }
        if(user.password !== crypto.pbkdf2Sync(body.password.toString(), user.salt, 50, 100, 'sha512').toString('hex')) {
            ctx.status = 400;
            ctx.body = {
                message: 'invalid password'
            };
            return;
        }

        let result:any = {};


        ctx.body = {
            token: this.createToken(user)
        };
    }

    createToken(user) {
        return jwt.sign({
            user_id: user.id,
            email : user.email,
        }, appConfig.secret, {expiresIn: '24d', algorithm: 'HS256'});
    }



}
