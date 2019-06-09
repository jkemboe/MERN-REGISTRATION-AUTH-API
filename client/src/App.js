import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Alert from './components/layouts/Alert';
import { loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken'; 

//REDUX
import {Provider} from 'react-redux';
import store from './store';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

 return (
      <Provider store={store}>
      <Router>
            <Fragment>
              <Navbar/>
              <Route exact path="/" component={Landing}/>
              <section>
                <Alert/>
                <Switch>
                  <Route exact path="/register" component={Register}/>
                  <Route exact path="/login" component={Login}/>
                </Switch>
              </section>
            </Fragment> 
        </Router>
      </Provider>
    )
}

export default App;
