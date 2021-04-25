export abstract class AuthorService {
  /**
   * 登陆后需要重定向到路由
   */
  redirectUrl: string;
  /**
   * 退出登录
   */
  abstract quit();

  /**
   * 检测是否为登录状态, true为登录, false为不登录
   */
  abstract isLogin();
}
