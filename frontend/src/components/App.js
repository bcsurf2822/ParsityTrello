import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthorized } from "../actions";

const App = (props) => {
  const dispatch = useDispatch();
  const authUser = useSelector(state => state.authentication.authorized)

  useEffect(() => {
    if (authUser) {
      dispatch(fetchAuthorized())
  }
}, [authUser]);

  return (
    <div>
      {props.children}
    </div>
  );
}

export default App;
