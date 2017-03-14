import React from 'react';
import reactDOM from 'react-dom';
import {createStore, applyMiddleware, dispatch} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import {Map, List, toJS, fromJS} from 'immutable';

import reducer from '../store/reducer.js';
import actions from '../store/actions.js';
import initState from '../store/initial.js';

import Root from '../root/root.jsx';

import './style.scss';

/** Create Store **/

let store = createStore(reducer, fromJS(initState), applyMiddleware(thunkMiddleware));

store.dispatch(actions.setCurrentDate());
//store.dispatch(actions.populateTable());

/*****************************************
** INJECT ROOT REACT COMPONENT INTO DOM **
*****************************************/

const renderApp = () => {
  reactDOM.render(
    <Provider store={store}>
      <Root/>
    </Provider>,
    document.getElementById('react-app')
  );
}

renderApp();

if(module.hot) {
  module.hot.accept("../root/root.jsx", () => {
    renderApp();
  })
}
