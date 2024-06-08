import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { getDatabase, ref, get } from 'firebase/database';
import { Redirect } from 'react-router-dom';

const database = getDatabase();

function AllData() {
  const [account, setAccount] = useState(null);
  const [user, setUser] = useState(null);
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
          setAccount(userData);
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

  return (
    <div className="text-center">
      <h2 className="h3 mb-3 font-weight-bold text-white">My Account</h2>
      {account && (
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{account.name} - {account.email}</h5>
            <p className="card-text">Balance: ${account.balance}</p>
            <h6 className="card-subtitle mb-2 text-muted">Recent Transactions:</h6>
            <ul className="list-group">
              {account.transactions && account.transactions.map((transaction, index) => (
                <li key={index} className="list-group-item">
                  {transaction.type} - ${transaction.amount} on {new Date(transaction.date).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <p className="mt-5 mb-3 font-weight-bold text-white">&copy; 2024</p>
    </div>
  );
}

export default AllData;