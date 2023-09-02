import {module} from '../decorator/module';
import {del, get, post, put} from '../decorator/route';
import {createModuleLogger} from '../helper/logger';
import {checkToken} from '../middleware/jwt';
import {getJobList, getJobDetail} from '../services/job';

const packageJson = require('../../package.json');

const log = createModuleLogger('job');

@module('/job')
export default class AppModuleModule {
    @get('/', [checkToken])
    public async listJob(ctx) {
        const { description, location, full_time, page } = ctx.request.query;
        const data = await getJobList(description, location, full_time, page);
        ctx.body = {
            status: 200,
            message: 'OK',
            data
        };
    }


    @get('/:id', [checkToken])
    public async detailJob(ctx) {
        const idJob = ctx.params.id;
        console.log(idJob)
        const data = await getJobDetail(idJob);
        ctx.body = {
            status: 200,
            message: 'OK',
            data
        };
    }
}
