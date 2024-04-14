import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { setListings } from "../redux/state";
import ListingCard from "./ListingCard";
import { categories } from "../data";
import { useDispatch, useSelector } from "react-redux";

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const listings = useSelector((state) => state.listings);

  const getFeedListings = async (state) => {
    try {
      const response = await fetch(
        selectedCategory !== "" && selectedCategory !== "All"
          ? `http://localhost:3001/properties?category=${selectedCategory}`
          : "http://localhost:3001/properties",
        {
          method: "GET",
        }
      );

      const data = await response.json();

      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (error) {
      console.log("Fetching Listings failed", error.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);

  return (
    <>
      <div className="flex justify-center flex-wrap px-5 md:px-32 py-10 gap-5">
        {categories?.map((category, index) => (
          <div
            key={index}
            className={`flex h-20 w-20 p-2  border-[1px]  hover:border-[#f8395a]  rounded-xl flex-col justify-center items-center cursor-pointer hover:text-[#f8395a]  ${
              category.label === selectedCategory
                ? "text-[#f8395a] border-[#f8395a]"
                : "border-black"
            }`}
            onClick={() => setSelectedCategory(category.label)}
          >
            <div className="text-3xl">{category.icon}</div>
            <p className="text-xs font-semibold text-center">
              {category.label}
            </p>
          </div>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-wrap justify-center px-5 py-5 gap-5">
          {listings.map(
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
                listingId={_id}
                creator={creator}
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
      )}
    </>
  );
};

export default Listings;
