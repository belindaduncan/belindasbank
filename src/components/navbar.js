import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './context'; // Ensure this path is correct

function NavBar() {
  const { user, logout } = useUser();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">BadBank</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/CreateAccount/">Create Account</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login/">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/deposit/">Deposit</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/withdraw/">Withdraw</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/balance/">Balance</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/history/">Transaction History</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/alldata/">AllData</Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          {user ? (
            <>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={logout}>Logout</button>
              </li>
              <li className="nav-item">
                <span className="nav-link">{user.email}</span>
              </li>

            </>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/login/">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;