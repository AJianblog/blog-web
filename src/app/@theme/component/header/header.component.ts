import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthorService} from '../../../@core/interface/author.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../../model/user';
import { getUserInfo } from '../../../utils/localStorageInfo/userInfo';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  get userInfo(): User {
    return getUserInfo();
  }

  formGroup: FormGroup;

  @Input()
  showMenu = true;

  @Input()
  menus: { router: string; title: string }[] = [];

  /**
   * 菜单按钮点击事件
   */
  @Output()
  menuPress: EventEmitter<void> = new EventEmitter<void>();

  constructor(private authorService: AuthorService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
  }

  ngOnInit() {
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
    const queryParams: any = {
      pageIndex: 1,
      pageSize: 10,
      search: this.formGroup.value.search
    };
    if (this.route.snapshot.queryParamMap.get('type')) {
      queryParams.type = this.route.snapshot.queryParamMap.get('type');
    }
    this.router.navigate(['/blog'], {
      queryParams,
      relativeTo: this.route
    });
  }

}
