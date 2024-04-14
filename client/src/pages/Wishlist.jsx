import React from "react";
import ListingCard from "../components/ListingCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

const Wishlist = () => {
  const wishList = useSelector((state) => state.user.wishList);
  return (
    <>
      <Navbar />
      <h1 className="px-10 md:px-32 py-10 text-4xl font-semibold text-[#24355a]">
        Your Wish List
      </h1>
      <div className="flex flex-wrap justify-center gap-5 py-5 px-5">
        {wishList?.map(
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

export default Wishlist;
