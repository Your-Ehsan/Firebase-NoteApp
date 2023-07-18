import { getApps, initializeApp } from "firebase/app";
import { firebaseConfig } from "./configurations";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { connectAuthEmulator, getAuth } from "firebase/auth";

const initializeServices = () => {
  const isConfigured = getApps().length > 0, // return true||false
    app = initializeApp(firebaseConfig),
    firestore = getFirestore(app),
    storage = getStorage(app),
    auth = getAuth(app);

  return { app, firestore, auth, storage, isConfigured };
};

const connectToEmulaters = (object) => {
  if (location.hostname === "localhost") {
    connectAuthEmulator(object.auth, "http://localhost:9099");
    connectFirestoreEmulator(object.firestore, "localhost", 8080);
    connectStorageEmulator(object.storage, "127.0.0.1", 9199);
  }
};

const getFirebase = () => {
  const services = initializeServices(); // convert fx().{...} to object e.g {...}
  if (!services.isConfigured) {
    connectToEmulaters(services);
  }
  return services;
};

const db = getFirebase().firestore,
  auth = getFirebase().auth,
  storage = getFirebase().storage,
  app = getFirebase().app;

export { db, auth, storage, app };
