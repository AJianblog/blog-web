/**
 * 博客实体
 *
 * @author hzj
 */
export class Blog {
  /**
   * 博客id
   */
  id: number;
  /**
   * 博客标题
   */
  title: string;
  /**
   * 博客内容
   */
  markdown: string;
  /**
   * 用户id
   */
  userId: number;
  /**
   * 博客分类id
   */
  blogTypeId: number;
  /**
   * 博客标签id
   */
  tagId: number;

  /**
   * 更新时间
   */
  updateDate: Date;

  /**
   * 描述信息
   */
  description: string;
  /**
   * 图片地址
   */
  imageUrl: string;
}
