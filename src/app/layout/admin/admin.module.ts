import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {IndexHeaderComponent} from './index-header/index-header.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AdminComponent} from './admin.component';
import {MaterialModule} from "../../@material/material.module";
import {ThemeModule} from "../../@theme/theme.module";


@NgModule({
  declarations: [
    IndexHeaderComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    ThemeModule
  ]
})
export class AdminModule {
}
