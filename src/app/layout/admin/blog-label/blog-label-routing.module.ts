import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BlogLabelComponent} from "./blog-label.component";


const routes: Routes = [
  {path: '', component: BlogLabelComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogLabelRoutingModule {
}
