import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogLayoutInputModule} from "../../../../@theme/component/dialog-layout/dialog.layout.component";

export class EditBlogTypeDialogInputModule extends DialogLayoutInputModule {
  /**
   * 博客分类名称
   */
  typeName?: string;
}

@Component({
  selector: 'app-edit-blog-type-dialog',
  templateUrl: './edit-blog-type-dialog.component.html',
  styleUrls: ['./edit-blog-type-dialog.component.scss']
})
export class EditBlogTypeDialogComponent implements OnInit {

  formGroup: FormGroup;

  dialogData: EditBlogTypeDialogInputModule;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: EditBlogTypeDialogInputModule, private dialogRef: MatDialogRef<EditBlogTypeDialogComponent>) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      typeName: [null, Validators.required]
    });
    this.dialogData = JSON.parse(JSON.stringify(this.data));
    if (this.dialogData.typeName) {
      this.formGroup.patchValue({
        typeName: this.dialogData.typeName
      })
    }
  }

  /**
   * 点击确定
   */
  okPress() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }

  /**
   * 点击取消
   */
  cancelPress() {
    this.dialogRef.close();
  }

}
