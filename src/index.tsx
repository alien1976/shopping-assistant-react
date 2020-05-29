import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import './assets/styles/main.css';
import store from './redux/store';
import { Provider } from 'react-redux';
console.log(store.getState())
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));