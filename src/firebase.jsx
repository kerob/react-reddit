import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  onSnapshot,
  where,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { useThreadUpdate } from "./providers/ThreadProvider";
import { randomStringGenerator } from "./util/RandomStringGenerator";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage(app);

const usersRef = collection(db, "users");
const postsRef = collection(db, "posts");
const threadsRef = collection(db, "threads");
const storageRef = ref(storage);

export function useStorage(file, id) {
  //function to store images and lock them to thread id
  const fileRef = ref(
    storage,
    `images/${file.name}+${randomStringGenerator(10)}`
  );
  uploadBytes(fileRef, file).then((snapshot) => {
    getDownloadURL(snapshot.ref).then((url) => {
      const docRef = doc(db, "threads", id);
      updateDoc(docRef, { imageUrl: url });
      console.log("file uploaded at " + url);
    });
  });
}

export function getThread(id) {
  //accepts thread id and registers data to current thread context
  const [thread, setThread] = useState();
  const func = useThreadUpdate();

  useEffect(() => {
    const docRef = doc(db, "threads", id);
    getDoc(docRef).then((doc) => {
      let item = { ...doc.data(), id: id };
      // console.log(item);
      setThread(item);
      func(item);
    });
  }, []);

  return thread;
}

export function getThreads(sortType) {
  //grab all starting thread posts and orders by specified field
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const q = query(threadsRef, orderBy(sortType, "desc"), limit(25));
    // console.log("test");

    const unsub = onSnapshot(q, (threadSnapshot) => {
      let threadOutput = [];
      threadSnapshot.docs.forEach((doc) => {
        threadOutput.push({ ...doc.data(), id: doc.id });
      });
      setThreads(threadOutput);
    });

    return () => unsub();
  }, [sortType]);

  return threads;
  // return () => output();
}

export function addThread(user, uid, title, post, image) {
  //creates a new thread to add to firestore

  const date = new Date();
  addDoc(threadsRef, {
    userid: uid,
    user: user,
    createdAt: date,
    lastUpdated: date,
    title: title,
    content: post,
    rating: 0,
  }).then((thread) => {
    if (image) {
      console.log("storing image");
      useStorage(image, thread.id);
    }
    console.log("thread added");
  });
}

export function getComments(threadid, parentid) {
  //fetches comments of a given post
  const [comments, setComments] = useState([]);
  const commentsRef = collection(db, `threads/${threadid}/comments`);

  useEffect(() => {
    const q = query(
      commentsRef,
      orderBy("lastUpdated"),
      where("parent", "==", parentid),
      limit(25)
    );
    const unsub = onSnapshot(q, (commentSnapshot) => {
      let output = [];
      commentSnapshot.docs.forEach((doc) => {
        output.push({ ...doc.data(), id: doc.id });
      });
      setComments(output);
    });

    return () => unsub();
  }, [threadid, parentid]);

  return comments;
}

export function addComment(id, post, user, uid, parent) {
  //adds doc as a comment registered to another doc
  const commentsRef = collection(db, `threads/${id}/comments`);
  const datePosted = new Date();

  addDoc(commentsRef, {
    userid: uid,
    user: user,
    lastUpdated: datePosted,
    content: post,
    rating: 0,
    parent: parent,
  }).then(() => {
    const threadRef = doc(db, "threads", id);
    updateDoc(threadRef, { lastUpdated: datePosted });
  });
}

export { app, auth, usersRef, postsRef, threadsRef, db };
