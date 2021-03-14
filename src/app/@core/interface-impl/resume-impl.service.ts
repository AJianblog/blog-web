import {ResumeService} from "../interface/resume.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ResumeImplService extends ResumeService {

  private url: string = './assets/mock';

  constructor(private http: HttpClient) {
    super();
  }


  /**
   * 技术水平
   */
  getSkillLevel(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/SkillLevel.json`);
  }

  getMyBlogDescription(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/MyBlogDescription.json`);
  }

}
