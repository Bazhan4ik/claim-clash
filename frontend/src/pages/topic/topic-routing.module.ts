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
        redirectTo: "articles"
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
        path: "claims/write",
        loadChildren: () => import("./tabs/write-claim/write-claim.module").then(m => m.WriteClaimModule),
      },
      {
        path: "claims/:claim-id",
        loadChildren: () => import("./tabs/claim/claim.module").then(m => m.ClaimModule),
      },
      {
        path: "articles",
        loadChildren: () => import("./tabs/articles/articles.module").then(m => m.ArticlesModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicRoutingModule { }
