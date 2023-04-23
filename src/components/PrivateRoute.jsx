import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { isAuth } = useSelector((store) => store.authReducer);
  const location = useLocation();
  // console.log(location);

  return isAuth ? (
    children
  ) : (
    <Navigate state={location.pathname} to={"/login"} />
  );
  //using state={location.pathname} will save where you are coming from if you are not authenticated, but for this you need to return axios in action and then use .then in login with useNavigate HOOK
};
