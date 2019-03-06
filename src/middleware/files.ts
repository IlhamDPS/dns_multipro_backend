import * as fs from 'fs-extra';
import * as mime from 'mime-types';
import * as path from 'path';
import * as sharp from 'sharp';
import {appConfig} from '../../config/app';
import {KoaPartial} from './partial_response';

export async function streamVideo(ctx, next) {

    const {params, path} = ctx;

    const part = new KoaPartial(process.cwd());
    const isMedia = params.id.match(/\.(mp3|mp4|flv|webm|ogv|mpg|wav|ogg|mov)$/ig);

    if (!isMedia) {
        await next();
        return;
    }

    ctx.path = `/uploads/${params.id}`; // TODO: update this to not use hard coded path

    return part.sendResponse(ctx);
}

export async function resizeAndCacheImage(ctx, next) {
    const {params} = ctx;

    const detectedMime = mime.lookup(params.id);

    if (!detectedMime) {
        await next();
        return;
    }

    if (!detectedMime.includes('image')) {
        await next();
        return;
    }

    let dimensW = ctx.request.query.dimensW;
    let dimensH = ctx.request.query.dimensH;

    if (!(dimensW || dimensH)) {
        await next();
        return;
    }

    if (dimensW) {
        dimensW = +dimensW;
    }
    if (dimensH) {
        dimensH = +dimensH;
    }

    const split = ctx.params.id.split('.');

    let filesystemPath = '';
    if (dimensW && dimensH) {
        filesystemPath = `${split[0]}_rsz_approx_x${dimensW}_y${dimensH}.${split[1]}`;
    } else if (dimensW) {
        filesystemPath = `${split[0]}_rsz_approx_x${dimensW}.${split[1]}`;
    } else if (dimensH) {
        filesystemPath = `${split[0]}_rsz_approx_y${dimensH}.${split[1]}`;
    }

    const exists = await fs.pathExists(path.join(appConfig.upload_dir, filesystemPath));

    if (!exists) {
        await sharp(path.join(appConfig.upload_dir, ctx.params.id))
            .resize(dimensW, dimensH)
            .toFile(path.join(appConfig.upload_dir, filesystemPath));
    }

    ctx.params.id = filesystemPath;
    await next();
    return;
}
