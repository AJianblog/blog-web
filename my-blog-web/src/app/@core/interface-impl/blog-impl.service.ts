import {Injectable} from '@angular/core';
import {BlogService} from "../interface/blog.service";
import {Blog} from "../../model/blog";
import {ProxyPrefix} from "../../entity/proxyPrefix";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {ReturnModel} from "../../entity/return-model";
import {PageResult} from "../../entity/page-result";
import {concatMap} from "rxjs/operators";
import {HtmlEscape} from "../../utils/html-escape";

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
   * 分页查询用户最新的文章
   * @param userId 用户id
   * @param current 页数
   * @param pageSize 页条数
   */
  findNewestBlog(userId: number, current: number = 1, pageSize: number = 10): Observable<ReturnModel<PageResult<Blog>>> {
    return this.http.get<ReturnModel<PageResult<Blog>>>(`${this.url}/findNewestBlog/${userId}?current=${current}&pageSize=${pageSize}`);
  }

  /**
   * 通过博客的id查找博客的信息
   * @param id 博客id
   * @param isEncode 是否转义,默认转义
   */
  findBlogById(id: number, isEncode: boolean = true): Observable<ReturnModel<Blog>> {
    return this.http.get<ReturnModel<Blog>>(`${this.url}/findBlogById/${id}`).pipe(
      concatMap(val => {
        if (isEncode) {
          val.data.markdown = HtmlEscape.htmlEncode(val.data.markdown);
        }
        return of(val)
      })
    );
  }

  /**
   * 通过用户的id和博客的标题查询博客
   * @param userId 用户的id
   * @param title 博客标题
   */
  findBlogByUserIdAndTitle(userId: number, title: string): Observable<ReturnModel<Blog>> {
    return this.http.get<ReturnModel<Blog>>(`${this.url}/findBlogByUserIdAndTitle/${userId}/${title}`);
  }
}
