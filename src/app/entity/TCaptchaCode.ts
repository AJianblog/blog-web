/**
 * 腾讯防水墙验证成功后的实体
 */
export class TCaptchaCode {
  /**
   * 场景Id
   */
  appid: string;
  /**
   * 自定义透传参数
   */
  bizState: any;
  /**
   * 随机串
   */
  randstr: string;
  /**
   * 验证结果，0-验证成功，2-用户主动关闭验证码
   */
  ret: number;
  /**
   * 验证成功的票据，当且仅当ret=0时ticket有值
   */
  ticket: string;
}
