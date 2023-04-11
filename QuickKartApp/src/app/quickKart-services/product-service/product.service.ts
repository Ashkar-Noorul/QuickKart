import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../../quickKart-interfaces/category';
import { IProduct } from '../../quickKart-interfaces/product';
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { IPurchaseDetails } from '../../quickKart-interfaces/purchase';
import { IUser } from '../../quickKart-interfaces/user';
import { ICart } from '../../quickKart-interfaces/cart';
import { ICartProduct } from '../../quickKart-interfaces/cartProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: IProduct[];
  categories: ICategory[];

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    let tempVar = this.http.get<IProduct[]>('http://localhost:11990/api/product/getproducts').pipe(catchError(this.errorHandler));
    return tempVar;
  }

  getProductCategories(): Observable<ICategory[]> {
    let tempVar = this.http.get<ICategory[]>('http://localhost:11990/api/Category/GetCategories').pipe(catchError(this.errorHandler));
    return tempVar;
  }

  getPurchaseDetails(emailId: string): Observable<IPurchaseDetails[]>{
    let param = "?emailId=" + emailId;
    let tempVar = this.http.get<IPurchaseDetails[]>('http://localhost:11990/api/Purchase/GetPurchaseDetailsByEmailId' + param).pipe(catchError(this.errorHandler));
    return tempVar;

  }
  validateCredentials(id: string, password: string): Observable<string> {
    var userObj: IUser = { emailId: id, userPassword: password, gender: null, roleId: null, dateOfBirth: null, address: null };
    let tempVar = this.http.post<string>('http://localhost:11990/api/User/ValidateUserCredentials', userObj).pipe(catchError(this.errorHandler));
    return tempVar;
  }

  addProductToCart(productId: string, emailId: string): Observable<boolean> {
    var cartObj: ICart;
    cartObj = { productId: productId, emailId: emailId, quantity: 1 };
    return this.http.post<boolean>('http://localhost:11990/api/user/AddProductToCart', cartObj
    ).pipe(catchError(this.errorHandler));
  }

  getCartProducts(emailId: string): Observable<ICartProduct[]> {
    let param = "?emailId=" + emailId;
    return this.http.get<ICartProduct[]>('http://localhost:11990/api/user/GetCartProducts' + param)
      .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
