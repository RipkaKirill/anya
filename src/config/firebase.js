import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjVgkQIsdiIiYjOBh_b_1ZWngavTZj19s",
  authDomain: "artpanda-c3c82.firebaseapp.com",
  databaseURL: "https://artpanda-c3c82-default-rtdb.firebaseio.com",
  projectId: "artpanda-c3c82",
  storageBucket: "artpanda-c3c82.appspot.com",
  messagingSenderId: "240548728819",
  appId: "1:240548728819:web:6a04f69877cdb899cd4c86"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)