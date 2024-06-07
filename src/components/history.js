import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { getDatabase, ref, get } from 'firebase/database';
import { Redirect } from 'react-router-dom';

const database = getDatabase();

function History() {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        console.log('User is authenticated:', user);
        setUser(user);
        const userRef = ref(database, 'accounts/' + user.uid);
        const userSnap = await get(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.val();
          setTransactions(userData.transactions || []);
        }
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

  const handleLoadTransactions = () => {
    setStatus('Transactions Loaded');
  };

  return (
    <div className="text-center">
      <form className="form-signin" onSubmit={(e) => e.preventDefault()}>
        <img className="mb-4" src="/assets/history.png" alt="Transaction History" width="72" height="72" />
        <h1 className="h3 mb-3 font-weight-bold text-white">Transaction History</h1>

        {status && <div className="alert alert-success">
          {status}
        </div>}

        <button className="btn btn-lg btn-primary btn-block" onClick={handleLoadTransactions}>
          Load Transactions
        </button>

        <ul className="list-group mb-3">
          {transactions.map((transaction, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">{transaction.type} transaction</h6>
                <small className="text-muted">Amount: ${transaction.amount}</small>
              </div>
              <span className="text-muted">{new Date(transaction.date).toLocaleString()}</span>
            </li>
          ))}
        </ul>

        <p className="mt-5 mb-3 text-muted">&copy; 2024</p>
      </form>
    </div>
  );
}

export default History;