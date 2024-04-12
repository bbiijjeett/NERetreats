import React, { useState } from "react";
import { setWishList } from "../redux/state";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Favorite,
  ArrowForwardIos,
  ArrowBackIosNew,
} from "@mui/icons-material";
import "../styles/ListingCard.scss";
import "../styles/variables.scss";

const ListingCard = ({
  listingId,
  creator,
  listingPhotosPaths,
  city,
  state,
  country,
  category,
  type,
  price,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* SLIDER FOR IMAGES */
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotosPaths.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotosPaths.length) % listingPhotosPaths.length
    );
  };

  return (
    <div className="listing-card">
      <div className="slider-container">
        <div className="slider">
          {listingPhotosPaths?.map((photo, index) => (
            <div key={index} className="slide">
              <img
                src={`http://localhost:3001/${photo?.replace("public", "")}`}
                alt={`photo ${index + 1}`}
              />
              <div
                className="prev-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide(e);
                }}
              >
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div
                className="next-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide(e);
                }}
              >
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
