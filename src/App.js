import React from 'react';
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Create from './Components/create.component';
import Edit from './Components/edit.component';
import Index from './Components/index.component';

import Paginacation from './Components/pagination.component';


function App() {
  return (
    <Router>
        <div className="container-flud">
          {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">CRUD</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <Link to={'/'} className="nav-link">Index</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/create'} className="nav-link">Create</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/index'} className="nav-link">Index</Link>
                </li>
              </ul>
            </div>
          </nav> <br/> */}
          
          <div className="container">
          <h1 className="App">Welcome To Product Application!</h1>
          <Switch>
              <Route exact path='/' component={Index} />
              <Route exact path='/create' component={ Create } />
              <Route path='/edit/:id' component={ Edit } />
              <Route path='/index' component={ Index } />
              <Route path='/Paginacation' component={ Paginacation } />
          </Switch>
          </div>
        </div>
      </Router>
  );
}

export default App;
