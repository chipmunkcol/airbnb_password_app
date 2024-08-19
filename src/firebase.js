import dotenv from "dotenv";
dotenv.config();
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  getDocs,
  query,
  where,
  limit,
  orderBy,
  collection,
} from "firebase/firestore";
// import { getFirestore, getDoc, updateDoc, doc } from "@firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = process.env.FIREBASE_CONFIG;

// const firestore = getFirestore(app);
// const docRef = doc(firestore, "collection/doc");
// const docSnap = await getDoc(docRef);
// await updateDoc(docRef, "field", "value");
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 *
 * @returns {Promise<{value: string}[]>}
 */
export async function getDB() {
  const q = query(
    collection(db, "PASSWORD"),
    orderBy("date", "desc"),
    limit(2)
  );

  const querySnapshot = await getDocs(q);
  const passwords = [];
  querySnapshot.forEach((doc) => {
    passwords.push(doc.data());
  });
  return passwords;
}

/**
 *
 * @param {string} date // password 업로드 날짜 ex) 240819
 * @param {string} password // password
 */
export async function uploadDB(date, password) {
  await setDoc(doc(db, "PASSWORD", date), {
    value: password,
    date: date,
  });
}

// const docRef = doc(db, "도시", "서울");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // docSnap.data() will be undefined in this case
//   console.log("No such document!");
// }

// const querySnapshot = await getDocs(collection(db, "도시"));
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc, " => ", doc.data());
// });
