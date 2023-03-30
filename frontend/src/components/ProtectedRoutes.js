import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Protected = () => {
  const authorized = useSelector(state => state.authentication.authorized);
  const location = useLocation();

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
