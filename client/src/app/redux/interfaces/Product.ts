export interface Product {
  title: string;
  price?: number;
  body?: string;
}

export interface ProductDocument extends Product {
  _id: string;
  __v: number;
}
