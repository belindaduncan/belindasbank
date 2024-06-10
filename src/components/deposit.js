import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { getDatabase, ref, get, update } from 'firebase/database';
import { Redirect } from 'react-router-dom';

const database = getDatabase();

function Deposit() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');
  const [amount, setAmount] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log('User is authenticated:', user);
        setUser(user);
      } else {
        console.log('No user is authenticated');
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Redirect to="/login" />;

  const handleDeposit = async () => {
    try {
      const userRef = ref(database, 'accounts/' + user.uid);
      const userSnap = await get(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.val();
        const newBalance = userData.balance + Number(amount);

        // Ensure transactions is an array
        const transactions = Array.isArray(userData.transactions) ? userData.transactions : [];

        await update(userRef, {
          balance: newBalance,
          transactions: [...transactions, { type: 'deposit', amount: Number(amount), date: new Date().toISOString() }]
        });

        setStatus(`Deposit successful! $${amount} added to your account. New balance: $${newBalance}`);
        setShow(false);
      } else {
        setStatus('User not found!');
      }
    } catch (error) {
      console.error('Error making deposit:', error);
      setStatus('Deposit failed!');
    }
  };

  return (
    <div className="text-center">
      <form className="form-signin" onSubmit={(e) => e.preventDefault()}>
        <img className="mb-4" src="/assets/deposit.JPG" alt="Deposit" width="72" height="72" />
        <h1 className="h3 mb-3 font-weight-bold text-white">Deposit</h1>

        {status && <div className={status.includes('fail') ? 'alert alert-danger' : 'alert alert-success'}>
          {status}
        </div>}

        {show ? (
          <>
            <label htmlFor="inputAmount" className="sr-only font-weight-bold text-white">Amount</label>
            <input
              type="number"
              id="inputAmount"
              className="form-control"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={handleDeposit}>Deposit</button>
          </>
        ) : (
          <button className="btn btn-lg btn-primary btn-block" onClick={() => setShow(true)}>Deposit Again</button>
        )}

        <p className="mt-5 mb-3 font-weight-bold text-white">&copy; 2024</p>
      </form>
    </div>
  );
}

export default Deposit;
