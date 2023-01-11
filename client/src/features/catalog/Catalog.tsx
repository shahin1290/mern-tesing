import axios from "axios";
import { useState, useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { getProducts } from "./../../app/redux/products/productSlice";

export default function Catalog() {
 

  // if (loading) return <LoadingComponent message="Loading products..." />;

  return (
    <>
      <ProductList />
    </>
  );
}
