import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./../pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: "topic/:topic-id",
    loadChildren: () => import("./../pages/topic/topic.module").then(m => m.TopicModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
