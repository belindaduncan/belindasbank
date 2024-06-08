import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADxsbFrSabiJqJ3FcH4LHl5hytkvNSaNU",
  authDomain: "badbank-949ff.firebaseapp.com",
  databaseURL: "https://badbank-949ff-default-rtdb.firebaseio.com",
  projectId: "badbank-949ff",
  storageBucket: "badbank-949ff.appspot.com",
  messagingSenderId: "513605719640",
  appId: "1:513605719640:web:4862a1d5b77a21d052dc2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// authentication service
const auth = getAuth(app);

// Realtime Database service
const database = getDatabase(app);

export { auth, database };