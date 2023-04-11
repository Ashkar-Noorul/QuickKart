import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './app/home/home.component';
import { LoginComponent } from './app/login/login.component';
import { RegisterComponent } from './app/register/register.component';
import { ViewProductsComponent } from './app/view-products/view-products.component';
import { AuthGuardService } from './app/auth-guard.service';
import { ViewPurchasesComponent } from './app/view-purchases/view-purchases.component';
import { ViewCartComponent } from './app/view-cart/view-cart.component';

const routes: Routes= [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: RegisterComponent },
  { path: 'viewProducts', component: ViewProductsComponent, canActivate: [AuthGuardService] },
  { path: 'viewCart', component: ViewCartComponent },
  { path: 'viewPurchases', component: ViewPurchasesComponent },
  
  { path: '**', component: HomeComponent }
];

export const routing: ModuleWithProviders =
  RouterModule.forRoot(routes);
