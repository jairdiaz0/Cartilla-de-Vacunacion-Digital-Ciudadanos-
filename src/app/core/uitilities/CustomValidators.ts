import { AbstractControl } from '@angular/forms';

export class CustomValidators {
  
  static dateValidator(yearsMin: number) {
    let dateNow = new Date();
    let dateOld = new Date(dateNow.getDate());
    dateOld.setFullYear(dateOld.getFullYear() - yearsMin);
    return (control: AbstractControl) => {
      let date = new Date(control.value);
      if (date < dateNow && date > dateOld) {
        return null;
      }
      return {
        dateNow: dateNow,
        dateOld: dateOld,
        dateControl: date,
      };
    };
  }

  static setUpper(control: AbstractControl) {
    const value: string = control.value;
    if (value) {
      if (!(value === value.toUpperCase())) {
        control.setValue(value.toUpperCase());
      }
    }
    return null;
  }

  static setLower(control: AbstractControl) {
    const value: string = control.value;
    if (value) {
      if (!(value == value.toLowerCase())) {
        control.setValue(value.toLowerCase());
      }
    }
    return null;
  }
}
