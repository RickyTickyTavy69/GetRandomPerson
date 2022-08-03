import express from "express";
import mongoose from "mongoose";
import saveUsersRouter from "./routes/saveUsers.routes.js";
import deleteUserRouter from "./routes/deleteUser.routes.js";
import addUserRouter from "./routes/addUser.routes.js";
import getUsersRouter from "./routes/getUsers.routes.js";
import banUsersRouter from "./routes/bannUser.routes.js";
import unBanUsersRouter from "./routes/unBannUser.routes.js";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import dirname from "path";
import dotenv from "dotenv";

const MongoURI =
  process.env.MONGODB_URL ||
  "mongodb://Artem:12345@ac-txuh8q0-shard-00-00.ydlxj50.mongodb.net:27017,ac-txuh8q0-shard-00-01.ydlxj50.mongodb.net:27017,ac-txuh8q0-shard-00-02.ydlxj50.mongodb.net:27017/?ssl=true&replicaSet=atlas-18t0gb-shard-0&authSource=admin&retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

const app = express();
const Dirname = dirname();

dotenv.config();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(Dirname, "client", "build")));

app.use("/banUser", banUsersRouter);
app.use("/saveUsers", saveUsersRouter);
app.use("/deleteUser", deleteUserRouter);
app.use("/addUser", addUserRouter);
app.use("/getUsers", getUsersRouter);
app.use("/unBanUser", unBanUsersRouter);

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(Dirname + "/client/build/index.html"));
  });
}

async function start() {
  try {
    await mongoose.connect(MongoURI);
    app.get("*", (req, res) => {
      res.sendFile(path.join(Dirname, "client", "build", "index.html"));
    });
    app.listen(PORT, () => {
      console.log("Server has been started...");
    });
  } catch (error) {
    console.log(error);
  }
}

start();
