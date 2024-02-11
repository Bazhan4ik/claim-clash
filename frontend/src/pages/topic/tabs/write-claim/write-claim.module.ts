import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WriteClaimRoutingModule } from './write-claim-routing.module';
import { WriteClaimComponent } from './write-claim.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WriteClaimComponent
  ],
  imports: [
    CommonModule,
    WriteClaimRoutingModule,
    ReactiveFormsModule,
  ]
})
export class WriteClaimModule { }
