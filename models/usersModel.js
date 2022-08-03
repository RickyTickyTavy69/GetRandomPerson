import pkg from "mongoose";
const { Schema, model } = pkg;

const userSchema = new Schema({
  usersArray: {
    type: Array,
    required: true,
  },
});

export default model("Users", userSchema);
