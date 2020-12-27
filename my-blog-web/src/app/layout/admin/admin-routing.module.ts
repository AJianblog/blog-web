import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from "./admin.component";


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'article',
        loadChildren: () => import('./article/article.module').then(mod => mod.ArticleModule)
      },
      {
        path: 'type',
        loadChildren: () => import('./blog-type/blog-type.module').then(mod => mod.BlogTypeModule)
      },
      {
        path: 'label',
        loadChildren: () => import('./blog-label/blog-label.module').then(mod => mod.BlogLabelModule)
      },
      {
        path: 'book',
        loadChildren: () => import('./book/book.module').then(mod => mod.BookModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
