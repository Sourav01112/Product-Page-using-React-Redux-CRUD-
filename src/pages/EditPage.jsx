import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { ediProduct, getProducts } from "../redux/productReducer/action";

export const EditPage = () => {
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const { id } = useParams();
  //   console.log(id);

  const product = useSelector((store) => store.productReducer.products);

  useEffect(() => {
    const data = product?.find((ele) => ele.id === +id);
    setPrice(data.price);
  }, []);

  const handleInputChange = (e) => {
    setPrice(e.target.value);
  };

  const handlePricePatchUPDATE = () => {
    const priceData = { price };
    alert("Price Updated");
    dispatch(ediProduct(id, priceData)).then(() => navigate("/"));
  };

  return (
    <div>
      <h1>{id}</h1>
      <input type="number" value={price} onChange={handleInputChange} />
      <button onClick={handlePricePatchUPDATE}>UPDATE</button>
    </div>
  );
};
