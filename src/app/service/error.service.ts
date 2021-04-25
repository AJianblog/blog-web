import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {SnackBarService} from './snackBar.service';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private snackBarService: SnackBarService) {
  }

  /**
   * 错误处理器
   * @param error 错误信息
   */
  handleError(error: HttpErrorResponse) {
    this.snackBarService.failure(error.error.message);
    return throwError(error.error.message);
  }
}
