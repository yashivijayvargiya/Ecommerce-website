import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Product } from '../_model/product.module';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageNumber: number = 0;
  productDetails = [];
  showLoadButton = false;
  constructor(
    private productSerive: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllProduct(); 
  }

  
  searchByKeyword(searchKeyword){
    console.log(searchKeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProduct(searchKeyword);

  }
  public getAllProduct(searchKey: string=""){
    this.productSerive.getAllProducts(this.pageNumber, searchKey)
    .pipe(
      map((x: Product[],i) =>x.map((product: Product) => this.imageProcessingService.createImages(product)))
    )
    .subscribe(
      (resp: Product[]) => {
        if(resp.length==12){
          this.showLoadButton = true;
        }
        else{
          this.showLoadButton = false;
        }
        resp.forEach(
          p => this.productDetails.push(p));
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  showProductDetails(productId){
    this.router.navigate(['/productViewDetails',{productId: productId}]);


  }
  loadMoreProduct(){
    this.pageNumber = this.pageNumber+1;
    this.getAllProduct();
  }

}

