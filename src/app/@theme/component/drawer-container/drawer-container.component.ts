import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";

@Component({
  selector: 'app-drawer-container',
  templateUrl: './drawer-container.component.html',
  styleUrls: ['./drawer-container.component.scss']
})
export class DrawerContainerComponent implements OnInit {

  @ViewChild("drawer", {static: false})
  drawer: MatDrawer;

  @Input()
  model: string = 'over';

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * 切换此抽屉,如果是开启那么变为关闭,如果是关闭,那么变为开启
   */
  toggle() {
    this.drawer.toggle().then(r => r);
  }

}
