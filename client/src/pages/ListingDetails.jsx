import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { facilities } from "../data";
import Loader from "../components/Loader";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { setWishList } from "../redux/state";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ListingDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
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
    } catch (error) {
      console.log("Fetch Listing failed", error.message);
    }
  };

  useEffect(() => {
    getListing();
  }, []);

  useEffect(() => {
    const getHost = async () => {
      const hostId = listing.creator;
      console.log(hostId);
      try {
        const response = await fetch(
          `https://ne-retreats-api.vercel.app/users/${hostId}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setHost(data);
        setLoading(false);
      } catch (error) {
        console.log("Fetch Host failed", error.message);
      }
    };
    if (listing) {
      getHost();
    }
  }, [listing]);

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
              className="max-w-[300px]"
              key={index}
              src={`http://localhost:3001/${item.replace("public", "")}`}
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
        <hr className="mt-10 " />

        <div className="mt-5 flex gap-5 items-center">
          {host !== null ? (
            <div>
              {/* <img
                className="h-10 w-10 rounded-full"
                src={`http://localhost:3001/${host.profileImagePath.replace(
                  "public",
                  ""
                )}`}
                alt="profile"
              /> */}
              <h3 className="text-xl text-gray-400 font-semibold">
                Hosted by {host.firstName} {host.lastName}
              </h3>
            </div>
          ) : (
            <div>Loading</div>
          )}
        </div>
        <hr className="mt-5" />
        <h3 className="mt-5 text-2xl font-semibold">Description</h3>
        <p className="mt-5 text-lg font-normal">{listing.description}</p>
        <hr className="mt-10 " />
        <h3 className="mt-5 text-xl font-medium">{listing.highlight}</h3>
        <p className="mt-5 text-lg font-light">{listing.highlightDesc}</p>
        <hr className="mt-10 " />
        <div className="flex flex-row lg:flex-col justify-between">
          <div>
            <h2 className="mt-5 text-2xl font-semibold">
              What this place offers?
            </h2>
            <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-5">
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
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListingDetails;
