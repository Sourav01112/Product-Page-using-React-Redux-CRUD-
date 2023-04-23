import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/productReducer/action";
import { ProductCard } from "./ProductCard";
import { useLocation, useSearchParams } from "react-router-dom";

export const ProductList = ({ page, setPage }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoading } = useSelector((store) => store.productReducer);
  const location = useLocation();
  const totalCount = useSelector((store) => store.productReducer.totalCount);
  const totalPages = Math.ceil(totalCount / 5);
  const [isNextSelected, setIsNextSelected] = useState(false);
  const [prevSelected, setPrevSelected] = useState(false);

  let paramsObj = {
    params: {
      category: searchParams.getAll("category"),
      //getting all the categories as paramObj
      rating: searchParams.getAll("rating"),
      _page: Number(page),
      _sort: searchParams.get("order") && "price",
      _order: searchParams.get("order"),
      _q: searchParams.get("q"),
    },
  };
  // console.log(paramsObj);
  /*  this paramObj is here in order to pass the pass params from sidebar to ProductList because both of them are different component, so can be accessed with the help of searchParams~getAll method
   */

  /* _SORT & _ORDER, In sort it is telling if the order is present either 'asc' or 'desc' then only sort if not then  do not pass the sort*/

  useEffect(() => {
    dispatch(getProducts(paramsObj));
  }, [location.search]);

  /*  location.search will make sure it renders the data according to location.search string (it will have the searchParams ) */
  // console.log(isLoading);

  const addition = () => {
    setPage(page + 1);
    setIsNextSelected(true);
    setPrevSelected(false);
  };
  const subtraction = () => {
    setPage(page - 1);
    setPrevSelected(true);
    setIsNextSelected(false);
  };

  if (isLoading) {
    return <h1>.....loading</h1>;
  } else {
    return (
      <div>
        {products.length > 0 &&
          products.map((ele) => {
            return <ProductCard key={ele.id} {...ele} />;
          })}

        {/* Pagination */}
        <div
          style={{
            textAlign: "center",
            margin: "auto",
            width: "170px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginTop: "50px",
            marginBottom: "20px",
            // border: "1px solid gray",
          }}
        >
          <button
            style={{
              borderRadius: "2px",
              padding: "7px",
              fontSize: "large",
              boxShadow: "rgba(17, 17, 26, 0.1) 0px 1px 0px",
              backgroundColor: prevSelected ? "#3470e4" : "white",
              color: prevSelected ? "white" : "black",
              opacity: page === 1 ? 0.3 : 1,
            }}
            onClick={subtraction}
            disabled={page === 1}
          >
            Prev
          </button>

          <button
            style={{
              width: "30px",
              outline: "none",
              border: "none",
              color: "black",
              fontWeight: 700,
              backgroundColor: "white",
              padding: "7px",
              fontSize: "large",
            }}
            disabled
          >
            {page}
          </button>

          <button
            style={{
              borderRadius: "2px",
              padding: "7px",
              fontSize: "large",
              boxShadow: "rgba(17, 17, 26, 0.1) 0px 1px 0px",
              backgroundColor: isNextSelected ? "#3470e4" : "white",
              color: isNextSelected ? "white" : "black",
              opacity: page === totalPages ? 0.3 : 1,
            }}
            onClick={addition}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
};
