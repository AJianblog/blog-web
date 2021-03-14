/**
 * 用户实体
 * @author 何志坚
 */
export interface User {
  /**
   * 用户id
   */
  userId: number;

  /**
   * 账户名称
   */
  account: string;

  /**
   * 密码
   */
  password: string;

  /**
   * 昵称
   */
  nickName: string;

}
