import {Blog} from '../../model/blog';
import {BlogType} from '../../model/blog-type';
import {Tag} from '../../model/tag';

export class BlogAndTypeAndTagGroup {

  /**
   * 博客信息
   */
  blog: Blog;

  /**
   * 博客分类信息
   */
  blogType: BlogType;

  /**
   * 标签信息
   */
  tag: Tag;
}
