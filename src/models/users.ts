import { Model } from 'objection';

export class User extends Model {
  name!: string;
  password!: string;
  salt!: string | null;

  static get tableName() {
    return 'user';
  }
}
