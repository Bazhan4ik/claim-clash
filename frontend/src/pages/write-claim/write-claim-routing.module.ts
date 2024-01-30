import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WriteClaimPage } from './write-claim.page';

const routes: Routes = [
  {
    path: "",
    component: WriteClaimPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WriteClaimRoutingModule { }
