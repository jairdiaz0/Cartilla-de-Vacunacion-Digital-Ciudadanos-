import { SchemeModel } from "./scheme/scheme.model";

export interface CardModel{
    "name": string,
    "ageMax": number,
    "ageMin": number,
    "scheme": SchemeModel
}
