import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WriteClaimRoutingModule } from './write-claim-routing.module';
import { WriteClaimPage } from './write-claim.page';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WriteClaimPage
  ],
  imports: [
    CommonModule,
    WriteClaimRoutingModule,
    ReactiveFormsModule,
  ]
})
export class WriteClaimModule { }
