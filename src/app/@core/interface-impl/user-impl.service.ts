import {Injectable} from '@angular/core';
import {UserService} from "../interface/user-service";
import {HttpClient} from "@angular/common/http";
import {ProxyPrefix} from "../../entity/proxy-prefix";
import {Observable} from "rxjs";
import {ReturnModel} from "../../entity/return-model";
import {User} from "../../model/user";
import {catchError} from "rxjs/operators";
import {ErrorService} from "../../service/error.service";

@Injectable({
  providedIn: 'root'
})
export class UserImplService extends UserService {

  private url: string = `${ProxyPrefix.api}/user`;

  constructor(private http: HttpClient, private errorService: ErrorService) {
    super();
  }

  /**
   * 用户登录
   * @param login 登录信息
   */
  login(login: { account: string, password: string }): Observable<ReturnModel<User>> {
    return this.http.post<ReturnModel<User>>(`${this.url}/login`, login).pipe(catchError(err => this.errorService.handleError(err)));
  }

  /**
   * 用户注册
   * @param register 注册信息
   */
  register(register: { account: string; password: string }): Observable<ReturnModel<User>> {
    return this.http.post<ReturnModel<User>>(`${this.url}/register`, register).pipe(catchError(err => this.errorService.handleError(err)));
  }

  /**
   * 通过用户的昵称查询用户的信息
   * @param nickName 用户昵称
   */
  findUserByNickname(nickName: string): Observable<ReturnModel<User>> {
    return this.http.get<ReturnModel<User>>(`${this.url}/findUserByNickname/${nickName}`);
  }

  /**
   * 发送邮箱验证码
   * @param email 邮箱地址
   */
  sendRegisterCode(email: string): Observable<ReturnModel<any>> {
    return this.http.get<ReturnModel<any>>(`${this.url}/sendEmail/${email}`).pipe(catchError(err => this.errorService.handleError(err)));
  }

  /**
   * 腾讯防水墙验证
   * @param ticket 验证码客户端验证回调的票据
   * @param rand 验证码客户端验证回调的随机串
   */
  verifyTicket(ticket: string, rand: string): Observable<ReturnModel<any>> {
    return this.http.get<ReturnModel<any>>(`${this.url}/verifyTicket/${ticket}/${rand}`);
  }
}
