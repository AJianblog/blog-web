import {Component, OnInit, ViewChild} from '@angular/core';
import {DrawerContainerComponent} from '../../@theme/component/drawer-container/drawer-container.component';
import {SidenavService} from '../../@core/interface/sidenav.service';
import {SidenavMenu} from '../../model/sidenav-menu';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  @ViewChild('drawerContainerComponent')
  drawerContainerComponent: DrawerContainerComponent;

  sidenavMenus: SidenavMenu[];

  menus: { title: string; router: string}[] = [
    {
      title: '书籍管理',
      router: '/admin/book'
    },
    {
      title: '博客管理',
      router: ''
    },
    {
      title: '标签管理',
      router: ''
    }
  ]

  constructor(private sidenavService: SidenavService) {
  }

  ngOnInit() {
    this.getSidenav();
  }

  menuClick() {
    this.drawerContainerComponent.toggle();
  }

  getSidenav() {
    this.sidenavService.getSidenav().subscribe(data => {
      this.sidenavMenus = data;
    })
  }

}
