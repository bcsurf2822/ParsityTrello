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
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Protected />}>
          <Route path="/home" element={<Home />} />
          <Route path="/board/:id" element={<Board />} />
        </Route>
        <Route path="*" element={<Nothing />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
