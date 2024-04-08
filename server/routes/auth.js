const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const User = require("../models/User");

/* Configure Multer for FILE UPLOADS */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

/* USER REGISTER */
router.post("/signup", upload.single("profileImage"), async (req, res) => {
  try {
    //take information from form
    const { firstName, lastName, email, password } = req.body;

    /* The uploaded file is available as req.file */
    const profileImage = req.file;

    if (!profileImage) {
      return res.status(400).send("No file uploaded.");
    }

    /* Path to the uploaded profile photo */
    const profileImagePath = profileImage.path;

    /* Check if user exists */
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    var newPassword = password.toString();
    /* Hass the password */
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // create a new User
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagePath,
    });

    await newUser.save();

    res
      .status(200)
      .json({ message: "User registered successfully!", user: newUser });

    /* Handle any errors that occur during registration */
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
});

/* USER LOGIN */

router.post("/login", async (req, res) => {
  try {
    /* Take information from the form */
    const { email, password } = req.body;

    /* Check if user exists */
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist!" });
    }

    /* Compare password */
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    /* Generate JWT token */
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    delete user.password;

    res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
