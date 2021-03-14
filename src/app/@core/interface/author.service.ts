export abstract class AuthorService {
  /**
   * 退出登录
   */
  abstract quit();

  /**
   * 检测是否为登录状态, true为登录, false为不登录
   */
  abstract isLogin();
}
