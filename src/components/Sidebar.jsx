import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  TbSquareNumber1,
  TbSquareNumber2,
  TbSquareNumber3,
  TbSquareNumber4,
} from "react-icons/tb";
import { HiPlusSm } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../redux/productReducer/action";
import { useDispatch } from "react-redux";

export const Sidebar = ({ page, order, setOrder }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const initialCategory = searchParams.getAll("category");
  const initialRating = searchParams.getAll("rating");
  const [category, setCategory] = useState(initialCategory || []);
  const [rating, setRating] = useState(initialRating || []);
  //whenever someone is changing category, useEffect will be triggered and will set that to link.

  useEffect(() => {
    let params = {
      category,
      page,
      rating,
    };
    order && (params.order = order);
    setSearchParams(params);
  }, [category, page, rating, order]);

  //   console.log(searchParams.getAll("category"));

  const handleCategory = (e) => {
    console.log(e.target.value);
    const { value } = e.target;
    //Below checking whether items are already present or not
    let newCategory = [...category];
    if (newCategory.includes(value)) {
      newCategory = newCategory.filter((ele) => ele !== value);
    } else {
      newCategory.push(value);
      //if not present in the Array, just push it
    }
    setCategory(newCategory);
    console.log(category);
  };

  const handleRating = (e) => {
    console.log(e.target.value);
    const { value } = e.target;
    setRating(value);
  };

  return (
    <div>
      <h3>Filter</h3>
      <div>
        <input
          type="checkbox"
          value={`men's clothing`}
          checked={category.includes(`men's clothing`)}
          //checked will make sure checked persists even after refresh
          onChange={handleCategory}
        />
        <label>Men's Clothing</label>
        <br />
        <input
          type="checkbox"
          value={`women's clothing`}
          checked={category.includes(`women's clothing`)}
          onChange={handleCategory}
        />
        <label>Women's clothing</label>
        <br />
        <input
          type="checkbox"
          value={"electronics"}
          checked={category.includes("electronics")}
          onChange={handleCategory}
        />
        <label>Electronics</label>
        <br />
        <input
          type="checkbox"
          value={"jewellery"}
          checked={category.includes("jewellery")}
          onChange={handleCategory}
        />
        <label>Jewellery</label>
      </div>

      <br />
      <div>
        <h3>Filter By Rating</h3>
        <label>
          <TbSquareNumber1 /> <HiPlusSm />
        </label>
        <input
          type="radio"
          value={"1"}
          onChange={handleRating}
          name="rating"
          checked={rating.includes("1")}
        />
        <br />
        <label>
          <TbSquareNumber2 /> <HiPlusSm />
        </label>
        <input
          type="radio"
          value={"2"}
          onChange={handleRating}
          name="rating"
          checked={rating.includes("2")}
        />
        <br />
        <label>
          <TbSquareNumber3 /> <HiPlusSm />
        </label>
        <input
          type="radio"
          value={"3"}
          onChange={handleRating}
          name="rating"
          checked={rating.includes("3")}
        />
        <br />
        <label>
          <TbSquareNumber4 /> <HiPlusSm />
        </label>
        <input
          type="radio"
          value={"4"}
          onChange={handleRating}
          name="rating"
          checked={rating.includes("4")}
        />
      </div>
      {/* Clearing All the selected filters */}
      <BUTTON
        onClick={() => {
          setRating([]);
          setCategory([]);
          setOrder("");
          setSearchParams({});
          dispatch(getProducts());
        }}
      >
        Clear All Filter
      </BUTTON>
    </div>
  );
};

const BUTTON = styled.button`
  margin-top: 15px;
  width: 35%;
  padding: 5px 0px;
  cursor: pointer;
  border: none;
  color: white;
  background-color: #3470e4;
`;
