import { IProduct } from "./i-product";
import { IUser } from "./i-user";

export interface IOrder {
  id: number;
  quantity: number;
  isCompleted: boolean;
  user? : IUser
  product: IProduct;
}
