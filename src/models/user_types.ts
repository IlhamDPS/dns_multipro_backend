import BaseModel from "./base_model";

export class UserTypes extends BaseModel {
    name: string;

    static get tableName() {
        return 'user_types';
    }
}
