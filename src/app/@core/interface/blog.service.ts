import {Blog} from '../../model/blog';
import {Observable} from 'rxjs';
import {PageResult} from '../../entity/page-result';
import {ReturnModel} from '../../entity/return-model';
import {BlogAndTypeAndTagGroup} from '../../entity/group/BlogAndTypeAndTagGroup';

export abstract class BlogService {
  /**
   * 添加博客
   * @param blog 博客
   */
  abstract addBlog(blog: Blog): Observable<ReturnModel<Blog>>;

  /**
   * 删除博客
   * @param id 博客id
   */
  abstract deleteBlog(id: number): Observable<ReturnModel<any>>;

  /**
   * 博客搜索
   * @param nickName 用户的昵称
   * @param pageIndex 页数
   * @param pageSize 页条数
   * @param type 博客分类
   * @param search 搜索内容
   * @param tagName 标签名称
   */
  abstract searchUserBlog(nickName: string, pageIndex: number, pageSize: number, type?: string, search?: string, tagName?: string): Observable<ReturnModel<PageResult<BlogAndTypeAndTagGroup>>>;

  /**
   * 通过用户的id和博客的标题查询博客
   * @param userId 用户的id
   * @param title 博客标题
   */
  abstract findBlogByUserIdAndTitle(userId: number, title: string): Observable<ReturnModel<Blog>>;

  /**
   * 通过博客的id查找博客的信息
   * @param id 博客id
   * @param isEncode 是否转义
   */
  abstract findBlogById(id: number, isEncode?: boolean): Observable<ReturnModel<Blog>>;

  /**
   * 更新博客的信息
   * @param blog 博客信息
   */
  abstract updateBlog(blog: Blog): Observable<ReturnModel<Blog>>;
}
