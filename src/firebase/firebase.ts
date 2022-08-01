import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
      GoogleAuthProvider,
      getAuth,
      signInWithPopup,
      signInWithEmailAndPassword,
      createUserWithEmailAndPassword,
      sendPasswordResetEmail,
     signOut,
        EmailAuthCredential,
    } from "firebase/auth";
    import {
      getFirestore,
      query,
      getDocs,
     collection,
     where,
     addDoc,
    } from "firebase/firestore";
import { toast } from "react-toastify";
import { parseString } from '../helpers'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: parseString(import.meta.env.VITE_API_KEY, ''),
  authDomain: parseString(import.meta.env.VITE_AUTH_DOMAIN, '') ,
  projectId:parseString(import.meta.env.VITE_PROJECTID, '') ,
  storageBucket:parseString(import.meta.env.VITE_STORAGE_BUCKET, '') ,
  messagingSenderId:parseString(import.meta.env.VITE_MESSAGINGSENDERID, '') ,
  appId:parseString(import.meta.env.VITE_APP_ID, '') ,
  measurementId:parseString(import.meta.env.VITE_MEASUREMENT_ID, '') 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err: any) {
    console.error(err);
    toast.error(err.message);
  }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
      toast.success("Registered successfully")
    } catch (err: any) {
      toast.error(err.message.split("/")[1].split(")")[0]);
    }
  };

  const sendPasswordReset = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset link sent!");
    } catch (err: any) {
      toast.error(err.message.split("/")[1].split(")")[0]);
    }
  };

  const logout = () => {
    signOut(auth);
  };

  export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
  };