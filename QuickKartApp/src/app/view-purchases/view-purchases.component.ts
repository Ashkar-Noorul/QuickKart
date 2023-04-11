import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPurchaseDetails } from '../quickKart-interfaces/purchase';
import { ProductService } from '../quickKart-services/product-service/product.service';

@Component({
  selector: 'app-view-purchases',
  templateUrl: './view-purchases.component.html',
  styleUrls: ['./view-purchases.component.css']
})
export class ViewPurchasesComponent implements OnInit {
  purchaseDetails: IPurchaseDetails[];
  showError: boolean;
  errorMsg: string;
  emailId: string;

  constructor(private _productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.emailId = sessionStorage.getItem('email');

    if (this.emailId == null) {

    }
    this._productService.getPurchaseDetails(this.emailId).subscribe(
      responsePurchaseDetailsData => {
        this.purchaseDetails = responsePurchaseDetailsData;
        if (this.purchaseDetails.length == 0) {
          this.showError = true;
          this.errorMsg = "You don't have any Purchases yet";
        }
      },
      responsePurchaseDetailsError => {
        this.purchaseDetails = null;
        this.errorMsg = responsePurchaseDetailsError;
        console.log(this.errorMsg);
        if (this.purchaseDetails.length == 0) {
          this.showError = true;
          this.errorMsg = "No records found";
        }
      },
      ()=> console.log("GetPurchaseDetails method executed successfully")
    );
  }
  addRating(purchase: IPurchaseDetails) {
    this.router.navigate(['/addRating', purchase.productId, purchase.productName]);
  }



}
