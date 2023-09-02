import {module} from '../decorator/module';
import {del, get, post, put} from '../decorator/route';
import {createModuleLogger} from '../helper/logger';
import {checkToken} from '../middleware/jwt';
import {getJobList} from '../services/job';

const packageJson = require('../../package.json');

const log = createModuleLogger('job');

@module('/job')
export default class AppModuleModule {
    @get('/', [checkToken])
    public async login(ctx) {
        const { description, location, full_time, page } = ctx.request.query;
        console.log(ctx.request.query, "ini dia")
        console.log(location, "ini dia")
        const data = await getJobList(description, location, full_time, page);
        ctx.body = {
            status: 200,
            message: 'OK',
            data
        };
    }
}
