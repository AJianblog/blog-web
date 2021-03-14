import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export class ConfirmDialogInputModule {
  /**
   * 弹窗的标题
   */
  title: string;
  /**
   * 弹窗的内容
   */
  content: string;


  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogInputModule, private dialogRef: MatDialogRef<ConfirmDialogComponent>) {
  }

  ngOnInit() {
  }

  okPress() {
    this.dialogRef.close(true);
  }

  cancelPress() {
    this.dialogRef.close();
  }
}
