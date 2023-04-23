import React from "react";
import styled from "styled-components";
import { deleteProduct, getProducts } from "../redux/productReducer/action";
import { useDispatch } from "react-redux";
import { Link, useLocation, useSearchParams } from "react-router-dom";

export const ProductCard = ({
  id,
  title,
  category,
  price,
  image,
  rating,
  page,
}) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  // console.log(location);

  let paramsObj = {
    params: {
      category: searchParams.getAll("category"),
      rating: searchParams.getAll("rating"),
      _page: page,
      _sort: searchParams.get("order") && "price",
      _order: searchParams.get("order"),
    },
  };

  // 1. Delete METHOD

  // const handleCardDelete = () => {
  //   dispatch(deleteProduct(id)).then(() => {
  //     dispatch(getProducts(paramsObj));
  //   });
  // };

  // 2. Delete METHOD
  
  const handleCardDelete = () => {
    dispatch(deleteProduct(id))
    .then(() => {
      dispatch(getProducts());
    });
  };


  return (
    <DIV>
      <div className="flex">
        <div>
          <img src={image} alt={title} />
        </div>
        <div>
          <h3>{title}</h3>
          <p>Category:{category}</p>
          <p>Price: {price}</p>
          <p>Rating:{rating}</p>
        </div>
      </div>
      <div className="btnFlex">
        <Link to={`/edit/${id}`}>
          <button className="btn">EDIT</button>
        </Link>
        <button onClick={handleCardDelete} className="btnDelete">
          DELETE
        </button>
      </div>
    </DIV>
  );
};

const DIV = styled.div`
  /* border: 1px solid gray; */
  margin: auto;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  background-color: white;

  img {
    width: 150px;
  }
  .btn {
    border: none;
    padding: 5px 10px;
    color: white;
    border-radius: 5px;
    background-color: #3470e4;
    margin: 0px 50px 0px 0px;
    font-size: 12px;
  }
  .btnDelete {
    border: none;
    padding: 5px 10px;
    color: white;
    border-radius: 5px;
    background-color: red;
    margin: 0px 50px 0px 0px;
    font-size: 12px;
  }

  .flex {
    display: flex;
    justify-content: space-around;
    /* border: 1px solid gray; */
  }
  .btnFlex {
    display: flex;
    justify-content: end;
  }
`;
