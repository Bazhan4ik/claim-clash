import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimsRoutingModule } from './claims-routing.module';
import { ClaimsComponent } from './claims.component';


@NgModule({
  declarations: [
    ClaimsComponent,
  ],
  imports: [
    CommonModule,
    ClaimsRoutingModule
  ]
})
export class ClaimsModule { }
