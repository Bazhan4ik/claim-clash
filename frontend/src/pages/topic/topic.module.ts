import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicRoutingModule } from './topic-routing.module';
import { TopicPage } from './topic.page';


@NgModule({
  declarations: [
    TopicPage
  ],
  imports: [
    CommonModule,
    TopicRoutingModule
  ]
})
export class TopicModule { }
