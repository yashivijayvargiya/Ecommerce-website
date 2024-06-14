import { FileHandle } from "./file-handle.module";

export interface Product{
    productId:number ,
    productName: string,
    productDescription: string,
    productDiscountedPrice: number,
    productActualPrice: number,
    productImages: FileHandle[]
}