import { OrderQuantity } from "./order-quantity.module";

export interface OrderDetails{
    fullName : string;
    fullAddress : string;
    contactNumber : string;
    alternateContactNumber : string;
    orderProductQuantity:OrderQuantity[]
}
