import { AbstractControl, ValidatorFn } from '@angular/forms';

export function RadioButtonCheckedValidator(minRequired = 1): ValidatorFn {
  return function validate(control: AbstractControl) {
    let checked = 0;

    control.value.forEach((option: any) => {
      if (!!option.correct) {
        checked++;
      }
    });

    if (checked < minRequired) {
      return {
        requireOptionToBeChecked: true
      }
    }

    return null;
  }
}