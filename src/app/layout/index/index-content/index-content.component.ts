import {Component, OnInit} from '@angular/core';
import {BlogService} from '../../../@core/interface/blog.service';
import {PageResult} from '../../../entity/page-result';
import {CodeEnum} from '../../../entity/code-enum';
import {BlogTypeAccountService} from '../../../@core/interface/blog-type-account.service';
import {BlogTypeAccount} from '../../../model/blog-type-account';
import {PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BlogAndTypeAndTagGroup} from '../../../entity/group/BlogAndTypeAndTagGroup';
import {BlogType} from '../../../model/blog-type';
import {Tag} from '../../../model/tag';
import { getNickName } from '../../../utils/localStorageInfo/userInfo';

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
  get nickName(): string{
    return getNickName();
  }

  /**
   * 页条数
   */
  pageSize = 10;

  /**
   * 页数
   */
  pageIndex = 1;

  /**
   * 搜索博客分类内容
   */
  type: string = null;

  /**
   * 标签名称
   */
  tagName: string = null;

  /**
   * 搜索内容
   */
  search: string = null;

  constructor(private blogService: BlogService, private blogTypeAccountService: BlogTypeAccountService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params: Params) => {
      this.pageIndex = +params.get('pageIndex') || 1;
      this.pageSize = +params.get('pageSize') || 10;
      this.type = params.get('type') || null;
      this.search = params.get('search') || null;
      this.tagName = params.get('tagName') || null;
      this.searchUserBlog();
    });
    this.findUserBlogTypeAccount();

  }

  /**
   * 查找用户最新的博客
   */
  searchUserBlog() {
    this.blogService.searchUserBlog(this.nickName, this.pageIndex, this.pageSize, this.type, this.search, this.tagName).subscribe(data => {
      if (data.code === CodeEnum.SUCCESS) {
        this.pageResult = data.data;
        // 滚动到最上面
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  }

  /**
   * 查找用户博客分类数量
   */
  findUserBlogTypeAccount() {
    this.blogTypeAccountService.findUserBlogTypeAccount(this.nickName).subscribe(data => {
      if (data.code === CodeEnum.SUCCESS) {
        this.blogTypeAccount = data.data;
      }
    });
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
   * 构建参数
   */
  routerJump() {
    const queryParams: any = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    };
    if (this.type !== null) {
      queryParams.type = this.type;
    }
    if (this.search !== null) {
      queryParams.search = this.search;
    }

    if (this.tagName !== null) {
      queryParams.tagName = this.tagName;
    }
    this.router.navigate( [ './' ], {
      queryParams,
      relativeTo: this.route
    } ).then();
  }

  /**
   * 点击博客分类
   * @param blogType 博客分类信息
   */
  blogTypeClick(blogType: BlogType) {
    this.type = blogType.typeName;
    this.pageIndex = 1;
    this.routerJump();
  }

  /**
   * 点击博客标签
   * @param tag 标签信息
   */
  tagClick(tag: Tag) {
    this.tagName = tag.tagName;
    this.pageIndex = 1;
    this.routerJump();
  }

  /**
   * 选择博客分类
   * @param data 博客分类信息
   */
  choiceBlogType(data) {
    this.type = data.typeName;
    this.routerJump();
  }
}
