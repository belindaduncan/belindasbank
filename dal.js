const admin = require('firebase-admin');
const serviceAccount = require('./config/serviceAccountKey.json'); // Ensure this path is correct

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://badbank-949ff-default-rtdb.firebaseio.com'
});

const db = admin.database();

// Create user account
function create(name, email, password) {
  return new Promise((resolve, reject) => {
    const ref = db.ref('users').push();
    const user = { name, email, password, balance: 0 };
    ref.set(user, error => {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    });
  });
}

// Get all users
function all() {
  return new Promise((resolve, reject) => {
    db.ref('users').once('value', snapshot => {
      const data = snapshot.val();
      const users = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      resolve(users);
    }, error => {
      reject(error);
    });
  });
}

// Login
function login(email, password) {
  return new Promise((resolve, reject) => {
    db.ref('users').orderByChild('email').equalTo(email).once('value', snapshot => {
      const data = snapshot.val();
      if (data) {
        const userKey = Object.keys(data)[0];
        const user = data[userKey];
        if (user.password === password) {
          resolve(user);
        } else {
          reject(new Error('Incorrect password'));
        }
      } else {
        reject(new Error('User not found'));
      }
    }, error => {
      reject(error);
    });
  });
}

module.exports = { create, all, login };