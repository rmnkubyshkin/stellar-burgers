import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/app/app';
import { BrowserRouter } from 'react-router-dom';
import { AppDispatch, RootState, store } from './services/store/store';
import { Provider, useDispatch } from 'react-redux';
import { getIngredients } from './services/slices/ingredientSlice/ingredientsSlice';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

const AppWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </React.StrictMode>
);
