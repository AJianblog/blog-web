import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidenav-menu-item',
  templateUrl: './sidenav-menu-item.component.html',
  styleUrls: ['./sidenav-menu-item.component.scss']
})
export class SidenavMenuItemComponent implements OnInit {

  @Input()
  menuList: { router: string, account: number, title: string }[];

  constructor() {
  }

  ngOnInit() {
  }
}
