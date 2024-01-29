import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./App";
import {Provider} from "react-redux";
import store from "./redux/store"

 //pobranie magazynu stanu
//provider to komponent, który udostępnia magazyn stanu całej aplikacji dlatego aplikacja jest w środku providera

const rootElement = document.getElementById('root');
createRoot(rootElement).render(
 <Provider store={store}>
  <App />
  </Provider>,
  
);

