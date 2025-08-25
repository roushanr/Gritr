import * as functions from "firebase-functions";
import * as express from "express";
import * as admin from "firebase-admin";

admin.initializeApp();

const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello from Express on Firebase!");
});

export const api = functions.https.onRequest(app);