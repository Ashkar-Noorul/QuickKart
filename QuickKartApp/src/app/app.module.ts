import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import {HttpClientModule} from '@angular/common/http';
import { CommonLayoutComponent } from './common-layout/common-layout.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { ViewPurchasesComponent } from './view-purchases/view-purchases.component';
import { HomeComponent } from './home/home.component'
import { routing } from '../app.routing';
import { ViewCartComponent } from './view-cart/view-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewProductsComponent,
    LoginComponent,
    RegisterComponent,
    FeedbackFormComponent,
    CommonLayoutComponent,
    CustomerLayoutComponent,
    ViewPurchasesComponent,
    HomeComponent,
    ViewCartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule, HttpClientModule,
    routing

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
