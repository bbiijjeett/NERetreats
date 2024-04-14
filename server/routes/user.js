const router = require("express").Router();

const User = require("../models/User");
const Listing = require("../models/Listing");

/* GET USER or HOST */

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(202).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});
module.exports = router;
