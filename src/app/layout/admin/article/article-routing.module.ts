import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ArticleComponent} from "./article.component";
import {MyArticleComponent} from "./my-article/my-article.component";


const routes: Routes = [
  {path: '', component: ArticleComponent},
  {path: 'my', component: MyArticleComponent},
  {path: 'edit/:blogId', component: ArticleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule {
}
