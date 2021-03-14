export class PageResult<T> {
  /**
   * 分页的总页数
   */
  total: number;
  /**
   * 分页结果
   */
  rows: T[];
}
