export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: [{ url: string }];
  type?: string;
  brand?: string;
  Stock: number;
}
