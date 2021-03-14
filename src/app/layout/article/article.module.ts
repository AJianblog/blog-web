import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ArticleRoutingModule} from './article-routing.module';
import {ArticleComponent} from './article.component';
import {ThemeModule} from "../../@theme/theme.module";
import {ZMarkdownModule} from "@hzjanger/z-markdown";


@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    ThemeModule,
    ZMarkdownModule
  ]
})
export class ArticleModule {
}
