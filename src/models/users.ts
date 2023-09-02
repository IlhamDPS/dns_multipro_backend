import { Model } from 'objection';
import * as Knex from 'knex';
import * as uuid from 'uuid';

const knex = Knex(require('../../knexfile')[process.env.NODE_ENV || 'development']);
Model.knex(knex);


export class User extends Model {
  id!: string;
  username!: string;
  password!: string;
  salt!: string | null;

  static get tableName() {
    return 'user';
  }

  public $beforeInsert() {
    this.id = this.id || uuid.v4();
}
}
