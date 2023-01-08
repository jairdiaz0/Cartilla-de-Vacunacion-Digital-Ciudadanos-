import { ApplicationModel } from "./application/application.model"

export interface DoseModel{
    type: string,
    age: number,
    months: number,
    application?: ApplicationModel
}
