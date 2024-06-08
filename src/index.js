import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavBar from './components/navbar';
import Home from './components/home';
import CreateAccount from './components/createaccount';
import Login from './components/login';
import Deposit from './components/deposit';
import Withdraw from './components/withdraw';
import Balance from './components/balance';
import History from './components/history';
import AllData from './components/alldata';
import { UserProvider } from './components/context';

function Spa() {
  return (
    <HashRouter>
      <UserProvider>
        <NavBar />
        <div className="container" style={{ padding: '20px' }}>
          <Route path="/" exact component={Home} />
          <Route path="/CreateAccount/" component={CreateAccount} />
          <Route path="/login/" component={Login} />
          <Route path="/deposit/" component={Deposit} />
          <Route path="/withdraw/" component={Withdraw} />
          <Route path="/balance/" component={Balance} />
          <Route path="/history/" component={History} />
          <Route path="/alldata/" component={AllData} />
        </div>
      </UserProvider>
    </HashRouter>
  );
}

ReactDOM.render(<Spa />, document.getElementById('root'));