import { Router } from "express";
import Users from "../models/usersModel.js";
const router = Router();

router.post("/", async (req, res) => {
  let user = req.body.username;
  console.log("on server, user", user);
  try {
    let usersArr = await Users.find();
    if (usersArr.length) {
      console.log("usersArr", usersArr);

      let newUsersArr = usersArr[0].usersArray; // die Array, die er aus der DB holt hat uf idx 0 eine id und eine Array, id muss ich hier wegnehmen.
      newUsersArr.push(user); // und nur die Array in newUsersArr abspreichern, da bei erneutem Spreichern wieder ein ID erstellt wird automatisch.
      console.log("new usersArr", newUsersArr);
      await Users.findOneAndRemove();
      let newUsers = new Users({ usersArray: newUsersArr });
      await newUsers.save();
      res
        .status(200)
        .json({ message: "users have been updated", peoples: newUsersArr });
    } else {
      usersArr = [user];
      let newUsers = new Users({ usersArray: usersArr });
      await newUsers.save();
      res
        .status(200)
        .json({ message: "users have been updated", peoples: usersArr });
    }
  } catch (error) {
    console.log("error getting usersArr", error);
  }
});

export default router;
