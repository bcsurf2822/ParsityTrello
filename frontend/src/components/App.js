import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const App = (props) => {
  const dispatch = useDispatch();
  const authUser = useSelector(state => state.)
  // TODO: add authentication here

  return (
    <div>
      {props.children}
    </div>
  );
}

export default App;
