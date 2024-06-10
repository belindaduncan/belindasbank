import React, { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

const database = getDatabase();

function CreateAccount() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed up:', user);
      await set(ref(database, 'accounts/' + user.uid), {
        name,
        email,
        balance: 0,
        transactions: []
      });
      setStatus('User signed up successfully!');
    } catch (error) {
      console.error('Error signing up:', error);
      setStatus('Error signing up: ' + error.message);
    }
  };

  return (
    <div className="text-center">
      <form className="form-signin" onSubmit={handleSignUp}>
      <img className="mb-4" src="/assets/create.jpg" alt="Withdraw" width="72" height="72" />    
        <h1 className="h3 mb-3 font-weight-bold text-white">Create Account</h1>

        {status && <div className={status.includes('Error') ? 'alert alert-danger' : 'alert alert-success'}>
          {status}
        </div>}

        <label htmlFor="inputName" className="sr-only font-weight-bold text-white">Name</label>
        <input
          type="text"
          id="inputName"
          className="form-control"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />

        <label htmlFor="inputEmail" className="sr-only font-weight-bold text-white">Email address</label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
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

        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
        <p className="mt-5 mb-3 text-muted">&copy; 2024</p>
      </form>
    </div>
  );
}

export default CreateAccount;
