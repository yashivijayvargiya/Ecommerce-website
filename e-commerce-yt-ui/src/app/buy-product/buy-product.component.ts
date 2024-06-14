import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { OrderDetails } from '../_model/order-details.module';
import { Product } from '../_model/product.module';
import { ProductService } from '../_services/product.service';
// import * as Razorpay from 'razorpay';
declare var Razorpay: any;
@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {

  productDetails: Product[] = [];
  isSingleProductCheckout: string = '';
  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantity: []
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout");
    this.productDetails.forEach(
      x => this.orderDetails.orderProductQuantity.push(
        { productId: x.productId, quantity: 1 }
      )
    );
    console.log(this.productDetails);
    console.log(this.orderDetails);
  }

  placeOrder(orderForm: NgForm) {
    this.productService.placeOrder(this.orderDetails,this.isSingleProductCheckout).subscribe(
      (resp) => {
        console.log(resp);
        orderForm.reset();
        this.router.navigate(["/orderConfirm"]);
      },
      (err) => {
        console.log(err);
      }

    );

  }

  getQuantityForProduct(productId) {
    const filteredProduct = this.orderDetails.orderProductQuantity.filter(
      (productQuantity) => productQuantity.productId === productId
    );
    return filteredProduct[0].quantity;

  }
  getCalculatedTotal(productId, productDiscountedPrice) {
    const filteredProduct = this.orderDetails.orderProductQuantity.filter(
      (productQuantity) => productQuantity.productId === productId
    );
    return productDiscountedPrice * filteredProduct[0].quantity;

  }

  onQuantityChanged(q, productId) {
    this.orderDetails.orderProductQuantity.filter(
      (orderProduct) => orderProduct.productId === productId
    )[0].quantity = q;
  }

  getCalculatedGrandTotal() {
    let grandTotal = 0;
    this.orderDetails.orderProductQuantity.forEach(
      (productQuantity) => {
        const Price = this.productDetails.filter(product => product.productId === productQuantity.productId)[0].productDiscountedPrice;
        grandTotal = grandTotal + Price * productQuantity.quantity;
      }
    );
    return grandTotal;

  }

  createTransactionAndPlaceOrder(orderForm: NgForm){
    let amount = this.getCalculatedGrandTotal();
    this.productService.createTransaction(amount).subscribe(
      (resp) => {
        console.log(resp);
        this.OpenTransactionModel(resp);
      }, (err) =>{
        console.log(err);
      }
    )
     
  }

  OpenTransactionModel(response:any){
    var options = {
      order_id: response.orderId,
      key: response.key,
      amount: response.amount,
      currency: response.currency,
      name:'Yashi',
      description: 'Payment of online shopping',
      image: 'https://m.media-amazon.com/images/I/714WqJReMOL._AC_UF1000,1000_QL80_.jpg' ,
      handler : (response :any) =>{
        if(response!=null && response.razorpay_payment_id != null){
          this.processResponse(response);
        } else{
          alert("Payment Failed..")
        }
        this.processResponse(response);
      },
      prefill :{
        name: 'LPY',
        email: 'LPY@GMAIL.COM',
        contact: '9112156324'
      }, notes :{
        address: 'Online Shopping'
      }, 
      theme:{
        color:'#F37255'
      }
    };
    var razorPayObject = new Razorpay(options);
    razorPayObject.open();
  }

  processResponse(resp:any){
    console.log(resp);
  }



}