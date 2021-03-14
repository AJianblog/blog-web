import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TagService} from "../../../@core/interface/tag-service";
import {CodeEnum} from "../../../entity/code-enum";
import {TagWordCloud} from "../../../entity/chart/tag-word-cloud";

@Component({
  selector: 'app-index-blog-tag-account',
  templateUrl: './index-blog-tag-account.component.html',
  styleUrls: ['./index-blog-tag-account.component.scss']
})
export class IndexBlogTagAccountComponent implements OnInit {

  menuList: TagWordCloud[];

  /**
   * 用户id
   */
  @Input()
  nickName: string;

  @Output()
  tagPress: EventEmitter<TagWordCloud> = new EventEmitter<TagWordCloud>();

  constructor(private tagService: TagService) {
  }

  ngOnInit() {
    this.tagOfBlogAccount();
  }

  /**
   * 查询标签数量
   */
  tagOfBlogAccount() {
    this.tagService.tagOfBlogAccount(this.nickName).subscribe(data => {
      if (data.code === CodeEnum.SUCCESS) {
        this.menuList = data.data;
      }
    })
  }

}
