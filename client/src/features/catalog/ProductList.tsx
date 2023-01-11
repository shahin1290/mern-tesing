import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/redux/configureStore";
import { getProducts } from "../../app/redux/products/productSlice";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <Grid container spacing={4}>
      {products &&
        products.map((product) => (
          <Grid item xs={3} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
    </Grid>
  );
}
