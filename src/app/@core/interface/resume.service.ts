import {Observable} from "rxjs";

export abstract class ResumeService {
  abstract getSkillLevel(): Observable<string[]>;

  abstract getMyBlogDescription(): Observable<string[]>;
}
