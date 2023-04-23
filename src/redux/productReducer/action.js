import { Navigate } from "react-router-dom";
import {
  PRODUCT_REQUEST,
  PRODUCT_FAILURE,
  POST_PRODUCT_SUCCESS,
  GET_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  PATCH_PRODUCT_SUCCESS,
} from "./actionTypes";
import axios from "axios";

export const addProduct = (newProduct) => (dispatch) => {
  dispatch({ type: PRODUCT_REQUEST });
  axios
    .post(`http://localhost:8080/products`, newProduct)
    .then((res) => {
      // console.log(res);
      dispatch({ type: POST_PRODUCT_SUCCESS });
    })
    .catch((err) => {
      console.log("error");
      dispatch({ type: PRODUCT_FAILURE });
    });
};

export const getProducts = (paramsObj) => (dispatch) => {
  dispatch({ type: PRODUCT_REQUEST });
  axios
    .get(`http://localhost:8080/products?_limit=5`, paramsObj)
    .then((res) => {
      // console.log(res);
      dispatch({
        type: GET_PRODUCT_SUCCESS,
        payload: {
          data: res.data,
          totalCount: parseInt(res.headers["x-total-count"]),
        },
      });
    })
    .catch((err) => {
      dispatch({ type: PRODUCT_FAILURE });
    });
};

/* DELETE has 2 ways: 
1. Delete with dispatch and then again getting the Data (for that return the axios and in handleDelete use .then method again, but that would require paramObj in order to see everything in sorted manner, suppose you had applied price filter low to high, after deleting it will be removed, so need to pass paramObj again in ProductCard, earlier it was only in ProductList)
*/

// // 1st. Method
// export const deleteProduct = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: PRODUCT_REQUEST });
//     return axios.delete(`http://localhost:8080/products/${id}`).then((res) => {
//       // console.log(res);
//       dispatch({ type: DELETE_PRODUCT_SUCCESS });
//     });
//   } catch (error) {
//     dispatch({ type: PRODUCT_FAILURE });
//   }
// };

// 2nd Method
// 2.First getting all the data whose id are matching after clicking Delete button and storing it in different empty array and then deleting the required element present in the array with return axios

export const deleteProduct = (id) => (dispatch) => {
  dispatch({ type: PRODUCT_REQUEST });

  let payload = [];
  axios.get(`http://localhost:8080/products`).then((res) => {
    payload = res.data.filter((ele) => ele.id !== id);
  });

  return axios
    .delete(`http://localhost:8080/products/${id}`)
    .then((res) => {
      console.log("resolved DATA after delete", res);
      dispatch({ type: DELETE_PRODUCT_SUCCESS, payload });
    })
    .catch((err) => {
      dispatch({ type: PRODUCT_FAILURE });
    });
};

//PATCH UPDATE
/* 
Again 2 methods: 
1.payload one
*/

export const ediProduct = (id, priceData) => (dispatch) => {
  dispatch({ type: PRODUCT_REQUEST });
  axios
    .patch(`http://localhost:8080/products/${id}`, priceData)
    .then((res) => {
      dispatch({ type: PATCH_PRODUCT_SUCCESS });
      // navigate(location.state);
    })
    .catch((err) => {
      dispatch({ type: PRODUCT_FAILURE });
    });
};
