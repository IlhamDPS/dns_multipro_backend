const insertIfNotExist = require('../src/helper/seed_insert').insertIfNotExist;
const user_types = require('./master_data/user_types');

const _ = require('lodash');
const bluebird = require('bluebird');

const provinsi = require('./master_data/provinsi');
const kabupaten = require('./master_data/kabupaten');
const kecamatan = require('./master_data/kecamatan');
const villages = require('./master_data/villages');


exports.seed = async function(knex, Promise) {
    await insertIfNotExist('user_types', user_types, knex, true);

    console.log('1..');
    console.log('2');
    await insertIfNotExist('province', provinsi.map(it => ({
        id: it.id,
        name: it.name
    })), knex, false);
    console.log('3');
    await insertIfNotExist('city', kabupaten.map(it => ({
        id: it.id,
        name: it.name,
        province_id: it.province_id,
    })), knex, false);
    console.log('4');
    await insertIfNotExist('district', kecamatan, knex, false);
    console.log('4,s');
    const subdistrict = villages;
    console.log('5');

    const chunked = _.chunk(subdistrict, 10000);
    console.log('6');
    await bluebird.mapSeries(chunked, (it, idx) => {
        // console.log(it, 'it');
        console.log(`${idx}/${chunked.length}`);
        return insertIfNotExist('subdistrict', it, knex, false);
    });
    console.log('done');
};

