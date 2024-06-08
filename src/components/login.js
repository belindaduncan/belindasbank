import React, { useState } from 'react';
import { auth } from './firebase'; // Ensure this path is correct
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful:', userCredential.user);
      setStatus('Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      setStatus('Error logging in: ' + error.message);
    }
  };

  return (
    <div className="text-center">
      <form className="form-signin" onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 font-weight-bold text-white">Login</h1>

        {status && <div className={status.includes('Error') ? 'alert alert-danger' : 'alert alert-success'}>
          {status}
        </div>}

        <label htmlFor="inputEmail" className="sr-only font-weight-bold text-white">Email address</label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />

        <label htmlFor="inputPassword" className="sr-only font-weight-bold text-white">Password</label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
        <p className="mt-5 mb-3 text-muted">&copy; 2024</p>
      </form>
    </div>
  );
}

export default Login;