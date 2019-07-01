import BaseModel from "./base_model";

export class UserProfile extends BaseModel {
    fullname: string;
    phone_number: string;

    static get tableName() {
        return 'user_profile';
    }
}
