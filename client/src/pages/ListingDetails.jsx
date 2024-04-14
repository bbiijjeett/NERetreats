import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { facilities } from "../data";
import Loader from "../components/Loader";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { setWishList } from "../redux/state";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const ListingDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState({});
  const [host, setHost] = useState(null);

  const { listingId } = useParams();

  const getListing = async () => {
    try {
      const response = await fetch(
        `https://ne-retreats-api.vercel.app/properties/${listingId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setListing(data);

      setTimeout(function () {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.log("Fetch Listing failed", error.message);
    }
  };

  useEffect(() => {
    getListing();
  }, []);

  // useEffect(() => {
  //   const getHost = async () => {
  //     const hostId = listing.creator;
  //     try {
  //       const response = await fetch(`http://localhost:3001/users/${hostId}`, {
  //         method: "GET",
  //       });
  //       const data = await response.json();
  //       setHost(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log("Fetch Host failed", error.message);
  //     }
  //   };
  //   if (listing) {
  //     getHost();
  //   }
  // }, [listing]);

  /* BOOKING CALENDAR */
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    // Update the selected date range when the user makes a selection
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24)); // Calculate the difference in days

  /* SUBMIT BOOKING */
  const customerId = useSelector((state) => state?.user?._id);

  const handleSubmit = async () => {
    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing.creator._id,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        totalPrice: listing.price * dayCount,
      };

      const response = await fetch(
        "https://ne-retreats-api.vercel.app/bookings/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingForm), // Convert the data object to a JSON string
        }
      );
      if (response.ok) {
        navigate(`/${customerId}/trips`);
      }
    } catch (err) {
      console.log("Submit Booking failed", err.message);
    }
  };

  // end

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="px-10 py-5">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{listing.title}</h1>
          <div></div>
        </div>

        <div className="flex flex-wrap gap-3 mt-5">
          {listing.listingPhotosPaths?.map((item, index) => (
            <img
              className="w-full sm:w-80"
              key={index}
              src={`https://ne-retreats-api.vercel.app/${item.replace(
                "public",
                ""
              )}`}
              alt="listing"
            />
          ))}
        </div>
        <h2 className="mt-5 text-xl font-semibold">
          {listing.type} in {listing.city}, {listing.state},{listing.country}
        </h2>
        <p className="mt-2 text-lg font-normal">
          {listing.guestCount} guests - {listing.bedroomCount} bedroom -
          {listing.bedCount} bed - {listing.bathroomCount} bath
        </p>
        <hr className="mt-10 h-[1px] bg-[#969393]" />

        <div className="mt-5 flex gap-5 items-center">
          <img
            className="h-10 w-10 rounded-full"
            src={
              listing.creator && listing.creator.profileImagePath
                ? `https://ne-retreats-api.vercel.app/${listing.creator.profileImagePath.replace(
                    "public",
                    ""
                  )}`
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            alt="profile"
          />
          <h3 className="text-xl text-gray-400 font-semibold">
            Hosted by{" "}
            {listing.creator
              ? `${listing.creator.firstName} ${listing.creator.lastName}`
              : "Unknown"}
          </h3>
        </div>
        <hr className="mt-10 h-[2px] bg-[#969393]" />

        <h3 className="mt-5 text-2xl font-semibold">Description</h3>
        <p className="mt-5 text-lg font-normal">{listing.description}</p>
        <hr className="mt-10 h-[2px] bg-[#969393]" />

        <h3 className="mt-5 text-xl font-medium">{listing.highlight}</h3>
        <p className="mt-5 text-lg font-light">{listing.highlightDesc}</p>
        <hr className="mt-10 h-[3px] bg-[#969393]" />

        <div className="flex flex-col md:flex-row  justify-evenly">
          <div>
            <h2 className="mt-5 text-2xl font-semibold">
              What this place offers?
            </h2>
            <div className="mt-5 grid grid-cols-2 lg:grid-cols-3 gap-5">
              {listing.amenities &&
                JSON.parse(listing.amenities).map((amenity, index) => (
                  <div
                    className="flex items-center gap-5 text-xl font-semibold mb-5"
                    key={index}
                  >
                    <div className="text-2xl">
                      {
                        facilities.find((facility) => facility.name === amenity)
                          ?.icon
                      }
                    </div>
                    <p>{amenity}</p>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <h2 className="mt-5 text-2xl font-semibold">
              How long do you want to stay?
            </h2>
            <div className="date-range-calendar mt-5 font-semibold  ">
              <DateRange
                ranges={dateRange}
                onChange={handleSelect}
                className="bg-gray-200 rounded-xl mb-5"
              />
              <div className="items-start">
                {dayCount > 1 ? (
                  <h2 className="mb-2 text-xl">
                    ₹{listing.price} x {dayCount} nights
                  </h2>
                ) : (
                  <h2 className="mb-2 text-xl">
                    ₹{listing.price} x {dayCount} night
                  </h2>
                )}
                <h2 className="mb-2 text-xl font-bold">
                  Total price: ₹{listing.price * dayCount}
                </h2>
                <p className="font-normal">
                  Start Date: {dateRange[0].startDate.toDateString()}
                </p>
                <p className="font-normal">
                  End Date: {dateRange[0].endDate.toDateString()}
                </p>
                <button
                  className="submit_btn w-full lg:w-[200px] "
                  type="submit"
                  onClick={handleSubmit}
                >
                  BOOKING
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListingDetails;
