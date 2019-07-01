import BaseModel from "./base_model";

export class District extends BaseModel {
    static tableName = "district";

    name: string;
    city_id: string;
}
