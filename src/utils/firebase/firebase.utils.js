import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDGcEvKP3WJRVZJBn0aXKiApFBwa5szb8",
  authDomain: "crwn-cloting-db.firebaseapp.com",
  projectId: "crwn-cloting-db",
  storageBucket: "crwn-cloting-db.appspot.com",
  messagingSenderId: "830936189622",
  appId: "1:830936189622:web:4d2e62936f729fc4413417",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig) 

//GoogleAuthProvider 인스턴스 생성
const googleProvider = new GoogleAuthProvider();
//Configuration => GoogleAuthProvider가 작동하는 방식 (Google이 정해놓은 방식 중 하나를 택하는 것임)
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

//auth 인스턴스 생성
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

//firebase DB 인스턴스 생성
export const db = getFirestore();

//새로운 user를 Database의 새 document를 생성하여 넣기
export const createUserDocumentFromAuth = async (userAuth, addtionalInformation = {}) => {
  if(!userAuth) return; 
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  //user data does not exists
  if(!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...addtionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
}


//Email&Password로 가입한 user의 authentication 확보
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}
//Email&Password로 가입한 user 로그인
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

//로그아웃!
export const signOutUser = async() => await signOut(auth);

//user(auth)에 대한 정보를 끊임없이 수신하는 함수
export const onAuthStateChangedListener = (nextCallback) =>  {
  if(!nextCallback) return; //안전장치
  return onAuthStateChanged(auth, nextCallback);
} 


//데이터를 firestore에 저장하도록!
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  //Get a new write batch
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
}

//데이터를 firestore(categories collection)에서 가져오도록!
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  //snapshot의 데이터 -> 객체로!
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot, i) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  },{});

  return categoryMap;
}