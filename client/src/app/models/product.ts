export interface Product {
  id: number;
  title: string;
  body: string;
  price?: number;
  pictureUrl?: string;
  type?: string;
  brand?: string;
  quantityInStock?: number;
}
