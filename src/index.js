import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {UserProvider} from "./context/user.context";

import './index.scss';
import App from './App';
import {ProductsProvider} from "./context/products.context";

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider>
          <App />
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
