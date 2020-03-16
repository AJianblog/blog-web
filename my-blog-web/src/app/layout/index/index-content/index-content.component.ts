import {Component, OnInit} from '@angular/core';
import {BlogService} from "../../../@core/interface/blog.service";
import {StorageMessage} from "../../../utils/storage-message";
import {PageResult} from "../../../entity/page-result";
import {CodeEnum} from "../../../entity/code-enum";
import {BlogTypeAccountService} from "../../../@core/interface/blog-type-account.service";
import {BlogTypeAccount} from "../../../model/blog-type-account";
import {PageEvent} from "@angular/material/paginator";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {BlogAndTypeAndTagGroup} from "../../../entity/group/BlogAndTypeAndTagGroup";

@Component({
  selector: 'app-index-content',
  templateUrl: './index-content.component.html',
  styleUrls: ['./index-content.component.scss']
})
export class IndexContentComponent implements OnInit {

  pageResult: PageResult<BlogAndTypeAndTagGroup>;

  /**
   * 用户博客分类数量
   */
  blogTypeAccount: BlogTypeAccount[];

  /**
   * 用户的昵称
   */
  nickName: string;

  /**
   * 用户id
   */
  userId: number;

  /**
   * 页条数
   */
  pageSize: number = 10;

  /**
   * 页数
   */
  pageIndex: number = 1;

  /**
   * 搜索博客分类内容
   */
  type: string = null;

  /**
   * 搜索内容
   */
  search: string = null;


  constructor(private blogService: BlogService, private blogTypeAccountService: BlogTypeAccountService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.nickName = StorageMessage.getUserInfo() && JSON.parse(StorageMessage.getUserInfo()).nickName;
    // this.userId = StorageMessage.getUserInfo() && JSON.parse(StorageMessage.getUserInfo()).userId;
    this.userId = +this.route.snapshot.paramMap.get('id');
    this.route.queryParamMap.subscribe((params: Params) => {
      this.pageIndex = +params.get('pageIndex') || 1;
      this.pageSize = +params.get('pageSize') || 10;
      this.type = params.get('type') || null;
      this.search = params.get('search') || null;
      this.findNewestBlog();
    });
    this.findUserBlogTypeAccount();
  }

  /**
   * 查找用户最新的博客
   */
  findNewestBlog() {
    console.log(this.type);
    this.blogService.searchUserBlog(this.userId, this.pageIndex, this.pageSize, this.type, this.search).subscribe(data => {
      if (data.code === CodeEnum.SUCCESS) {
        this.pageResult = data.data;
      }
    })
  }

  /**
   * 查找用户博客分类数量
   */
  findUserBlogTypeAccount() {
    this.blogTypeAccountService.findUserBlogTypeAccount(this.userId).subscribe(data => {
      if (data.code === CodeEnum.SUCCESS) {
        this.blogTypeAccount = data.data;
      }
    })
  }

  /**
   * 分页页数改变事件
   * @param pageEvent 分页事件
   */
  page(pageEvent: PageEvent) {
    this.pageIndex = pageEvent.pageIndex + 1;
    this.pageSize = pageEvent.pageSize;
    this.routerJump();
  }

  /**
   * 搜索博客分类
   * @param blogTypeAccount
   */
  blogTypeSearch(blogTypeAccount: BlogTypeAccount) {
    this.type = blogTypeAccount.typeName;
    this.pageIndex = 1;
    this.routerJump();
  }

  /**
   * 构建参数
   */
  routerJump() {
    let queryParams: any = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    };
    if (this.type !== null) {
      queryParams.type = this.type;
    }
    if (this.search !== null) {
      queryParams.search = this.search;
    }
    this.router.navigate(['./'], {
      queryParams: queryParams,
      relativeTo: this.route
    });
  }


}
