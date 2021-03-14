import { FormControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

/**
 * 验证邮箱
 * @param control
 */
export function emailValidator(control: FormControl): {[key: string]: any} | null {
  let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  const regResult = reg.test(control.value);
  return regResult ? null: { emailNotValid: {value: control.value}};
}

/**
 * 密码的正则验证
 * @param password
 */
function regExpPassword(password: string): boolean {
  let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/;
  return reg.test(password);

}

/**
 * 验证密码
 * @param control
 */
export function passwordValidator(control: FormControl): {[key: string] : any} | null {
  const regResult = regExpPassword(control.value);
  return regResult ? null: {'passwordNotValid': {value: control.value}};
}

export function confirmPasswordValidator(control: FormControl): {[key: string] : any} | null {
  const regResult = regExpPassword(control.value);
  return regResult ? null: {'confirmPasswordNotValid': {value: control.value}};

}

export const identityRevealedValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password.value === confirmPassword.value ? null: { 'identityRevealed': true };
};
