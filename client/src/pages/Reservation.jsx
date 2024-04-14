import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import ListingCard from "../components/ListingCard";
import { useDispatch, useSelector } from "react-redux";
import { setReservationList } from "../redux/state";

const Reservation = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const reservationList = useSelector((state) => state.user.reservationList);

  const getReservations = async () => {
    try {
      const response = await fetch(
        `https://ne-retreats-api.vercel.app/users/${userId}/reservations`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setReservationList(data));
      setLoading(false);
    } catch (error) {
      console.log("Fetch all reservations failed", error.message);
    }
  };

  useEffect(() => {
    getReservations();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="px-10 md:px-32 py-10 text-4xl font-semibold text-[#24355a]">
        Your Reservation List
      </h1>
      <div className="flex flex-wrap justify-center gap-5 py-5 px-5">
        {reservationList?.map(
          ({
            listingId,
            hostId,
            startDate,
            endDate,
            totalPrice,
            booking = true,
          }) => (
            <ListingCard
              key={listingId._id}
              creator={hostId._id}
              listingId={listingId._id}
              listingPhotosPaths={listingId.listingPhotosPaths}
              city={listingId.city}
              state={listingId.state}
              country={listingId.country}
              category={listingId.category}
              totalPrice={totalPrice}
              startDate={startDate}
              endDate={endDate}
              booking={booking}
            />
          )
        )}
      </div>
      <Footer />
    </>
  );
};

export default Reservation;
