import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BlogTypeService} from "../../../../@core/interface/blog-type.service";
import {BlogType} from "../../../../model/blog-type";
import {TagService} from "../../../../@core/interface/tag-service";
import {MatSelectChange} from "@angular/material/select/typings/select";
import {Tag} from "../../../../model/tag";
import {
  DialogLayoutInputModule
} from "../../../../@theme/component/dialog-layout/dialog.layout.component";
import {Blog} from "../../../../model/blog";
import {CodeEnum} from "../../../../entity/code-enum";

export class ArticleInfoDialogInputData extends DialogLayoutInputModule {
  /**
   * 博客的信息
   */
  blog?: Blog;
}

@Component({
  selector: 'app-article-info-dialog',
  templateUrl: './article-info-dialog.component.html',
  styleUrls: ['./article-info-dialog.component.scss']
})
export class ArticleInfoDialogComponent implements OnInit {

  /**
   * 从外部传给dialog的数据
   */
  dialogInputData: ArticleInfoDialogInputData;

  /**
   * 表单控件
   */
  formGroup: FormGroup;

  /**
   * 博客分类列表
   */
  blogType: BlogType[];

  /**
   * 标签列表
   */
  tagList: Tag[];


  constructor(public dialogRef: MatDialogRef<ArticleInfoDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: any,
              private fb: FormBuilder, private blogTypeService: BlogTypeService, private tagService: TagService) {
  }

  ngOnInit() {
    this.dialogInputData = JSON.parse(JSON.stringify(this.data));
    this.formGroup = this.fb.group({
      blogTypeId: [null],
      tagId: [null],
      description: [null],
      imageUrl: [null]
    });
    this.findAllBlogType();
    if (this.dialogInputData.blog) {
      this.findTagByBlogTypeId(this.dialogInputData.blog.blogTypeId);
      this.formGroup.patchValue(this.dialogInputData.blog);
    }
  }

  /**
   * 查找所有的博客分类
   */
  findAllBlogType() {
    this.blogTypeService.findAllBlogType().subscribe(data => {
      if (data && data.code === 1) {
        this.blogType = data.data;
      }
    })
  }

  /**
   * 博客分类下拉值改变
   * @param selectChange 改变的值
   */
  selectionChange(selectChange: MatSelectChange) {
    this.findTagByBlogTypeId(selectChange.value);
  }

  /**
   * 通过博客分类id查找标签信息
   * @param tagId
   */
  findTagByBlogTypeId(tagId: number) {
    this.tagService.findTagByBlogTypeId(tagId).subscribe(data => {
      if (data.code === CodeEnum.SUCCESS) {
        this.tagList = data.data;
      }
    })
  }

  /**
   * 点击确定
   */
  sure() {
    this.dialogRef.close(this.formGroup.value);
  }

}
