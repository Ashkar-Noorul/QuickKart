import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../quickKart-services/product-service/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  status: string;
  errorMsg: string;
  msg: string;
  showDiv: boolean = false;


  constructor(private _productService: ProductService,private router: Router) { }

  submitLoginForm(form: NgForm) {
    this._productService.validateCredentials(form.value.email, form.value.password).subscribe(
      responseLoginStatus => {
        this.status = responseLoginStatus;
        this.showDiv = true;
        if (this.status.toLowerCase() != "invalid credentials") {
          sessionStorage.setItem('email', form.value.email);
          sessionStorage.setItem('userRole', this.status);
          this.router.navigate(['/home']);

        }
        else {
          this.msg = this.status + ". Try again with valid Credentials";
        }
      },
      responseLoginError => {
        this.errorMsg = responseLoginError;
        console.log(this.errorMsg);
      },
      () => console.log("SubmitLoginForm method executed successfully")
    );

  }

  ngOnInit(): void {
  }

}
