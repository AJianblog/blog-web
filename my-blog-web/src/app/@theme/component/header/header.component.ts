import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthorService} from "../../../@core/interface/author.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../../@core/interface/user-service";
import {CodeEnum} from "../../../entity/code-enum";
import {User} from "../../../model/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  nickName: string;

  userInfo: User;

  formGroup: FormGroup;

  @Input()
  showMenu: boolean = true;

  /**
   * 菜单按钮点击事件
   */
  @Output()
  menuPress: EventEmitter<void> = new EventEmitter<void>();

  constructor(private authorService: AuthorService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit() {
    this.nickName = this.route.snapshot.paramMap.get('nickName');
    this.getUserInfo();
    this.formGroup = this.fb.group({
      search: [null]
    });
  }

  /**
   * 是否为登录状态
   */
  get isLogin() {
    return this.authorService.isLogin();
  }

  /**
   * 退出登录
   */
  quit() {
    this.authorService.quit();
  }

  search() {
    let queryParams: any = {
      pageIndex: 1,
      pageSize: 10,
      search: this.formGroup.value.search
    };
    if (this.route.snapshot.queryParamMap.get('type')) {
      queryParams.type = this.route.snapshot.queryParamMap.get('type');
    }
    this.router.navigate(['/blog', this.nickName], {
      queryParams: queryParams,
      relativeTo: this.route
    })

  }

  getUserInfo() {
    this.userService.findUserByNickname(this.nickName).subscribe(data => {
      if (data.code === CodeEnum.SUCCESS) {
        this.userInfo = data.data;
      }
    })
  }

}
