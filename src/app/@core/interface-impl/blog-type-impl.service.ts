import {Injectable} from '@angular/core';
import {BlogTypeService} from "../interface/blog-type.service";
import {ProxyPrefix} from "../../entity/proxy-prefix";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReturnModel} from "../../entity/return-model";
import {BlogType} from "../../model/blog-type";

@Injectable({
  providedIn: 'root'
})
export class BlogTypeImplService extends BlogTypeService {

  private url: string = `${ProxyPrefix.api}/blogType`;

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * 新增博客分类
   * @param typeName 博客分类
   */
  addBlogType(typeName: string): Observable<ReturnModel<any>> {
    return this.http.post<ReturnModel<any>>(`${this.url}/addBlogType`, {typeName});
  }

  /**
   * 删除博客分类
   * @param blogTypeId 博客分类的id
   */
  deleteBlogType(blogTypeId: number): Observable<ReturnModel<any>> {
    return this.http.delete<ReturnModel<any>>(`${this.url}/deleteBlogType/${blogTypeId}`)
  }

  /**
   * 查找所有的博客分类
   */
  findAllBlogType(): Observable<ReturnModel<BlogType[]>> {
    return this.http.get<ReturnModel<BlogType[]>>(`${this.url}/findAllBlogType`);
  }

  updateBlogType(blogType: BlogType): Observable<ReturnModel<BlogType>> {
    return this.http.put<ReturnModel<BlogType>>(`${this.url}/updateBlogType`, blogType);
  }
}
