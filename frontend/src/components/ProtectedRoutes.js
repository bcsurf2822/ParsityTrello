import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Protected = () => {
  const authorized = useSelector(state => state.authentication.authorized);
  const userId = useSelector((state) => state.authentication.id);
  const location = useLocation();
  const navigate = useNavigate();
  console.log("Protected Data:", userId);

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
  return <Outlet userId={userId} />;
};
 
export default Protected;
