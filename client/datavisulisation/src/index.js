import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//reactstrap and bootstrap css
import 'bootstrap/dist/css/bootstrap.css';
//datepicker css
import "react-datepicker/dist/react-datepicker.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

