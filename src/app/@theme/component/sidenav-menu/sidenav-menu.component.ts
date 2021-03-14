import {Component, Input, OnInit} from '@angular/core';
import {SidenavMenu} from "../../../model/sidenav-menu";

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss']
})
export class SidenavMenuComponent implements OnInit {

  @Input()
  sidenavMenu: SidenavMenu[];

  constructor() {
  }

  ngOnInit() {
  }
}
