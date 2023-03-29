import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';
import Board from './components/boardscreen';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route exact path="/" Component={Login}/>
          <Route path="/home" Component={Home}/>
          <Route path="/board" Component={Board}/>
        </Routes>
      </App>
    </BrowserRouter>
  </React.StrictMode>
);
