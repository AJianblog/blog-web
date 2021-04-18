import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./layout/user/user.module').then(mod => mod.UserModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./layout/admin/admin.module').then(mod => mod.AdminModule)
  },
  // {
  //   path: 'blog/:nickName',
  //   loadChildren: () => import('./layout/angel/angel.module').then(mod => mod.AngelModule)
  // },
  // {
  //   path: 'article',
  //   loadChildren: () => import('./layout/article/article.module').then(mod => mod.ArticleModule)
  // },
  {
    path: 'blog',
    loadChildren: () => import('./layout/index/index.module').then(module => module.IndexModule)
  },
  {
    path: 'resume',
    loadChildren: () => import('./layout/resume/resume.module').then(mod => mod.ResumeModule)
  },
  {
    path: 'index/:nickName',
    loadChildren: () => import('./layout/angel/angel.module').then(mod => mod.AngelModule)

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
