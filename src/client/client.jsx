import React from 'react';
import reactDOM from 'react-dom';
import {createStore, applyMiddleware, dispatch} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory, IndexRedirect} from 'react-router';
import {AppContainer} from 'react-hot-loader';
import {Map, List, toJS, fromJS} from 'immutable';

import reducer from '../store/reducer.js';
import actions from '../store/actions.js';
import initState from '../store/initial.js';

import Root from '../root/root.jsx';

import './style.scss';

/** Create Store **/

let store = createStore(reducer, fromJS(initState), applyMiddleware(thunkMiddleware));

store.dispatch(actions.populateTable());


/**********************
** ROUTES DEFINITION **
**********************/



/*const DayViewTest = (props) => {
  return <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppRoot}>
        <IndexRedirect to="/date"/>
        <Route path="date" component={DayView}/>
      </Route>
    </Router>
  </Provider>
}*/


/*****************************************
** INJECT ROOT REACT COMPONENT INTO DOM **
*****************************************/

const renderApp = (TheRoot) => {
  reactDOM.render(
    <AppContainer>
      <TheRoot store={store} history={browserHistory}/>
    </AppContainer>,
    document.getElementById('react-app')
  );
}

renderApp(Root);

if(module.hot) {
  module.hot.accept("../root/root.jsx", () => {
    const NewRoot = require("../root/root.jsx").default;
    renderApp(NewRoot);
  })
}
