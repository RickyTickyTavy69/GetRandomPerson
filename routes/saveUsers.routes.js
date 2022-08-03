import { Router } from "express";
import Users from "../models/usersModel.js";
const router = Router();
router.post("/", async (req, res) => {
  let peoples = req.body;
  console.log("on server, peoples", peoples);
  try {
    let usersArr = await Users.find();
    if (usersArr.length) {
      console.log("usersArr", usersArr);
      res
        .status(200)
        .json({ message: "users have been found", peoples: usersArr });
    } else {
      let newPeoples = new Users({ usersArray: peoples });
      if (newPeoples) {
        console.log("newPeoples", newPeoples);
        try {
          await newPeoples.save();
          console.log("pepole have been saved");
          res.status(200).json({ message: "users have been saved", peoples });
        } catch (error) {
          console.log("error saving people", error);
        }
      }
    }
  } catch (error) {
    console.log("error getting usersArr", error);
  }
});

export default router;
