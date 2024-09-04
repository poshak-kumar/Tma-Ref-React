// lib/firebase.ts

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, push } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBGnd0FaQwk73-6kn56g43ePfEvWkF_NAQ",
  authDomain: "tma-ref-sys.firebaseapp.com",
  databaseURL: "https://tma-ref-sys-default-rtdb.firebaseio.com",
  projectId: "tma-ref-sys",
  storageBucket: "tma-ref-sys.appspot.com",
  messagingSenderId: "581482906961",
  appId: "1:581482906961:web:3a07bc780c564c426ebf70"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, get, child, push };
