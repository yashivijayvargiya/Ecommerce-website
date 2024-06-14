import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './_model/product.module';
import { ProductService } from './_services/product.service';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product[]>{

  constructor(
    private productService: ProductService,
    private imageProcessingSerivce: ImageProcessingService
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] | Observable<Product[]> | Promise<Product[]> {
    const id = route.paramMap.get("id");
    const isSingleProductCheckout = route.paramMap.get("isSingleProductCheckout");
    return this.productService.getProductDetails(isSingleProductCheckout,id)
    .pipe(
      map(
        (x: Product[], i) => x.map((product: Product) => this.imageProcessingSerivce.createImages(product))
      )
    );
  }
}