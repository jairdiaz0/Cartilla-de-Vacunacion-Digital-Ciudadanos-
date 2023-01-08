import { DoseModel } from "./dose/dose.model"

export interface VaccineModel{
    name: string,
    description: string,
    dose: Array<DoseModel>
}
