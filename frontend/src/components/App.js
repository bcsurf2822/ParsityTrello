import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthorized } from "../actions";

const App = (props) => {
  const dispatch = useDispatch();
  const authorized = useSelector(state => state.authentication.authorized)

  useEffect(() => {
    if (authorized) {
      dispatch(fetchAuthorized())
  }
}, [authorized]);

  return (
    <div>
      {props.children}
    </div>
  );
}

export default App;
