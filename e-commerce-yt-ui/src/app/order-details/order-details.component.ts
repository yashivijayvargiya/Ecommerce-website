import { Component, OnInit } from '@angular/core';
import { MyOrderDetails } from '../_model/order.module';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  displayedColumns = ["Name", "Address", "Contact No.", "Amount", "Status", "Action"];
  myOrderDetails: MyOrderDetails[] = [];
  status : string ='All'

  constructor(
    private productSerivce: ProductService
  ) { }

  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin(this.status);
  }

  getAllOrderDetailsForAdmin(statusParameter: string) {
    this.productSerivce.getAllOrderDetailsForAdmin(statusParameter).subscribe(
      (response: MyOrderDetails[]) => {
        console.log(response);
        this.myOrderDetails = response;
      }, (error) => {
        console.log(error);
      }
    );
  }

  markAsDelivered(orderId) {
    this.productSerivce.markAsDelivered(orderId).subscribe(
      (resp) => {
        this.getAllOrderDetailsForAdmin(this.status);
        console.log(resp);
      }, (err) => {
        console.log(err)
      });
  }
}