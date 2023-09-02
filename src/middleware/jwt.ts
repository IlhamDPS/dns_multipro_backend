import * as koaJwt from 'koa-jwt';
import * as jwt from "jsonwebtoken";
import {appConfig} from '../../config/app';

export const checkToken = (ctx, next) => {
    const token = ctx.headers.authorization;
    try {
        if (!token) {
          ctx.throw(401, 'Authorization token is missing');
        }
        const decodedToken = jwt.verify(token.split(" ").pop(), appConfig.secret);
        ctx.state.user = decodedToken;
        return next();
      } catch (error) {
        ctx.throw(401, 'Invalid or expired token');
      }
    return
}

export const generateToken = async (user) => {
    const tokenData = {
        username: user.username
    }
    return jwt.sign(tokenData, appConfig.secret)
}

