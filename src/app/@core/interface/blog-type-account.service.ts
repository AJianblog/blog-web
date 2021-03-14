import {Observable} from 'rxjs';
import {ReturnModel} from '../../entity/return-model';
import {BlogTypeAccount} from '../../model/blog-type-account';

export abstract class BlogTypeAccountService {

  /**
   * 查找博客分类数量
   * @param nickName 用户的id
   * @return 博客数量列表
   */
  abstract findUserBlogTypeAccount(nickName: string): Observable<ReturnModel<BlogTypeAccount[]>>;
}
