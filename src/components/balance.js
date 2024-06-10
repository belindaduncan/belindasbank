import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { getDatabase, ref, get } from 'firebase/database';
import { Redirect } from 'react-router-dom';

const database = getDatabase();

function Balance() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');
  const [balance, setBalance] = useState('');
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

  const handleCheckBalance = async () => {
    try {
      const userRef = ref(database, 'accounts/' + user.uid);
      const userSnap = await get(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.val();
        setBalance(userData.balance);
        setStatus(`Your balance is: $${userData.balance}`);
        setShow(false);
      } else {
        setStatus('User not found!');
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
      setStatus('Error fetching balance!');
    }
  };

  return (
    <div className="text-center form-signin">
      <h1 className="h3 mb-3 fw-normal text-white">Balance</h1>
      <img className="mb-4" src="/assets/balance.jpg" alt="Withdraw" width="72" height="72" />
      {status && <div className={`alert ${status.includes('fail') ? 'alert-danger' : 'alert-success'}`}>
        {status}
      </div>}
      {show ? (
        <button className="w-100 btn btn-lg btn-primary" onClick={handleCheckBalance}>
          Check Balance
        </button>
      ) : (
        <BalanceMsg setShow={setShow} balance={balance} />
      )}
      <p className="mt-5 mb-3 font-weight-bold text-white">&copy; 2024</p>
    </div>
  );
}

function BalanceMsg({ setShow, balance }) {
  return (
    <>
      <h5 className="text-white">Your Current Balance</h5>
      <p className="text-white">{balance}</p>
      <button type="button" className="w-100 btn btn-lg btn-primary" onClick={() => setShow(true)}>
        Check balance again
      </button>
    </>
  );
}

export default Balance;
