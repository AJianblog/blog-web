import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BlogTypeAccountService} from "../../../@core/interface/blog-type-account.service";
import {BlogTypeAccount} from "../../../model/blog-type-account";
import {CodeEnum} from "../../../entity/code-enum";

@Component({
  selector: 'app-index-blog-type-account',
  templateUrl: './index-blog-type-account.component.html',
  styleUrls: ['./index-blog-type-account.component.scss']
})
export class IndexBlogTypeAccountComponent implements OnInit {

  menuList: BlogTypeAccount[];

  /**
   * 用户的昵称
   */
  @Input()
  nickName: string;

  @Output()
  blogTypePress: EventEmitter<BlogTypeAccount> = new EventEmitter<BlogTypeAccount>();


  constructor(private blogTypeAccountService: BlogTypeAccountService) {
  }

  ngOnInit() {
    this.findUserBlogTypeAccount();
  }

  /**
   * 查找博客分类数量
   * @return 博客数量列表
   */
  findUserBlogTypeAccount() {
    this.blogTypeAccountService.findUserBlogTypeAccount(this.nickName).subscribe(data => {
      if (data.code === CodeEnum.SUCCESS) {
        this.menuList = data.data;
      }
    })
  }

}
