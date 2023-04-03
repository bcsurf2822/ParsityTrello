import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Protected = () => {
  const authorized = useSelector(state => state.authentication.authorized);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (authorized) {
      navigate("/home")
    }
  }, []);

  if (!authorized) {
    return ( 
      <Navigate to="/Login"
      replace
      state = {{from: location.pathname}} />
    );
  } 
  return <Outlet />;
};
 
export default Protected;
