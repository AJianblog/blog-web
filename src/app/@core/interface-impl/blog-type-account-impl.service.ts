import {Injectable} from '@angular/core';
import {BlogTypeAccountService} from "../interface/blog-type-account.service";
import {Observable} from "rxjs";
import {ReturnModel} from "../../entity/return-model";
import {BlogTypeAccount} from "../../model/blog-type-account";
import {ProxyPrefix} from "../../entity/proxy-prefix";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BlogTypeAccountImplService extends BlogTypeAccountService {

  private url: string = `${ProxyPrefix.api}/blogTypeAccount`;

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * 查找博客分类数量
   * @param nickName 用户的id
   * @return 博客数量列表
   */
  findUserBlogTypeAccount(nickName: string): Observable<ReturnModel<BlogTypeAccount[]>> {
    return this.http.get<ReturnModel<BlogTypeAccount[]>>(`${this.url}/findBlogTypeAccount/${nickName}`);
  }
}
