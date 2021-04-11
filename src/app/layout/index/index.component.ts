import {Component, OnInit, ViewChild} from '@angular/core';
import {DrawerContainerComponent} from '../../@theme/component/drawer-container/drawer-container.component';
import {SidenavService} from '../../@core/interface/sidenav.service';
import {SidenavMenu} from '../../model/sidenav-menu';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TagWordCloud} from '../../entity/chart/tag-word-cloud';
import {BlogType} from '../../model/blog-type';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  /**
   * 侧边栏
   */
  sidenavMenu: SidenavMenu[];

  /**
   * 用户的昵称
   */
  nickName: string = null;

  /**
   * 标签名称
   */
  tagName: string = null;

  /**
   * 博客分类国名称
   */
  typeName: string = null;


  @ViewChild('drawerComponent')
  drawerComponent: DrawerContainerComponent;

  constructor(private sidenavService: SidenavService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((param: Params) => {
      this.nickName = param.get('nickName');
    });
    this.getSidenav();
  }

  /**
   * 菜单栏点击事件
   */
  menuClick() {
    this.drawerComponent.toggle();
  }

  /**
   * 获取侧边栏数据
   */
  getSidenav() {
    this.sidenavService.getUserSidenav().subscribe(data => {
      this.sidenavMenu = data;
    });
  }

  /**
   * 标签点击事件
   * @param tag 标签
   */
  tagClick(tag: TagWordCloud) {
    this.drawerComponent.toggle();
    this.tagName = tag.name;
    this.typeName = null;
    this.routerJump();
  }

  /**
   * 点击博客分类
   * @param blogType 博客分类
   */
  blogTypeClick(blogType: BlogType) {
    this.drawerComponent.toggle();
    this.typeName = blogType.typeName;
    this.tagName = null;
    this.routerJump();
  }

  /**
   * 点击home
   */
  homeClick() {
    this.drawerComponent.toggle();
    this.typeName = null;
    this.tagName = null;
    this.routerJump();
  }

  /**
   * 路由跳转
   */
  routerJump() {
    const queryParams: any = {};
    if (this.typeName !== null) {
      queryParams.type = this.typeName;
    }

    if (this.tagName !== null) {
      queryParams.tagName = this.tagName;
    }
    this.router.navigate(['./'], {
      queryParams,
      relativeTo: this.route
    });
  }

}
