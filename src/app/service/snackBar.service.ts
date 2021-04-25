import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) {
  }

  /**
   * 成功的提示信息
   * @param message 信息
   * @param duration 显示时长
   */
  success(message: string, duration: number = 2000) {
    this.snackBar.open(message, '关闭', {duration});
  }

  /**
   * 失败的提示信息
   * @param message 信息
   * @param duration 显示时长
   */
  failure(message: string, duration: number = 2000) {
    this.snackBar.open(message, '关闭', {duration});
  }
}
