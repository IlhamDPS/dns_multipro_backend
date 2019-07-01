import BaseModel from "./base_model";

export class Province extends BaseModel {
    static tableName = "province";

    name: string;
}
