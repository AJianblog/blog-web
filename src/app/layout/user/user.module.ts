import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from './register/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {TCaptchaDirective} from "../../directive/tcaptcha.directive";
import {TestComponentComponent} from './test-component/test-component.component';
import {MaterialModule} from "../../@material/material.module";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    TCaptchaDirective,
    TestComponentComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class UserModule {
}
