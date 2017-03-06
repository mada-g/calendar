import {Provider} from 'react-redux';
import {Router, Route, IndexRedirect} from 'react-router';

import routes from '../routes/index.jsx';

export default class Root extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const {store, history} = this.props;
    return <Provider store={store}>
      <Router history={history} routes={routes}>
      </Router>
    </Provider>
  }
}
