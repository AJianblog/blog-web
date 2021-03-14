import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {BlogService} from "../../@core/interface/blog.service";
import {Blog} from "../../model/blog";
import {CodeEnum} from "../../entity/code-enum";



@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  /**
   * 博客id
   */
  blogId: number;

  /**
   * 昵称
   */
  nickName: string;

  blog: Blog;

  constructor(private route: ActivatedRoute, private blogService: BlogService, private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      this.blogId = params.get('blogId');
      this.nickName = params.get('nickName');
      this.findBlogById();
    })
  }

  /**
   *
   */
  findBlogById() {
    this.blogService.findBlogById(this.blogId).subscribe(data => {
      if (data.code === CodeEnum.SUCCESS) {
        this.blog = data.data;
      }
    })
  }

  goDetail(id: string) {
    // 路由跳转
    let _path = window.location.pathname;

    this.router.navigate([`${_path}`], {fragment: `${id}`});
  }

  anchorPress(attribute: string) {

  }

}
