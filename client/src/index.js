import React from 'react'
import * as ReactDOMClient from 'react-dom/client';
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import store from "./redux/store.js"
import './index.css'
import App from './App'
import 'nes.css/css/nes.min.css'
import reportWebVitals from './reportWebVitals';

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

reportWebVitals();
