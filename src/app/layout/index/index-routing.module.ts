import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from "./index.component";
import {IndexContentComponent} from "./index-content/index-content.component";


const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {path: '', component: IndexContentComponent},
      {
        path: 'article/:blogId',
        loadChildren: () => import('../article/article.module').then(mod => mod.ArticleModule)
      }

      // {
      //   path: 'detail/:blogId',
      //   loadChildren: () => import('../article/article.module').then(mod => mod.ArticleModule)
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule {
}
