const router = require("express").Router();

const User = require("../models/User");
const Booking = require("../models/Booking");
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

/* GET TRIPS LIST */

router.get("/:userId/trips", async (req, res) => {
  try {
    const { userId } = req.params;
    const trips = await Booking.find({ customerId: userId }).populate(
      "customerId hostId listingId"
    );

    res.status(202).json(trips);
  } catch (err) {
    res.status(404).json({ message: "Cannot find trips!", error: err.message });
  }
});

/* ADD LISTING TO WISHLIST */
router.patch("/:userId/:listingId", async (req, res) => {
  try {
    const { userId, listingId } = req.params;

    // Check if the user and listing exist
    const user = await User.findById(userId);
    const listing = await Listing.findById(listingId).populate("creator");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Add to Wishlist
    const favoriteListing = user.wishList.find(
      (item) => item._id.toString() === listingId
    );

    if (favoriteListing) {
      user.wishList = user.wishList.filter(
        (item) => item._id.toString() !== listingId
      );
      await user.save();
      res.status(200).json({
        message: "Listing removed from wishlist",
        wishlist: user.wishList,
      });
    } else {
      user.wishList.push(listing);
      await user.save();
      res.status(200).json({
        message: "Listing added to wishlist",
        wishlist: user.wishList,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err.message });
  }
});

/* GET PROPERTY LIST */

router.get("/:userId/properties", async (req, res) => {
  try {
    const { userId } = req.params;
    const properties = await Listing.find({ creator: userId }).populate(
      "creator"
    );

    res.status(202).json(properties);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Cannot find properties!", error: err.message });
  }
});

/* GET RESERVATIOn LIST */

router.get("/:userId/reservations", async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await Booking.find({ hostId: userId }).populate(
      "customerId hostId listingId"
    );

    res.status(202).json(reservations);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Cannot find reservations!", error: err.message });
  }
});

module.exports = router;
