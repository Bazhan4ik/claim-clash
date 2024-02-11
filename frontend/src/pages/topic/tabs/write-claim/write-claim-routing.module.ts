import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WriteClaimComponent } from './write-claim.component';

const routes: Routes = [
  {
    path: "",
    component: WriteClaimComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WriteClaimRoutingModule { }
