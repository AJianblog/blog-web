import {Injectable} from "@angular/core";
import {TagService} from "../interface/tag-service";
import {Tag} from "../../model/tag";
import {Observable} from "rxjs";
import {ReturnModel} from "../../entity/return-model";
import {HttpClient} from "@angular/common/http";
import {ProxyPrefix} from "../../entity/proxy-prefix";
import {TagBlogTypeGroup} from "../../entity/group/TagBlogTypeGroup";
import {PageResult} from "../../entity/page-result";
import {TagWordCloud} from "../../entity/chart/tag-word-cloud";

@Injectable({
  providedIn: "root"
})
export class TagImplService extends TagService {

  private url: string = `${ProxyPrefix.api}/tag`;

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * 添加标签
   *
   * @param tag 标签信息
   */
  addTag(tag: Tag): Observable<ReturnModel<any>> {
    return this.http.post<ReturnModel<any>>(`${this.url}/addTag`, tag);
  }

  deleteTag(id: number) {
  }

  /**
   * 查找所有的标签
   *
   * @param pageIndex 页数
   * @param pageSize 页条数
   * @return 标签对象列表
   */
  findAllTag(pageIndex: number, pageSize: number): Observable<ReturnModel<PageResult<TagBlogTypeGroup>>> {
    return this.http.get<ReturnModel<PageResult<TagBlogTypeGroup>>>(`${this.url}/findAllTag?pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  /**
   * 查找博客分类所对应的标签
   *
   * @param blogTypeId 博客分类id
   * @return 标签对象列表
   */
  findTagByBlogTypeId(blogTypeId: number): Observable<ReturnModel<Tag[]>> {
    return this.http.get<ReturnModel<Tag[]>>(`${this.url}/findTagByBlogTypeId/${blogTypeId}`);
  }


  /**
   * 通过用户的昵称查找每种标签的数量
   * @param nickName 用户的昵称
   */
  tagOfBlogAccount(nickName: string): Observable<ReturnModel<TagWordCloud[]>> {
    return this.http.get<ReturnModel<TagWordCloud[]>>(`${this.url}/tagOfBlogAccount/${nickName}`);
  }

  /**
   * 更新标签的内容
   * @param tag 标签信息
   */
  updateTag(tag: Tag): Observable<ReturnModel<Tag>> {
    return this.http.put<ReturnModel<Tag>>(`${this.url}/updateTag`, tag);
  }

}

