import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/features/productSlice";
import CardProduct from "../components/CardProduct";
import Spinner from "../components/Spinner";
import { useLocation } from "react-router-dom";

const Home = () => {
  const { products, loading, currentPage } = useSelector(
    (state) => ({
      ...state.product,
    })
  );
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    dispatch(getProducts(currentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <MDBRow className="mt-5">
        {products.length === 0 && location.pathname === "/" && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No products Found
          </MDBTypography>
        )}

        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
              {products &&
                products.map((item) => (
                  <CardProduct key={item._id} {...item} />
                ))}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Home;
