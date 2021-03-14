import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BlogLabelRoutingModule} from './blog-label-routing.module';
import {BlogLabelComponent} from './blog-label.component';
import {MaterialModule} from "../../../@material/material.module";
import {EditBlogLabelDialogComponent} from "./edit-blog-label-dialog/edit-blog-label-dialog.component";
import {ThemeModule} from "../../../@theme/theme.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    BlogLabelComponent,
    EditBlogLabelDialogComponent
  ],
  imports: [
    CommonModule,
    BlogLabelRoutingModule,
    MaterialModule,
    ThemeModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    EditBlogLabelDialogComponent
  ]
})
export class BlogLabelModule {
}
