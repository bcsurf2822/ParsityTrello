import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./components/App";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import store from "./reducers";
import Board from "./components/boardscreen";
import Protected from "./components/ProtectedRoutes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <Routes>
            <Route exact path="/login" index Component={Login} />
            <Route path="/" element={<Protected />}>
              <Route path="/home" Component={Home} />
              <Route path="/board" Component={Board}/>
            </Route>
          </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
