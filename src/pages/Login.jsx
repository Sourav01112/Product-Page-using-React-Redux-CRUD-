import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { loginACtion } from "../redux/authReducer/action";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export const Login = () => {
  const { isAuth } = useSelector((store) => store.authReducer);
  const error = useSelector((store) => store.authReducer.isError);
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);

  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    alert("Successfully logged in");
    dispatch(loginACtion(userData)).then((res) => {
      navigate(location.state);
    });
  };

  return (
    <DIV isAuth={isAuth} error={error}>
      <h2>{isAuth ? "Login Successful" : "Login to proceed"}</h2>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />{" "}
      <br />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />{" "}
      <br />
      <button onClick={handleLogin}>Login</button>
    </DIV>
  );
};

const DIV = styled.div`
  width: 250px;
  margin: auto;
  /* border: 1px solid gray; */
  padding: 10px;
  text-align: center;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

  input {
    margin-top: 5px;
    margin-bottom: 10px;
    border: ${({ error }) => (error ? "2px solid red" : "2px solid gray")};
  }

  h2 {
    color: ${({ isAuth }) => {
      return isAuth ? "green" : "red";
    }};
  }
`;
