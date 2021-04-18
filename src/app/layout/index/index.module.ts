import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IndexRoutingModule} from './index-routing.module';
import {IndexComponent} from './index.component';
import {IndexContentComponent} from './index-content/index-content.component';
import {MaterialModule} from '../../@material/material.module';
import {ThemeModule} from '../../@theme/theme.module';
import {NgxEchartsModule} from 'ngx-echarts';
import { IndexSidenavMenuComponent } from './index-sidenav-menu/index-sidenav-menu.component';
import { IndexBlogTypeAccountComponent } from './index-blog-type-account/index-blog-type-account.component';
import { IndexBlogTagAccountComponent } from './index-blog-tag-account/index-blog-tag-account.component';


@NgModule({
  declarations: [
    IndexComponent,
    IndexContentComponent,
    IndexSidenavMenuComponent,
    IndexBlogTypeAccountComponent,
    IndexBlogTagAccountComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    MaterialModule,
    ThemeModule,
    NgxEchartsModule
  ]
})
export class IndexModule {
}
