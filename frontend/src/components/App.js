import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useState } from "react";
import Login from "./login";
import Home from "./home";
import Board from "./boardscreen";
import Protected from "./ProtectedRoutes";
import { useState } from "react";


const App = () => {
  const [isAuthorized, setIsAuthroized] = useState(null)
const logIn = () => {
  isAuthorized(true)
}

const logOut = () => {
  isAuthorized(false)
}
  // TODO: add authentication here

  return (
      <BrowserRouter>
          <Routes>
            <Route exact path="/" Component={Login} />
            <Route path="/home" Component={Home} />
            <Route path="/board" Component={Board}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
