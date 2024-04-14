import React, { useState, useEffect } from "react";
import ListingCard from "../components/ListingCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setPropertyList } from "../redux/state";

const Property = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const propertyList = user?.propertyList || [];

  const getProperties = async () => {
    try {
      const response = await fetch(
        `https://ne-retreats-api.vercel.app/users/${user._id}/properties`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setPropertyList(data));
      setLoading(false);
    } catch (error) {
      console.log("Fetch all reservationd failed", error.message);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="px-10 md:px-32 py-10 text-4xl font-semibold text-[#24355a]">
        Your Property List
      </h1>
      <div className="flex flex-wrap justify-center gap-5 py-5 px-5">
        {propertyList?.map(
          ({
            _id,
            creator,
            listingPhotosPaths,
            city,
            state,
            country,
            category,
            type,
            price,
            booking = false,
          }) => (
            <ListingCard
              key={_id}
              creator={creator}
              listingId={_id}
              listingPhotosPaths={listingPhotosPaths}
              city={city}
              state={state}
              country={country}
              category={category}
              type={type}
              price={price}
              booking={booking}
            />
          )
        )}
      </div>
      <Footer />
    </>
  );
};

export default Property;
