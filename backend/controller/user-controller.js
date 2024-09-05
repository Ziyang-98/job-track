import { v4 } from "uuid";
import {
  createUser,
  deleteUser,
  getUser,
} from "../database/helpers/user-helper.js";

const UserController = {
  getUser: async (req, res) => {
    let { userId = "" } = req.query;
    let user = await getUser({ userId });
    let msg = "User retrieved!";
    // Create new user if user is not found
    if (!user) {
      userId = v4();
      user = await createUser({ userId });
      msg = "New user created!";
    }

    res.status(200).json({ msg, userId: user.userId });
  },

  deleteUser: async (req, res) => {
    try {
      let { userId } = req.body;
      let user = await deleteUser({ userId });
      let msg = "User deleted!";

      res.status(200).json({ msg, userId: user.userId });
    } catch (err) {
      console.error(err);
      res
        .status(400)
        .json({ msg: "Encountered error getting job applications!" });
    }
  },
};

export default UserController;
