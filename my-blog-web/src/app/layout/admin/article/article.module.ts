import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ArticleRoutingModule} from './article-routing.module';
import {ArticleComponent} from "./article.component";
import {ArticleInfoDialogComponent} from "./article-info-dialog/article-info-dialog.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MyArticleComponent} from './my-article/my-article.component';
import {MaterialModule} from "../../../@material/material.module";
import {ThemeModule} from "../../../@theme/theme.module";
import {ZMarkdownModule} from "@hzjanger/z-markdown";


@NgModule({
  declarations: [
    ArticleComponent,
    ArticleInfoDialogComponent,
    MyArticleComponent
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    MaterialModule,
    ThemeModule,
    ReactiveFormsModule,
    ZMarkdownModule,
  ],
  entryComponents: [
    ArticleInfoDialogComponent
  ]
})
export class ArticleModule {
}
