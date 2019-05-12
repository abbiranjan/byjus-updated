import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
// import Search from './components/Search';
import { Provider } from 'react-redux';
import store from './store';
// import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/*<Switch>
          <Route exact path = "/" component={Login}/>
          <Route exact path = "/search" component={Search}/>
        </Switch>*/}
        <Login/>
      </div>
    </Provider>
  );
}

export default App;
