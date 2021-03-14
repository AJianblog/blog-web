import {BlogType} from '../../model/blog-type';
import {Tag} from '../../model/tag';

export class TagBlogTypeGroup extends Tag {
  /**
   * 标签所对应的博客分类
   */
  blogType: BlogType;
}
