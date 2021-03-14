import {Injectable} from '@angular/core';
import {BlogService} from "../interface/blog.service";
import {Blog} from "../../model/blog";
import {ProxyPrefix} from "../../entity/proxy-prefix";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReturnModel} from "../../entity/return-model";
import {PageResult} from "../../entity/page-result";
import {BlogAndTypeAndTagGroup} from "../../entity/group/BlogAndTypeAndTagGroup";

@Injectable({
  providedIn: 'root'
})
export class BlogImplService extends BlogService {

  private url: string = `${ProxyPrefix.api}/blog`;

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * 添加博客
   * @param blog 博客信息
   */
  addBlog(blog: Blog): Observable<ReturnModel<Blog>> {
    return this.http.post<ReturnModel<Blog>>(`${this.url}/addBlog`, blog);
  }

  /**
   * 删除博客
   * @param id 博客id
   */
  deleteBlog(id: number): Observable<ReturnModel<any>> {
    return this.http.delete<ReturnModel<any>>(`${this.url}/deleteBlog/${id}`)
  }

  /**
   * 用户博客搜索
   * @param nickName 用户id
   * @param pageIndex 页数
   * @param pageSize 页条数
   * @param type 博客分类
   * @param search 搜索内容
   * @param tagName 标签名称
   */
  searchUserBlog(nickName: string, pageIndex: number = 1, pageSize: number = 10, type: string = null, search: string = null, tagName: string = null): Observable<ReturnModel<PageResult<BlogAndTypeAndTagGroup>>> {
    return this.http.get<ReturnModel<PageResult<BlogAndTypeAndTagGroup>>>(`${this.url}/searchUserBlog/${nickName}?pageIndex=${pageIndex}&pageSize=${pageSize}&blogType=${type}&searchValue=${search}&tagName=${tagName}`);
  }

  /**
   * 通过博客的id查找博客的信息
   * @param id 博客id
   * @param isEncode 是否转义,默认转义
   */
  findBlogById(id: number, isEncode: boolean = true): Observable<ReturnModel<Blog>> {
    return this.http.get<ReturnModel<Blog>>(`${this.url}/findBlogById/${id}`);
  }

  /**
   * 通过用户的id和博客的标题查询博客
   * @param userId 用户的id
   * @param title 博客标题
   */
  findBlogByUserIdAndTitle(userId: number, title: string): Observable<ReturnModel<Blog>> {
    return this.http.get<ReturnModel<Blog>>(`${this.url}/findBlogByUserIdAndTitle/${userId}/${title}`);
  }

  /**
   * 更新博客的信息
   * @param blog 博客信息
   */
  updateBlog(blog: Blog): Observable<ReturnModel<Blog>> {
    return this.http.put<ReturnModel<Blog>>(`${this.url}/updateBlog`, blog);
  }
}
