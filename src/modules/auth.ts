import {module} from '../decorator/module';
import {del, get, post, put} from '../decorator/route';
import {createModuleLogger} from '../helper/logger';
import {checkToken} from '../middleware/jwt';
import {validator} from '../middleware/validation';
import {login, register} from '../services/auth';

const packageJson = require('../../package.json');

const log = createModuleLogger('auth');

@module('/auth')
export default class AppModuleModule {
    @post('/login', [])
    public async login(ctx) {
        const body = ctx.request.body;
        const data = await login(body);
        ctx.body = {
            status: 200,
            message: 'OK',
            data
        };
    }

    @post('/register', [])
    public async register(ctx) {
        const body = ctx.request.body;
        const data = await register(body);
        ctx.body = {
            status: 200,
            message: 'OK',
        };
    }
}
