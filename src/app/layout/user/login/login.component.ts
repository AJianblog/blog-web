import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../@core/interface/user-service";
import {StorageMessage} from "../../../utils/storage-message";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackBarService} from "../../../service/snackBar.service";

/**
 * 登录组件
 * @author 何志坚
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /**
   * 登录表单控件
   */
  loginFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private snackbar: MatSnackBar,
              private snackBarService: SnackBarService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.loginFormGroup = this.fb.group({
      account: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  /**
   * 用户登录
   */
  userLogin() {
    this.userService.login(this.loginFormGroup.value).subscribe(data => {
      if (data.code) {
        StorageMessage.setToken(data.message);
        StorageMessage.setUserInfo(JSON.stringify(data.data));
        this.snackBarService.success('登录成功');
        this.router.navigate(['/blog', data.data.nickName]);
      } else {
        this.snackBarService.failure(data.message);
      }
    })
  }


  /**
   * 得到登录的错误信息
   */
  getPasswordErrorMessage() {
    return this.password.hasError('required') ? '输入不能为空' :
      '';
  }

  /**
   * 得到登录账户的错误信息
   */
  getAccountErrorMessage() {
    return this.account.hasError('required') ? '输入不能为空' :
      '';
  }

  get account(): FormControl {
    return this.loginFormGroup.get('account') as FormControl;
  }

  get password(): FormControl {
    return this.loginFormGroup.get('password') as FormControl;
  }

}
