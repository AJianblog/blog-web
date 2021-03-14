import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../@core/interface/user-service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MyErrorStateMatcher} from "../../../utils/my-error-state-matcher";
import {identityRevealedValidator} from "../../../utils/userVerification";
import {ActivatedRoute, Router} from "@angular/router";
import {TCaptchaCode} from "../../../entity/TCaptchaCode";
import {SnackBarService} from "../../../service/snackBar.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  /**
   * 登录表单控件
   */
  registerFormGroup: FormGroup;

  /**
   * 获取验证码内容
   */
  getCodeValueButton: string = '获取验证码';

  /**
   * 验证的倒计时
   */
  time: number = 60;

  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder, protected userService: UserService, private snackbar: MatSnackBar, private router: Router, private activatedRoute: ActivatedRoute, private snackBarService: SnackBarService) {
  }

  ngOnInit() {
    this.registerFormGroup = this.fb.group({
      account: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required])],
      confirmPassword: [null, Validators.compose([Validators.required])],
      code: [null, Validators.compose([Validators.required])]
    }, {validators: identityRevealedValidator});
  }

  /**
   * 用户注册
   */
  register() {
    if (this.registerFormGroup.invalid) {
      return;
    }
    this.userService.register(this.registerFormGroup.value).subscribe(data => {
      if (data.code) {
        this.snackBarService.success(data.message);
        this.router.navigate(['../login'], {relativeTo: this.activatedRoute})
      } else {
        this.snackBarService.failure(data.message);
      }
    })
  }

  /**
   * 验证成功
   * @param tCaptchaCode 验证成功返回的值
   */
  verificationSuccess(tCaptchaCode: TCaptchaCode) {
    let interval = setInterval(() => {
      if (this.time < 0) {
        this.getCodeValueButton = '获取验证码';
        clearInterval(interval);
        this.time = 60;
        return;
      }
      this.getCodeValueButton = `${this.time}s`;
      this.time--;
    }, 1000);
    this.sendCode(tCaptchaCode);
  }

  /**
   * 发送验证码
   */
  sendCode(tCaptchaCode: TCaptchaCode) {
    this.userService.verifyTicket(tCaptchaCode.ticket, tCaptchaCode.randstr).subscribe(data => {
      if (data.code >= 0 && data.code < 100) {
        this.sendRegisterCode();
      }
    });
  }

  /**
   * 发送邮件验证码
   */
  sendRegisterCode() {
    this.userService.sendRegisterCode(this.account.value).subscribe(data => {
      if (data.code == 1) {
        this.snackBarService.success(data.message);
      } else {
        this.snackBarService.failure(data.message);
      }
    })
  }


  /**
   * 得到密码的错误信息
   */
  getPasswordErrorMessage() {
    return this.password.hasError('required') ? '输入不能为空' :
      '';
  }

  /**
   * 得到确认密码的错误信息
   */
  getConfirmPasswordErrorMessage() {
    return this.confirmPassword.hasError('required') ? '输入不能为空' :
      this.registerFormGroup.hasError('identityRevealed') ? '两次输入的密码不同' :
        '';
  }

  /**
   * 得到验证码的错误信息
   */
  getCodeErrorMessage() {
    return this.code.hasError('required') ? '输入不能为空' : '';
  }

  /**
   * 得到账户的错误信息
   */
  getAccountErrorMessage() {
    return this.account.hasError('required') ? '输入不能为空' :
      this.account.hasError('email') ? '邮箱格式错误' :
        '';
  }

  get account(): FormControl {
    return this.registerFormGroup.get('account') as FormControl;
  }

  get password(): FormControl {
    return this.registerFormGroup.get('password') as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.registerFormGroup.get('confirmPassword') as FormControl;
  }

  get code(): FormControl {
    return this.registerFormGroup.get('code') as FormControl;
  }

}
