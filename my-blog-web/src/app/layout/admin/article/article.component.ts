import {Component, OnInit} from '@angular/core';
import {EditorConfig} from "../../../config/EditorConfig";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {
  ArticleInfoDialogComponent,
  ArticleInfoDialogInputData
} from "./article-info-dialog/article-info-dialog.component";
import {BlogService} from "../../../@core/interface/blog.service";
import {Blog} from "../../../model/blog";
import {StorageMessage} from "../../../utils/storage-message";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {SnackBarService} from "../../../service/snackBar.service";
import {CodeEnum} from "../../../entity/code-enum";
import {ReturnModel} from "../../../entity/return-model";
import {Constant} from "../../../entity/constant";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  /**
   * editor的配置参数信息
   */
  config: EditorConfig;

  /**
   * 博客id,有博客的id,那么为更新,没有博客的id为新增
   */
  blogId: number;

  /**
   * markdown的内容
   */
  markdown: string;

  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private blogService: BlogService,
              private snackBarService: SnackBarService, private router: Router, private route: ActivatedRoute) {
    this.config = new EditorConfig({height: '500px'});
    this.markdown = '';
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      title: [null, Validators.required],
      markdown: [null, [Validators.required]]
    });
    this.route.paramMap.subscribe((params: Params) => {
      // 通过路径获取博客的id
      this.blogId = +params.get('blogId');
      if (this.blogId) {
        this.findBlogById();
      }
    })
  }

  /**
   * 通过博客的id查找博客的信息
   */
  findBlogById() {
    this.blogService.findBlogById(this.blogId, false).subscribe((data: ReturnModel<Blog>) => {
      if (data.code === CodeEnum.SUCCESS) {
        this.formGroup.patchValue(data.data);
      }
    })
  }

  /**
   * 表单提交
   */
  submit() {
    if (this.formGroup.invalid) {
      return;
    }
    const userId = JSON.parse(StorageMessage.getUserInfo()).userId;
    this.blogService.findBlogByUserIdAndTitle(userId, this.title.value).subscribe(data => {
      /*
      找到的情况分为更新和新建,
      如果是新建找到了,那么就冲突了
      如果是更新找到了,如果博客的id和找到的id不一样,那么就冲突了,如果博客的id和找到的id一样,那么就没冲突(没有改标题所以可以找到)
       */
      if (data.code === 1) {
        if (!this.blogId) {
          // 新增文章的标题和其他的冲突
          this.snackBarService.failure('博客标题名称存在');
        } else if (data.data.id !== this.blogId && data.data.title === this.title.value) {
          // 更新文章的标题与其他的冲突
          this.snackBarService.failure('博客的标题和你的其他博客的标题冲突');
        } else {
          this.openDialog(data.data);
        }
      } else if (data.code === 0) {
        this.openDialog(data.data);
      }
    })
  }

  /**
   * 点击保存博客
   */
  openDialog(blog: Blog) {
    const dialogInputData: ArticleInfoDialogInputData = {dialogTitle: '添加博客'};
    if (this.blogId) {
      dialogInputData.dialogTitle = '更新博客';
      dialogInputData.blog = blog;
    }
    const dialogRef = this.dialog.open(ArticleInfoDialogComponent, {
      autoFocus: false,
      width: '820px',
      data: dialogInputData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const userId = JSON.parse(StorageMessage.getUserInfo()).userId;
        if (this.blogId) {
          console.log(blog);
          const updateBlog: Blog = {...blog, ...result, ...this.formGroup.value, userId, id: this.blogId};
          console.log(updateBlog);
          this.updateBlog(updateBlog);
        } else {
          const num = Math.floor(Math.random() * 18 + 1);
          const blog: Blog = {
            ...result, ...this.formGroup.value,
            userId,
            imageUrl: `${Constant.blogImageUrlPrefix.replace(/num/, String(num))}`
          };
          this.saveBlog(blog);
        }
      }
    })
  }

  /**
   * 保存博客
   * @param blog
   */
  saveBlog(blog: Blog) {
    this.blogService.addBlog(blog).subscribe(data => {
      if (data.code === CodeEnum.SUCCESS) {
        this.snackBarService.success(data.message);
        const nickName = JSON.parse(StorageMessage.getUserInfo()).nickName;
        this.router.navigate([`/article/details`, nickName, data.data.id]);
      }
    });
  }

  /**
   * 更新博客
   * @param blog 博客
   */
  updateBlog(blog: Blog) {
    this.blogService.updateBlog(blog).subscribe(data => {
      if (data.code === CodeEnum.SUCCESS) {
        this.snackBarService.success(data.message);
        const nickName = JSON.parse(StorageMessage.getUserInfo()).nickName;
        this.router.navigate([`/blog`, nickName, 'article', this.blogId]);
      }
    });
  }

  get title(): FormControl {
    return this.formGroup.get('title') as FormControl;
  }

  /**
   * 得到标题的错误信息
   */
  getTitleErrorMessage() {
    return this.title.hasError('required') ? '输入不能为空' : '';
  }

}
