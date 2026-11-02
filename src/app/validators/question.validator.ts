import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function meaningfulQuestionValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = String(control.value ?? '').trim();

    if (value.length < minLength) {
      return {
        meaningfulMinLength: {
          requiredLength: minLength,
          actualLength: value.length,
        },
      };
    }

    return null;
  };
}
