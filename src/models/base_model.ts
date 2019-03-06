import * as Knex from 'knex';
import * as luxon from 'luxon';
import {Model} from 'objection';
import * as uuid from 'uuid';

// tslint:disable:no-var-requires
const knex = Knex(require('../../knexfile')[process.env.NODE_ENV || 'development']);

Model.knex(knex);

export default class BaseModel extends Model {
    public id: string;
    // tslint:disable:variable-name
    public date_created: string;
    public date_modified: string;
    public date_deleted: string;

    public version: number;

    public $beforeInsert() {
        // this.id = this.id || uuid.v4();
        this.date_created = luxon.DateTime.local().toFormat('yyyy-MM-dd hh:mm:ss');
    }

    public $beforeUpdate() {
        this.date_modified = luxon.DateTime.local().toFormat('yyyy-MM-dd hh:mm:ss');
    }
}
