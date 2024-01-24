import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'trending',
    loadChildren: () => import('./../pages/trending/trending.module').then(m => m.TrendingModule)
  },
  {
    path: "topic/:topic-id",
    loadChildren: () => import("./../pages/topic/topic.module").then(m => m.TopicModule)
  },
  {
    path: '',
    redirectTo: 'trending',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
