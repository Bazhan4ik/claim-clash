import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { RegisterPage } from './register/register.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CodePage } from './code/code.page';


@NgModule({
  declarations: [
    RegisterPage,
    CodePage,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
