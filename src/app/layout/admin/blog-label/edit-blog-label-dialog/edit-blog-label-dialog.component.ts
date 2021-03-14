import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogLayoutInputModule} from "../../../../@theme/component/dialog-layout/dialog.layout.component";
import {BlogTypeService} from "../../../../@core/interface/blog-type.service";
import {BlogType} from "../../../../model/blog-type";
import {CodeEnum} from "../../../../entity/code-enum";
import {Tag} from "../../../../model/tag";

export class EditBlogLabelDialogInputModule extends DialogLayoutInputModule {
  tag?: Tag;
}

@Component({
  selector: 'app-edit-blog-label-dialog',
  templateUrl: './edit-blog-label-dialog.component.html',
  styleUrls: ['./edit-blog-label-dialog.component.scss']
})
export class EditBlogLabelDialogComponent implements OnInit {

  /**
   * 表单控件
   */
  formGroup: FormGroup;

  blogTypeList: BlogType[];

  dialogInputData: EditBlogLabelDialogInputModule;

  constructor(@Inject(MAT_DIALOG_DATA) private data: EditBlogLabelDialogInputModule, private dialogRef: MatDialogRef<EditBlogLabelDialogComponent>,
              private fb: FormBuilder, private blogTypeService: BlogTypeService) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      blogTypeId: [null, Validators.required],
      tagName: [null, Validators.required]
    });
    this.findAllBlogType();
    this.dialogInputData = JSON.parse(JSON.stringify(this.data));
    if (this.dialogInputData.tag) {
      this.formGroup.patchValue(this.dialogInputData.tag);
    }
  }

  /**
   * 查找所有的博客分类
   */
  findAllBlogType() {
    this.blogTypeService.findAllBlogType().subscribe(data => {
      if (data.code === CodeEnum.SUCCESS) {
        this.blogTypeList = data.data;
      }
    })
  }

  /**
   * 点击确定
   */
  okPress() {
    this.dialogRef.close(this.formGroup.value);
  }

  /**
   * 点击取消
   */
  cancel() {
    this.dialogRef.close();
  }


}
