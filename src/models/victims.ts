import BaseModel from "./base_model";
import {UserTypes} from "./user_types";
import {Model} from 'objection';
import {UserProfile} from "./user_profile";

export class Victims extends BaseModel {
    user_id: string;
    household_head: string;
    kk_number: string;
    address: string;
    village: string;
    rt: string;
    rw: string;
    subdistrict: string;
    district: string;
    city: string;
    phone_number: string;
    community_name: string;
    facilitator_name: string;
    facilitator_phone_number: string;
    applicator_name: string;
    applicator_phone_number: string;
    damage_type: string;
    household_head_picture: string;
    house_photo: [];

    static get tableName() {
        return 'victims';
    }

    static relationMappings = {

    }
}
