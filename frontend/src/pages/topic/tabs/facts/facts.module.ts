import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactsRoutingModule } from './facts-routing.module';
import { FactsComponent } from './facts.component';


@NgModule({
  declarations: [
    FactsComponent
  ],
  imports: [
    CommonModule,
    FactsRoutingModule
  ]
})
export class FactsModule { }
