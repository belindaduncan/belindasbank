import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { getDatabase, ref, get, update } from 'firebase/database';
import { Redirect } from 'react-router-dom';

// Initialize the database
const database = getDatabase();

const Withdraw = () => {
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

  const handleWithdraw = async () => {
    try {
      if (!user) {
        throw new Error('User not authenticated');
      }

      const userRef = ref(database, 'accounts/' + user.uid);
      const userSnap = await get(userRef);

      if (!userSnap.exists()) {
        throw new Error('User account not found');
      }

      const userData = userSnap.val();
      const newBalance = userData.balance - Number(amount);

      // Ensure transactions is an array
      const transactions = Array.isArray(userData.transactions) ? userData.transactions : [];

      // Update the balance and transactions array in the database
      await update(userRef, {
        balance: newBalance,
        transactions: [...transactions, { type: 'withdraw', amount: Number(amount), date: new Date().toISOString() }]
      });

      setStatus(`Withdrawal successful! $${amount} has been withdrawn. New balance: $${newBalance}`);
      setShow(false);
    } catch (error) {
      console.error('Error making withdrawal:', error);
      setStatus('Withdrawal failed!');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <Redirect to="/login" />;

  return (
    <div className="text-center">
      <form className="form-signin" onSubmit={(e) => e.preventDefault()}>
        <img className="mb-4" src="/assets/withdraw.png" alt="Withdraw" width="72" height="72" />
        <h1 className="h3 mb-3 font-weight-bold text-white">Withdraw</h1>

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
            <button className="btn btn-lg btn-primary btn-block" onClick={handleWithdraw}>Withdraw</button>
          </>
        ) : (
          <button className="btn btn-lg btn-primary btn-block" onClick={() => setShow(true)}>
            Withdraw Again
          </button>
        )}

        <p className="mt-5 mb-3 font-weight-bold text-white">&copy;2024</p>
      </form>
    </div>
  );
}

export default Withdraw;