import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";

firebase.initializeApp({
  apiKey: "firebase project api key",
  authDomain: "firebase project authDomain",
  projectId: "firebase project projectId",
  storageBucket: "firebase project storageBucket",
  messagingSenderId: "firebase project messagingSenderId",
  appId: "firebase project appId"
});

const auth = getAuth();

export { auth };
