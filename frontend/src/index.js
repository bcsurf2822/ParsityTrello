import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import store from "./reducers";
import Board from "./components/boardscreen";
import Protected from "./components/ProtectedRoutes";
import Nothing from "./components/NotFound";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
    <Routes>
            <Route exact path="/login" index Component={Login} />
            <Route path="/" element={<Protected />}>
              <Route  path="/home" Component={Home} />
              <Route path="/board/:id" Component={Board}/>
            </Route>
            <Route path="*" Component={Nothing} />
          </Routes>
    </BrowserRouter>
  </Provider>
);
