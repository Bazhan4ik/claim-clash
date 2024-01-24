import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopicPage } from './topic.page';

const routes: Routes = [
  {
    path: "",
    component: TopicPage,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "facts"
      },
      {
        path: "facts",
        loadChildren: () => import("./tabs/facts/facts.module").then(m => m.FactsModule)
      },
      {
        path: "claims",
        loadChildren: () => import("./tabs/claims/claims.module").then(m => m.ClaimsModule)
      },
      {
        path: "discussions",
        loadChildren: () => import("./tabs/discussions/discussions.module").then(m => m.DiscussionsModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicRoutingModule { }
