import * as React from "react";
import ReactDOM from 'react-dom/client'; 
import { HashRouter as HashRouter } from 'react-router-dom';
import "./components/styles/index.css";
import App from "./App";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
  <App />
</HashRouter>,
);
