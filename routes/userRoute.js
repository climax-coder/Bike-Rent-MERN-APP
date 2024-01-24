const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await User.findOne({ email, pass });
    if (user) {
      user.pass = null;
      return res.json({ user: user, code: true, msg: "Login Success" });
    } else {
      return res.json({ code: false, msg: "Login failed" });
    }
  } catch (error) {
    return res.json({ code: false, msg: "Login failed" });
  }
});

router.post("/register", async (req, res) => {
  const { email, pass } = req.body;
  const exists = await User.findOne({ email: email });
  if (exists) {
    return res.json({ code: false, msg: "User already exists" });
  } else {
    const newUser = new User(req.body);

    newUser.save((err) => {
      if (!err) {
        return res.json({
          code: true,
          msg: "User Registration Success, will be redirected to login page",
        });
      } else return res.json({ code: false, msg: "Something went wrong" });
    });
  }
});

router.post("/update", async (req, res) => {
  const updateObj = req.body;
  const email = updateObj.email;
  const curpass = updateObj.curpass;
  const pass = updateObj.pass;
  const update = updateObj.update;
  const user = await User.findOne({ email });
  if (user && curpass == user.pass) {
    User.findByIdAndUpdate(
      user._id,
      {
        name: updateObj.uname,
        pass,
        update,
      },
      (err) => {
        if (err) {
          console.log("Network error");
          return res.json({ msg: "Something went wrong" });
        } else return res.json({ msg: "User details updated successfully" });
      }
    );
  } else {
    console.log("Current password is invalid");
    return res.send({ success: false, msg: "Current password is invalid" });
  }
});

module.exports = router;
