import React, { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { logoutAction } from "../redux/authReducer/action";
import { useDispatch } from "react-redux";
import { FaSearchengin } from "react-icons/fa";
import { getProducts } from "../redux/productReducer/action";


const links = [
  { path: "/", text: "Home" },
  { path: "/login", text: "Login" },
  { path: "/add-product", text: "Admin-Page" },
];

export const Navbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const initialSearch = searchParams.getAll("query");
  const [query, setQuery] = useState(initialSearch || "");


  // console.log(initialSearch);

  //Applying Debouncing on search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const paramsObj = {
        params: {
          q: query && query,
        },
      };
      setSearchParams(paramsObj.params);
      /* If the query is present then only pass the Query, if not present then don't pass */
      dispatch(getProducts(paramsObj));
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // LOGOUT
  const logout = () => {
    alert(`You're about to be logged out`);
    dispatch(logoutAction);
  };



  return (
    <>
      <DIV>
        <h1>REDUX CRUD</h1>

        {links.map((ele) => {
          return (
            <NavLink
              key={ele.path}
              to={ele.path}
              className={({ isActive }) => {
                return isActive ? "activeStyle" : "defaultStyle";
              }}
            >
              {ele.text}
            </NavLink>
          );
        })}
        <div className="searchWrapper">
          <INPUT
            placeholder="Type to Search..."
            type="text"
            // value={query}
            onChange={(e) => setQuery(e.target.value)}
            // onChange={(e) => setSearchParams({q: e.target.value})}
          />
          <ICON id="search-icon" />
        </div>

        {/* Dark Mode Switch */}

        {/* LOGOUT */}
        <BUTTON onClick={logout}>Logout</BUTTON>
      </DIV>
      <br />
    </>
  );
};
const DIV = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  /* box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px; */

  position: sticky;
  top: 0;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.4);
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;

  .defaultStyle {
    text-decoration: none;
    color: white;
    font-size: large;
  }
  .activeStyle {
    text-decoration: none;
    color: red;
    font-size: larger;
    font-weight: 800;
  }

  .searchWrapper {
    margin-top: -15px;
    background-color: white;
    border-radius: 2px;
    height: 2.5rem;
    padding: 0 15px;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
    display: flex;
    align-items: center;
  }
`;
const BUTTON = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 5px;
`;

const INPUT = styled.input`
  background-color: transparent;
  border: none;
  font-size: 1.25rem;
  margin-left: 5px;
  font-size: 15px;
  text-align: center;
  &:focus {
    outline: none;
  }
`;
const ICON = styled(FaSearchengin)`
  width: 50px;
  height: 27px;
`;
