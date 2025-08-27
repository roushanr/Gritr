import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCUFDNsISbSTt0hhxIGxtmOvROBbsbAGyk",
  authDomain: "yelp-like-griterr.firebaseapp.com",
  projectId: "yelp-like-griterr",
  storageBucket: "yelp-like-griterr.firebasestorage.app",
  messagingSenderId: "261614060546",
  appId: "1:261614060546:web:0247abf7675e011660531b",
});

const app = express();
app.use(cors());

type UserProfile = {
  name: string;
  handle: string;
  avatarUrl: string;
  verified: boolean;
  followers: string;
  following: string;
  postsCount: string;
  bio: string;
};

app.get("/userProfile", async (req, res) => {
  try {
    const database = getFirestore(firebaseApp);
    const usersRef = doc(database, "users", "FfJ6GmPUfwmWa9inObRw");
    const userSnapshot = await getDoc(usersRef);

    const user = userSnapshot.exists()
      ? (userSnapshot.data() as UserProfile)
      : null;

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Error fetching user");
  }
});

export const api = functions.https.onRequest(app);
