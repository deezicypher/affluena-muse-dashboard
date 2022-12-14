
import React from "react";
import ReactDOM from "react-dom";
import { Toaster } from 'react-hot-toast';
import App from "./App";
import { StateContextProvider } from './context/stateContext';

import { BrowserRouter} from "react-router-dom";


import 'react-phone-number-input/style.css'



const user = JSON.parse(localStorage.getItem("user"));


ReactDOM.render(
<StateContextProvider>
  <BrowserRouter>
  <Toaster />
    <App />
  </BrowserRouter>
  </StateContextProvider>,
  document.getElementById("root"),
);
