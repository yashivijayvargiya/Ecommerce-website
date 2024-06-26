import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from './_model/file-handle.module';
import { Product } from './_model/product.module';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(
    private sanitizer:DomSanitizer
  ) { }

  public createImages(product: Product){
    const productImages: any[]= product.productImages;
    const productImagesToFileHandle: FileHandle[]=[];
    for(let i=0;i<productImages.length;i++){
      const imageFileData = productImages[i];
      const imageBlob = this.dataURItoBlob(imageFileData.picByte,imageFileData.type);
      const imageFile = new File([imageBlob],imageFileData.name,{type:imageFileData.type})
      const finalFileHandle: FileHandle={
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };
      productImagesToFileHandle.push(finalFileHandle);
    }
    product.productImages = productImagesToFileHandle;
    return product;

  }
  public dataURItoBlob(picBytes,imageType){
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);
    for (let i = 0;i<intArray.length;i++){
      intArray[i]=byteString.charCodeAt(i);
    }

    const blob = new Blob([intArray],{type:imageType});
    return blob;
  }

  
}
