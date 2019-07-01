import BaseModel from "./base_model";

export class City extends BaseModel {
    static tableName = "city";

    name: string;
    province_id: string;
}
