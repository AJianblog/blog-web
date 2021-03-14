import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BlogTypeComponent} from "./blog-type.component";


const routes: Routes = [
  {path: '', component: BlogTypeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogTypeRoutingModule {
}
