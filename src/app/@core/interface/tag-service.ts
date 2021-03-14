import {Tag} from '../../model/tag';
import {Observable} from 'rxjs';
import {ReturnModel} from '../../entity/return-model';
import {TagBlogTypeGroup} from '../../entity/group/TagBlogTypeGroup';
import {PageResult} from '../../entity/page-result';
import {TagWordCloud} from '../../entity/chart/tag-word-cloud';

export abstract class TagService {
  /**
   * 添加标签
   *
   * @param tag 标签信息
   */
  abstract addTag(tag: Tag): Observable<ReturnModel<any>>;

  /**
   * 删除标签
   *
   * @param id 标签id
   */
  abstract deleteTag(id: number);

  /**
   * 查找所有的标签
   *
   * @param pageIndex 页数
   * @param pageSize 页条数
   * @return 标签对象列表
   */
  abstract findAllTag(pageIndex: number, pageSize: number): Observable<ReturnModel<PageResult<TagBlogTypeGroup>>>;

  /**
   * 查找博客分类所对应的标签
   *
   * @param blogTypeId 博客分类id
   * @return 标签对象列表
   */
  abstract findTagByBlogTypeId(blogTypeId: number): Observable<ReturnModel<Tag[]>>;

  /**
   * 通过用户的昵称查找每种标签的数量
   * @param nickName 用户的昵称
   */
  abstract tagOfBlogAccount(nickName: string): Observable<ReturnModel<TagWordCloud[]>>;

  /**
   * 更新标签信息
   *
   * @param tag 标签信息
   */
  abstract updateTag(tag: Tag): Observable<ReturnModel<Tag>>;
}
