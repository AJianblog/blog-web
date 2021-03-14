import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export class DialogLayoutInputModule {
  /**
   * 弹窗标题名称
   */
  dialogTitle: string;
  /**
   * 是否显示确认按钮
   */
  isShowOk?: boolean;
}

@Component({
  selector: 'dialog-layout',
  templateUrl: './dialog.layout.component.html',
  styleUrls: ['./dialog.layout.component.scss']
})
export class DialogLayoutComponent implements OnInit {

  /**
   * 弹窗的标题
   */
  @Input()
  dialogTitle: string;

  /**
   * 是否显示确认按钮
   */
  @Input()
  isShowOk: boolean = true;

  /**
   * 点击取消事件
   */
  @Output()
  cancelPress: EventEmitter<void> = new EventEmitter<void>();

  /**
   * 点击确定事件
   */
  @Output()
  okPress: EventEmitter<void> = new EventEmitter<void>();

  constructor() {

  }


  ngOnInit() {

  }

  /**
   * 点击取消
   */
  cancel() {
    this.cancelPress.emit();
  }

  /**
   * 点击确定
   */
  handleOk() {
    this.okPress.emit();
  }

}
