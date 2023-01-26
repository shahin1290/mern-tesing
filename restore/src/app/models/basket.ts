export interface BasketItem {
  productId: string;
  name: string;
  price: number;
  pictureUrl: string;
  quantity: number;
}

export interface Basket {
  _id: string;
  buyerId: string;
  items: BasketItem[];
}
