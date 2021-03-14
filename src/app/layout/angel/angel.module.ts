import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AngelRoutingModule} from './angel-routing.module';
import {IndexComponent} from './index/index.component';
import {ThemeModule} from "../../@theme/theme.module";


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    AngelRoutingModule,
    ThemeModule
  ]
})
export class AngelModule {
}
