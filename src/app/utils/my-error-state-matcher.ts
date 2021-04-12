import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    const controlInvalid: boolean = (control && control.invalid && (control.dirty || control.touched || isSubmitted));
    let formInvalid: boolean;
    // 点击并且离开了
    if (control && control.touched) {
      formInvalid = (control && form && form.hasError('identityRevealed') && (control.dirty || isSubmitted));
    } else {
      formInvalid = (control && form && form.hasError('identityRevealed') && (control.touched || isSubmitted));
    }
    return controlInvalid || formInvalid;
  }
}
