import {Component, OnInit} from '@angular/core';
import {BlogService} from "../../../@core/interface/blog.service";
import {PageResult} from "../../../entity/page-result";
import {CodeEnum} from "../../../entity/code-enum";
import {BlogTypeAccountService} from "../../../@core/interface/blog-type-account.service";
import {BlogTypeAccount} from "../../../model/blog-type-account";
import {PageEvent} from "@angular/material/paginator";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {BlogAndTypeAndTagGroup} from "../../../entity/group/BlogAndTypeAndTagGroup";
import {BlogType} from "../../../model/blog-type";
import {Tag} from "../../../model/tag";
import {TagService} from "../../../@core/interface/tag-service";
import {TagWordCloud} from "../../../entity/chart/tag-word-cloud";

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
   * 标签名称
   */
  tagName: string = null;

  /**
   * 搜索内容
   */
  search: string = null;

  chartOption: any;


  constructor(private blogService: BlogService, private blogTypeAccountService: BlogTypeAccountService,
              private router: Router, private route: ActivatedRoute, private tagService: TagService) {
  }

  ngOnInit() {
    // @ts-ignore
    require('echarts-wordcloud');
    this.nickName = this.route.snapshot.paramMap.get('nickName');
    this.userId = +this.route.snapshot.paramMap.get('userId');
    this.route.queryParamMap.subscribe((params: Params) => {
      this.pageIndex = +params.get('pageIndex') || 1;
      this.pageSize = +params.get('pageSize') || 10;
      this.type = params.get('type') || null;
      this.search = params.get('search') || null;
      this.tagName = params.get('tagName') || null;
      this.searchUserBlog();
    });
    this.findUserBlogTypeAccount();

    this.tagService.tagOfBlogAccount(this.userId).subscribe(data => {
      if (data.code === CodeEnum.SUCCESS) {
        this.onInit(data.data);
      }
    })

  }

  onInit(data: TagWordCloud[]) {
    this.chartOption = {
      tooltip: {
        show: true
      },
      series: [{
        type: "wordCloud",
        shape: 'circle',
        gridSize: 6,
        sizeRange: [12, 50],
        textStyle: {
          normal: {
            color: function () {
              return 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
              ].join(',') + ')';
            }
          },
          emphasis: {
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        data: data,
      }]
    };
  }

  /**
   * 查找用户最新的博客
   */
  searchUserBlog() {
    this.blogService.searchUserBlog(this.userId, this.pageIndex, this.pageSize, this.type, this.search, this.tagName).subscribe(data => {
      if (data.code === CodeEnum.SUCCESS) {
        this.pageResult = data.data;
        // 滚动到最上面
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
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

    if (this.tagName !== null) {
      queryParams.tagName = this.tagName;
    }
    this.router.navigate(['./'], {
      queryParams: queryParams,
      relativeTo: this.route
    });
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
   * 词云图点击事件
   * @param outputData 点击的数据
   */
  chartClick(outputData: any) {
    const tagWordCloud: TagWordCloud = outputData.data;
    if (tagWordCloud) {
      this.tagName = tagWordCloud.name;
      this.pageIndex = 1;
      this.routerJump();
    }
  }


}
