import { Router } from "express";
import Users from "../models/usersModel.js";
const router = Router();

router.post("/", async (req, res) => {
  console.log("on server get users");
  try {
    let usersArr = await Users.find();
    if (usersArr.length) {
      console.log("usersArr", usersArr);
      res.status(200).json({ message: "users found", peoples: usersArr });
    } else {
      res.status(200).json({ message: "users array empty", peoples: null });
    }
  } catch (error) {
    console.log("error getting usersArr", error);
  }
});

export default router;
