import {Observable} from 'rxjs';
import {ReturnModel} from '../../entity/return-model';
import {BlogType} from '../../model/blog-type';

export abstract class BlogTypeService {

  /**
   * 新增博客分类
   * @param typeName 博客分类
   */
  abstract addBlogType(typeName: string): Observable<ReturnModel<any>>;

  /**
   * 删除博客分类
   * @param blogTypeId 博客分类的id
   */
  abstract deleteBlogType(blogTypeId: number): Observable<ReturnModel<any>>;

  /**
   * 查找所有的博客分类
   */
  abstract findAllBlogType(): Observable<ReturnModel<BlogType[]>>;

  /**
   * 更新博客分类的信息
   * @param blogType 博客分类
   */
  abstract updateBlogType(blogType: BlogType): Observable<ReturnModel<BlogType>>;
}
