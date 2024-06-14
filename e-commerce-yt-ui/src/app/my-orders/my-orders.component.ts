import { Component, OnInit } from '@angular/core';
import { MyOrderDetails } from '../_model/order.module';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  displayedColumns = ["Name","Address","Contact No.","Amount","Status"];
  myOrderDetails: MyOrderDetails[] = [];

  constructor(
    private productSerivce: ProductService
  ) { }

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails(){
    this.productSerivce.getMyOrder().subscribe(
      (response: MyOrderDetails[]) => {
        console.log(response);
        this.myOrderDetails = response;
      }, (error) => {
        console.log(error);
      }
    );
  }


}
