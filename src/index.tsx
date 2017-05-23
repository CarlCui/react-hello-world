import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import {reducers} from './reducers';

import { App } from './components/app';

declare var require: any;

require('./styles/styles.scss');

const store = createStore(reducers,composeWithDevTools(
//   applyMiddleware(...middleware),
//   // other store enhancers if any
));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
