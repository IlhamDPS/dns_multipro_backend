import BaseModel from "./base_model";

export class Subdistrict extends BaseModel {
    static tableName = "subdistrict";

    name: string;
    district_id: string;
}
