import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BlogTypeAccount} from "../../../model/blog-type-account";
import {TagWordCloud} from "../../../entity/chart/tag-word-cloud";

@Component({
  selector: 'app-index-sidenav-menu',
  templateUrl: './index-sidenav-menu.component.html',
  styleUrls: ['./index-sidenav-menu.component.scss']
})
export class IndexSidenavMenuComponent implements OnInit {

  /**
   * 用户的昵称
   */
  @Input()
  nickName: string;

  @Output()
  tagPress: EventEmitter<TagWordCloud> = new EventEmitter<TagWordCloud>();

  @Output()
  blogTypePress: EventEmitter<BlogTypeAccount> = new EventEmitter<BlogTypeAccount>();

  @Output()
  homePress: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
  }

}
