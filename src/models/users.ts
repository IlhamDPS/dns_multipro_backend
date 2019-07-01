import BaseModel from "./base_model";
import {UserTypes} from "./user_types";
import {Model} from 'objection';
import {UserProfile} from "./user_profile";

export class Users extends BaseModel {
    email: string;
    password: string;
    salt: string;
    user_type_id: string;
    user_type ?: UserTypes;
    profile ?: UserProfile;

    static get tableName() {
        return 'user_types';
    }

    static relationMappings = {
        user_type: {
            relation: Model.BelongsToOneRelation,
            modelClass: UserTypes,
            join: {
                from: `${UserTypes.tableName}.id`,
                to: `${Users.tableName}.user_type_id`
            }
        },
        profile : {
            relation: Model.HasOneRelation,
            modelClass: UserProfile,
            join: {
                from: `${UserProfile.tableName}.user_Id`,
                to: `${Users.tableName}.id`
            }
        }
    }
}
