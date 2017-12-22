// для соединения с Firebase
import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';

const app = firebase.initializeApp({
    apiKey: "AIzaSyBuSCYwWwQeEcoJCOw9kS0UYsfehoPCdtE",
    authDomain: "catch-of-the-day-f946b.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-f946b.firebaseio.com",
  });
  
const db = firebase.database(app);
const base = Rebase.createClass(db);

export default base;
export { app };