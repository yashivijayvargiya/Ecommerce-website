import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartDetails: any[] = [];
  displayedColumns: string[] = ['Name', 'Description', 'Price', 'Discounted Price','Action'];

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails() {
    this.productService.getCartDetails().subscribe(
      (response:any[  ]) => {
        console.log(response);
        this.cartDetails = response;
      },
      (error) =>{
        console.log(error);
      });
  }
  checkout(){
    this.router.navigate(['/buyProduct',
    {
      isSingleProductCheckout: false,
      id: 0
    }
  ]);
    // this.productService.getProductDetails(false,0).subscribe(
    //   (resp) => {
    //     console.log(resp)
    //   }, (err) =>{
    //     console.log(err);
    //   });
    

  }

  deleteItem(cartId){
    this.productService.deleteCartItem(cartId).subscribe(
      (resp) => {
        this.getCartDetails();