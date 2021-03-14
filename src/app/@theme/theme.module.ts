import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmDialogComponent} from './component/confirm-dialog/confirm-dialog.component';
import {DialogLayoutComponent} from "./component/dialog-layout/dialog.layout.component";
import {MaterialModule} from "../@material/material.module";
import {HeaderComponent} from './component/header/header.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {AdminSubContentComponent} from './component/admin-sub-content/admin-sub-content.component';
import {DrawerContainerComponent} from './component/drawer-container/drawer-container.component';
import {SidenavUserInfoComponent} from "./component/sidenav-user-info/sidenav-user-info.component";
import {SidenavMenuItemComponent} from "./component/sidenav-menu-item/sidenav-menu-item.component";
import {SidenavMenuComponent} from "./component/sidenav-menu/sidenav-menu.component";
import {DrawerContentHeaderComponent} from "./component/drawer-container/drawer-content-header.component";
import {DrawerComponent} from "./component/drawer-container/drawer.component";
import { FooterComponent } from './component/footer/footer.component';


@NgModule({
  declarations: [
    DialogLayoutComponent,
    ConfirmDialogComponent,
    HeaderComponent,
    AdminSubContentComponent,
    DrawerContainerComponent,
    SidenavUserInfoComponent,
    SidenavMenuItemComponent,
    SidenavMenuComponent,
    DrawerContentHeaderComponent,
    DrawerComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule
  ],
    exports: [
        CommonModule,
        DialogLayoutComponent,
        ConfirmDialogComponent,
        HeaderComponent,
        AdminSubContentComponent,
        DrawerContainerComponent,
        SidenavUserInfoComponent,
        SidenavMenuComponent,
        DrawerContentHeaderComponent,
        DrawerComponent,
        FooterComponent,
    ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class ThemeModule {

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: []
    }
  }
}
