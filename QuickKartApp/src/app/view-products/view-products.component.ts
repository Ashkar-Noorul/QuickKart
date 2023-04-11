import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from '../quickKart-interfaces/category';
import { IProduct } from '../quickKart-interfaces/product';
import { ProductService } from '../quickKart-services/product-service/product.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  products: IProduct[];
  categories: ICategory[];
  filteredProducts: IProduct[]
  showMsgDiv: boolean = false;
  imageSrc: string;
  searchByCategoryId: string = "0";
  searchByProductName: string;
  errMsg: string;
  userRole: string;
  userName: string;
  customerLayout: boolean = false;
  commonLayout: boolean = false;

  constructor(private _productService: ProductService, private router: Router) {
    this.userRole = sessionStorage.getItem('userRole');
    this.userName = sessionStorage.getItem('email');
    if (this.userRole == "Customer") {
      this.customerLayout = true;
    }
    else {
      this.commonLayout = true;
    }
  }

  ngOnInit() {
    this.getProducts();
    this.getProductCategories();

    if (this.products == null) {
      this.showMsgDiv = true;
    }
    this.filteredProducts = this.products;
    this.imageSrc = "assets/quickKart-images/add-item.jpg";
  }

  getProducts() {
    this._productService.getProducts().subscribe(
      responseProductData => {
        this.products = responseProductData;
        this.filteredProducts = responseProductData;
        this.showMsgDiv = false;

      },
      responseProductError => {
        this.products = null;
        this.errMsg = responseProductError;
        console.log(this.errMsg);
      },
      ()=>console.log("GetProducts method executted successfully")
    );
  }

  getProductCategories() {
    this._productService.getProductCategories().subscribe(
      responseCategoryData => 
        this.categories = responseCategoryData,
      responseCategoryError => {
        this.categories = null;
        this.errMsg = responseCategoryError;
        console.log(this.errMsg);
      },
      () => console.log("GetProductCategories method executted successfully")
      
    );
  }


  searchProductByCategory(categoryId: string) {

    if (this.searchByProductName != null || this.searchByProductName == "") {
      this.filteredProducts = this.products.filter(prod => prod.productName.toLowerCase().indexOf(this.searchByProductName.toLowerCase()) >= 0);
    }
    else {
      this.filteredProducts = this.products;
    }
    this.searchByCategoryId = categoryId;
    if (this.searchByCategoryId== "0") {
      this.filteredProducts = this.products;
    }
    else {
      this.filteredProducts = this.filteredProducts.filter(prod => prod.categoryId.toString() == categoryId);
    }
  }

  

  searchProduct(productName: string) {
    if (this.searchByCategoryId == "0") {
      this.filteredProducts = this.products;
    }
    else {
      this.filteredProducts = this.products.filter(prod => prod.categoryId.toString() == this.searchByCategoryId);
    }
    if (productName != null || productName == "") {
      this.searchByProductName = productName;
      this.filteredProducts = this.filteredProducts.filter(prod => prod.productName.toLowerCase().indexOf(productName.toLowerCase()) >= 0);
    }
    if (this.filteredProducts.length == 0) {
      this.showMsgDiv = true;

    }
    else {
      this.showMsgDiv = false;
    }
  }

  addToCart(prod: IProduct) {
    if (this.userRole == null) {
      this.router.navigate(['/login']);
    }
    else {
      this._productService.addProductToCart(prod.productId, this.userName)
        .subscribe(
          responseProductData => {
            if (responseProductData) {
              alert("Product added successfully")
            }
          },
          responseProductError => {
            this.errMsg = responseProductError;
            console.log(this.errMsg);
            alert("Sorry, something went wrong. Please try again after sometime.")

          },
          ()=>console.log("AddToCart method executed successfully")
        )
    }
  }
}
