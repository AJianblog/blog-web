import {Component, OnInit} from '@angular/core';
import {ResumeService} from "../../@core/interface/resume.service";

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  skillLevel: string[] = [];

  blogDescriptions: string[] = [];

  constructor(private resumeService: ResumeService) {
  }

  ngOnInit() {
    this.getSkillLevel();
    this.getMyBlogDescription();
  }

  /**
   * 得到技术水平
   */
  getSkillLevel() {
    this.resumeService.getSkillLevel().subscribe(data => {
      this.skillLevel = data;
    })
  }

  getMyBlogDescription() {
    this.resumeService.getMyBlogDescription().subscribe(data => {
      this.blogDescriptions = data;
    })
  }

}
