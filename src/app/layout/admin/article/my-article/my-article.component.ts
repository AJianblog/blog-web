import {Component, OnInit} from '@angular/core';
import {BlogService} from '../../../../@core/interface/blog.service';
import {StorageMessage} from '../../../../utils/storage-message';
import {Blog} from '../../../../model/blog';
import {CodeEnum} from '../../../../entity/code-enum';
import {PageResult} from '../../../../entity/page-result';
import {MatDialog} from '@angular/material/dialog';
import {
  ConfirmDialogComponent,
  ConfirmDialogInputModule
} from '../../../../@theme/component/confirm-dialog/confirm-dialog.component';
import {SnackBarService} from '../../../../service/snackBar.service';
import {PageEvent} from '@angular/material/paginator';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {BlogAndTypeAndTagGroup} from '../../../../entity/group/BlogAndTypeAndTagGroup';

@Component({
  selector: 'app-my-article',
  templateUrl: './my-article.component.html',
  styleUrls: ['./my-article.component.scss']
})
export class MyArticleComponent implements OnInit {

  /**
   * 页数
   */
  pageIndex = 1;

  /**
   * 页条数
   */
  pageSize = 10;

  /**
   * 分页结果
   */
  pageResult: PageResult<BlogAndTypeAndTagGroup>;

  constructor(private blogService: BlogService, private dialog: MatDialog, private snackbarService: SnackBarService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.pageIndex = +params.get('pageIndex') || 1;
      this.pageSize = +params.get('pageSize') || 10;
      this.getMyBlogList();
    });
  }

  /**
   * 得到博客列表
   */
  getMyBlogList() {
    this.blogService.searchUserBlog(this.nickName, this.pageIndex, this.pageSize).subscribe(data => {
      if (data.code === CodeEnum.SUCCESS) {
        this.pageResult = data.data;
      }
    });
  }

  /**
   * 删除博客
   * @param blog 博客内容
   */
  deleteBlog(blog: Blog) {
    const dialogData: ConfirmDialogInputModule = {title: '删除提示', content: '你确定要删除吗?'};
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '520px',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.blogService.deleteBlog(blog.id).subscribe(data => {
          if (data.code === CodeEnum.SUCCESS) {
            this.snackbarService.success(data.message);
            this.getMyBlogList();
          }
        });

      }
    });
  }

  /**
   * 分页事件
   * @param pageEvent 分页事件
   */
  page(pageEvent: PageEvent) {
    this.router.navigate(['./'], {
      queryParams: {
        pageIndex: pageEvent.pageIndex + 1,
        pageSize: pageEvent.pageSize
      },
      relativeTo: this.route
    });
  }

  get userId() {
    return JSON.parse(StorageMessage.getUserInfo()).userId;
  }

  get nickName() {
    return JSON.parse(StorageMessage.getUserInfo()).nickName;
  }

}
