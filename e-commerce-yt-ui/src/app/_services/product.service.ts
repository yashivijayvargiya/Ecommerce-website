import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetails } from '../_model/order-details.module';
import { MyOrderDetails } from '../_model/order.module';
import { Product } from '../_model/product.module';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpclient: HttpClient) { }

  public createTransaction(amount){
    return this.httpclient.get("http://localhost:9090/createTransaction/"+amount);
  }

  public getMyOrder(): Observable<MyOrderDetails[]>{
    return this.httpclient.get<MyOrderDetails[]>("http://localhost:9090/getOrderDetails");
  }
  public addProduct(product: FormData){
    return this.httpclient.post<Product>("http://localhost:9090/addNewProduct",product);
  }

  public getAllProducts(pageNumber,searchKeyword:string=""){
    return this.httpclient.get<Product[]>("http://localhost:9090/getAllProducts?pageNumber="+pageNumber+"&searchKey="+searchKeyword);
  }

  public getProductDetailsById(productId){
    return this.httpclient.get<Product>("http://localhost:9090/getProductDetailsById/"+productId);
  }

  public deleteProduct(productId: number){
    return this.httpclient.delete("http://localhost:9090/deleteProductbyId/"+productId);
  }

  public getProductDetails(isSingleProductCheckout,productId){
    return this.httpclient.get<Product[]>("http://localhost:9090/getProductDetails/"+isSingleProductCheckout+"/"+productId);
  }

  public placeOrder(orderDetails: OrderDetails, isCartCheckout){
    return this.httpclient.post("http://localhost:9090/placeOrder/"+isCartCheckout,orderDetails);
  }

  public addToCart(productId){
    return this.httpclient.get("http://localhost:9090/addToCart/"+productId);
  }

  public getCartDetails(){
    return this.httpclient.get("http://localhost:9090/getCartDetails");
  }

  public deleteCartItem(cartId){
    return this.httpclient.delete("http://localhost:9090/deleteCartItem/"+cartId);
  }

  public getAllOrderDetailsForAdmin(status: string): Observable<MyOrderDetails[]>{
    return this.httpclient.get<MyOrderDetails[]>("http://localhost:9090/getAllOrderDetails/"+status);
  }

  public markAsDelivered(orderId){
    return this.httpclient.get("http://localhost:9090/markOrderAsDelivered/"+orderId);
  }


}