import {Observable} from 'rxjs';
import {ReturnModel} from '../../entity/return-model';
import {User} from '../../model/user';

export abstract class UserService {
  /**
   * 用户登录
   */
  abstract login(login: { account: string, password: string }): Observable<ReturnModel<User>>;

  /**
   * 用户注册
   * @param register 注册信息
   */
  abstract register(register: { account: string, password: string }): Observable<ReturnModel<User>>;

  /**
   * 通过用户的昵称查询用户的信息
   * @param nickName 用户昵称
   */
  abstract findUserByNickname(nickName: string): Observable<ReturnModel<User>>;

  /**
   * 发送邮箱验证码
   * @param email 邮箱地址
   */
  abstract sendRegisterCode(email: string): Observable<ReturnModel<any>>;

  /**
   * 腾讯防水墙验证
   * @param ticket 验证码客户端验证回调的票据
   * @param rand 验证码客户端验证回调的随机串
   */
  abstract verifyTicket(ticket: string, rand: string): Observable<ReturnModel<any>>;

}
