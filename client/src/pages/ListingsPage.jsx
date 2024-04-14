import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ListingCard from "../components/ListingCard";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setListings } from "../redux/state";

const ListingsPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const { category } = useParams();
  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        `https://ne-retreats-api.vercel.app/properties?category=${category}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();

      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (error) {
      console.log("Fetch Listings failed", error.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [category]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="px-10 md:px-32 py-10 text-4xl font-semibold text-[#24355a]">
        {category}
      </h1>
      <div className="flex flex-wrap justify-center gap-5 py-5 px-5">
        {listings?.map(
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

export default ListingsPage;
