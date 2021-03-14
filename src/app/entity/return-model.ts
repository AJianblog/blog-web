export class ReturnModel<T> {
  /**
   * 返回的状态码
   */
  code: number;
  /**
   * 返回的消息
   */
  message: string;
  /**
   * 返回的数据
   */
  data: T;
}
