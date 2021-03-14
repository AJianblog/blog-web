import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BlogTypeRoutingModule} from './blog-type-routing.module';
import {BlogTypeComponent} from './blog-type.component';
import {MaterialModule} from "../../../@material/material.module";
import {EditBlogTypeDialogComponent} from './edit-blog-type-dialog/edit-blog-type-dialog.component';
import {ThemeModule} from "../../../@theme/theme.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    BlogTypeComponent,
    EditBlogTypeDialogComponent
  ],
  imports: [
    CommonModule,
    BlogTypeRoutingModule,
    MaterialModule,
    ThemeModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    EditBlogTypeDialogComponent
  ]
})
export class BlogTypeModule {
}
