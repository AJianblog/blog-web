/**
 * 保存在浏览器中的数据,集中写在这个类中,不要到处写,便于管理
 * @author 何志坚
 */
export class StorageMessage {
  /**
   * 保存token信息
   * @param token 设置token信息
   */
  static setToken(token: string) {
    localStorage.setItem('token', token);
  }

  /**
   * 获取token信息
   */
  static getToken(): string {
    return localStorage.getItem('token');
  }

  /**
   * 保存用户信息
   * @param userInfo 用户信息
   */
  static setUserInfo(userInfo: string) {
    localStorage.setItem('user', userInfo);
  }

  /**
   * 获取用户信息
   */
  static getUserInfo(): string {
    return localStorage.getItem('user');
  }

  /**
   * 清除保存数据
   */
  static clear() {
    localStorage.clear();
  }
}
