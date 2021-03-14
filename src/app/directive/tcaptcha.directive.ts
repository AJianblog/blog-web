import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

import "../../assets/js/TCaptcha.js";
import {TCaptchaCode} from "../entity/TCaptchaCode";

declare var TencentCaptcha: any;

@Directive({
  selector: '[appTCaptcha]'
})
export class TCaptchaDirective {

  @Output()
  verificationSuccess: EventEmitter<TCaptchaCode> = new EventEmitter<TCaptchaCode>();

  isLoader: boolean = false;

  value: any;

  constructor() {
  }

  @HostListener('click')
  open() {
    new TencentCaptcha('2024414229', (res: any) => {
      this.value = res;
      this.isLoader = true;
    }).show();
    this.verification();
  }

  verification() {
    let interval = setInterval(() => {
      if (this.isLoader) {
        this.verificationSuccess.emit(this.value);
        this.isLoader = false;
        clearInterval(interval);
      }
    }, 100);
  }


}
