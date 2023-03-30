import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthorized } from "../actions";
import { Navigate } from "react-router-dom";
import Login from "./login";

const App = (props) => {
  const dispatch = useDispatch();
  const authorized = useSelector(state => state.authentication.authorized)

  
  return (
    <div>
      {props.children}
    </div>
  );
}

export default App;
