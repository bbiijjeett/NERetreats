import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { facilities, categories, types } from "../data";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const CreateListing = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [amenities, setAmenities] = useState([]);

  const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities((prevAmenities) =>
        prevAmenities.filter((option) => option !== facility)
      );
    } else {
      setAmenities((prev) => [...prev, facility]);
    }
  };

  /* BASIC COUNTS */
  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  /* UPLOAD, REMOVE & DRAG PHOTOS */
  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  /* DESCRIPTION */
  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: 999,
  });

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };

  /* LOCATION */
  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    state: "",
    country: "",
  });

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  };

  const creator = useSelector((state) => state.user._id);

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      /* Create a new FormData object to handle file uploads */
      const formData = new FormData();
      formData.append("creator", creator);
      formData.append("category", category);
      formData.append("type", type);
      formData.append("streetAddress", formLocation.streetAddress);
      formData.append("aptSuite", formLocation.aptSuite);
      formData.append("city", formLocation.city);
      formData.append("state", formLocation.state);
      formData.append("country", formLocation.country);
      formData.append("guestCount", guestCount);
      formData.append("bedroomCount", bedroomCount);
      formData.append("bedCount", bedCount);
      formData.append("bathroomCount", bathroomCount);
      formData.append("amenities", JSON.stringify(amenities));
      formData.append("title", formDescription.title);
      formData.append("description", formDescription.description);
      formData.append("highlight", formDescription.highlight);
      formData.append("highlightDesc", formDescription.highlightDesc);
      formData.append("price", formDescription.price);

      /* Append each selected photo to the FormData object */
      photos.forEach((photo) => {
        formData.append("listingPhotos", photo);
      });

      /* Send a POST request to your server to add the Listing */
      const response = await fetch("http://localhost:3001/properties/create", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.log("Publish Listing failed", error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="px-5 py-20 sm:p-10 bg-[#f7f8f8]">
        <h1 className="font-bold text-3xl text-blue-500">Publish Your Place</h1>
        <form onSubmit={handlePost} noValidate>
          <div className="bg-white mt-10 px-4 sm:px-8 py-5 sm:py-10 rounded-3xl">
            <h2 className="text-[#f8395a] text-2xl font-semibold">
              Step 1: Tell us about your place
            </h2>
            <hr className="py-2" />

            <h3 className="mt-5 mb-5 text-xl font-medium text-gray-500">
              Which of these categories best describes your place?
            </h3>
            <div className="flex flex-wrap gap-5 ">
              {categories?.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col justify-center p-5 h-20 w-28 rounded-xl cursor-pointer items-center border-[1px]  hover:text-[#f8395a]   hover:border-2 hover:border-[#f8395a] transition-all ease-linear duration-200 ${
                    category === item.label
                      ? "border-[#f8395a] bg-pink-100  text-[#f8395a]"
                      : "border-gray-500"
                  } `}
                  onClick={() => {
                    setCategory(item.label);
                  }}
                >
                  <div>{item.icon}</div>
                  <p className="text-center  font-semibold">{item.label}</p>
                </div>
              ))}
            </div>

            <h3 className="mt-5 mb-5 text-xl font-medium text-gray-500">
              What type of place will guests have?
            </h3>
            <div className="flex flex-col gap-5 py-5">
              {types?.map((item, index) => (
                <div
                  className={` ${
                    type === item.name
                      ? "border-[#f8395a] bg-pink-100  text-[#f8395a]"
                      : "border-gray-500"
                  } flex cursor-pointer max-w-[600px] justify-between items-center px-3 py-5 rounded-xl border-[1px]  hover:text-[#f8395a]   hover:border-2 hover:border-[#f8395a] transition-all ease-in-out duration-200`}
                  key={index}
                  onClick={() => {
                    setType(item.name);
                  }}
                >
                  <div className="max-w-[400px]">
                    <h4 className="mb-1 font-semibold">{item.name}</h4>
                    <p className="font-normal">{item.description}</p>
                  </div>
                  <div className="text-5xl">{item.icon}</div>
                </div>
              ))}
            </div>

            <h3 className=" mt-5 mb-5 text-xl font-medium text-gray-500">
              Where's your place located?
            </h3>
            <div className="max-w-[700px]">
              <div className="">
                <p className="font-semibold p-2">Street Address</p>
                <input
                  className="w-full rounded-xl outline-none border-[1px] border-gray-500 px-4 py-4 text-base font-semibold"
                  onChange={handleChangeLocation}
                  placeholder="Street address"
                  name="streetAddress"
                  value={formLocation.streetAddress}
                  required
                />
              </div>
            </div>
            <div className="max-w-[700px] grid grid-cols-2 gap-10 md:flex md:flex-col md:gap-1">
              <div className="">
                <p className="font-semibold p-2">
                  Apartment, Suite, etc. (if applicable)
                </p>
                <input
                  className="w-full rounded-xl outline-none border-[1px] border-gray-500 px-4 py-4 text-base font-semibold"
                  placeholder="Apt, Suite, etc. (if applicable)"
                  onChange={handleChangeLocation}
                  name="aptSuite"
                  value={formLocation.aptSuite}
                />
              </div>
              <div className="">
                <p className="font-semibold p-2">City</p>
                <input
                  className="w-full rounded-xl outline-none border-[1px] border-gray-500 px-4 py-4 text-base font-semibold"
                  placeholder="City"
                  onChange={handleChangeLocation}
                  name="city"
                  value={formLocation.city}
                  required
                />
              </div>
            </div>
            <div className="max-w-[700px] grid grid-cols-2 gap-10 md:flex md:flex-col md:gap-1">
              <div className="">
                <p className="font-semibold p-2">State</p>
                <input
                  className="w-full rounded-xl outline-none border-[1px] border-gray-500 px-4 py-4 text-base font-semibold"
                  placeholder="State"
                  onChange={handleChangeLocation}
                  name="state"
                  value={formLocation.state}
                  required
                />
              </div>
              <div className="">
                <p className="p-2 font-semibold">Country</p>
                <input
                  className="w-full rounded-xl outline-none border-[1px] border-gray-500 px-4 py-4 text-base font-semibold"
                  placeholder="Country"
                  onChange={handleChangeLocation}
                  name="country"
                  value={formLocation.country}
                  required
                />
              </div>
            </div>

            <h3 className="mt-5 mb-5 text-xl font-medium text-gray-500">
              Share some basics about your place
            </h3>
            <div className="flex flex-wrap gap-10">
              <div className="flex items-center rounded-xl gap-8 p-4 border-[1px] border-black">
                <p>Guests</p>
                <div className="flex items-center gap-2 text-xl">
                  <RemoveCircleOutline
                    onClick={() => {
                      guestCount > 1 && setGuestCount(guestCount - 1);
                    }}
                    className="cursor-pointer hover:text-[#f8395a]"
                    // sx={{
                    //   fontSize: "25px",
                    //   cursor: "pointer",
                    //   "&:hover": { color: variables.pinkred },
                    // }}
                  />
                  <p className="font-semibold">{guestCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setGuestCount(guestCount + 1);
                    }}
                    className="cursor-pointer hover:text-[#f8395a]"
                    // sx={{
                    //   fontSize: "25px",
                    //   cursor: "pointer",
                    //   "&:hover": { color: variables.pinkred },
                    // }}
                  />
                </div>
              </div>
              <div className="flex items-center rounded-xl gap-8 p-4 border-[1px] border-black">
                <p>Bedrooms</p>
                <div className="flex items-center gap-2 text-xl">
                  <RemoveCircleOutline
                    onClick={() => {
                      bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
                    }}
                    className="cursor-pointer hover:text-[#f8395a]"
                    // sx={{
                    //   fontSize: "25px",
                    //   cursor: "pointer",
                    //   "&:hover": { color: variables.pinkred },
                    // }}
                  />
                  <p className="font-semibold">{bedroomCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBedroomCount(bedroomCount + 1);
                    }}
                    className="cursor-pointer hover:text-[#f8395a]"
                    // sx={{
                    //   fontSize: "25px",
                    //   cursor: "pointer",
                    //   "&:hover": { color: variables.pinkred },
                    // }}
                  />
                </div>
              </div>
              <div className="flex items-center rounded-xl gap-8 p-4 border-[1px] border-black">
                <p>Beds</p>
                <div className="flex items-center gap-2 text-xl">
                  <RemoveCircleOutline
                    onClick={() => {
                      bedCount > 1 && setBedCount(bedCount - 1);
                    }}
                    className="cursor-pointer hover:text-[#f8395a]"
                    // sx={{
                    //   fontSize: "25px",
                    //   cursor: "pointer",
                    //   "&:hover": { color: variables.pinkred },
                    // }}
                  />
                  <p className="font-semibold">{bedCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBedCount(bedCount + 1);
                    }}
                    className="cursor-pointer hover:text-[#f8395a]"
                    // sx={{
                    //   fontSize: "25px",
                    //   cursor: "pointer",
                    //   "&:hover": { color: variables.pinkred },
                    // }}
                  />
                </div>
              </div>
              <div className="flex items-center rounded-xl gap-8 p-4 border-[1px] border-black">
                <p>Bathrooms</p>
                <div className="flex items-center gap-2 text-xl">
                  <RemoveCircleOutline
                    onClick={() => {
                      bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
                    }}
                    className="cursor-pointer hover:text-[#f8395a]"
                    // sx={{
                    //   fontSize: "25px",
                    //   cursor: "pointer",
                    //   "&:hover": { color: variables.pinkred },
                    // }}
                  />
                  <p className="font-semibold">{bathroomCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBathroomCount(bathroomCount + 1);
                    }}
                    className="cursor-pointer hover:text-[#f8395a]"
                    // sx={{
                    //   fontSize: "25px",
                    //   cursor: "pointer",
                    //   "&:hover": { color: variables.pinkred },
                    // }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white mt-10 px-4 sm:px-8 py-5 sm:py-10 rounded-3xl">
            <h2 className="text-[#f8395a] text-2xl font-semibold">
              Step 2: Make your place stand out
            </h2>
            <hr className="py-2" />

            <h3 className="mt-5 mb-5 text-xl font-medium text-gray-500">
              Tell guests what your place has to offer
            </h3>
            <div className="flex flex-wrap gap-5 ">
              {facilities?.map((item, index) => (
                <div
                  className={`${
                    amenities.includes(item.name)
                      ? "border-[#f8395a] bg-pink-100 text-[#f8395a]"
                      : "border-gray-500"
                  } flex flex-col justify-center p-5 h-26 w-36 rounded-xl cursor-pointer items-center border-[1px]  hover:text-[#f8395a]   hover:border-2 hover:border-[#f8395a] transition-all ease-linear duration-200`}
                  key={index}
                  onClick={() => handleSelectAmenities(item.name)}
                >
                  <div>{item.icon}</div>
                  <p className="text-center  font-semibold">{item.name}</p>
                </div>
              ))}
            </div>

            <h3 className="mt-5 mb-5 text-xl font-medium text-gray-500">
              Add some photos of your place
            </h3>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="flex flex-wrap gap-5"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length >= 1 && (
                      <>
                        {photos.map((photo, index) => {
                          return (
                            <Draggable
                              key={index}
                              draggableId={index.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="photo relative w-[250px] h-[150px] cursor-move"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <img
                                    className="w-full h-full"
                                    src={URL.createObjectURL(photo)}
                                    alt="place"
                                  />
                                  <button
                                    className="absolute text-xl p-2 top-0 right-0 border-none cursor-pointer bg-[#ffffffcc] hover:bg-[#f8395a]"
                                    type="button"
                                    onClick={() => handleRemovePhoto(index)}
                                  >
                                    <BiTrash />
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        <input
                          type="file"
                          id="image"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label
                          htmlFor="image"
                          className="border-2 w-[250px] h-[150px] flex flex-col justify-center items-center cursor-pointer border-dashed border-gray-500 rounded-xl px-5 py-10"
                        >
                          <div className="text-6xl ">
                            <IoIosImages />
                          </div>
                          <p className="font-semibold text-center">
                            Upload from your device
                          </p>
                        </label>
                      </>
                    )}
                    {photos.length < 1 && (
                      <>
                        <input
                          type="file"
                          id="image"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label
                          htmlFor="image"
                          className="border-2 w-[250px] h-[150px] flex flex-col justify-center items-center cursor-pointer border-dashed border-gray-500 rounded-xl px-5 py-10"
                        >
                          <div className="text-6xl">
                            <IoIosImages />
                          </div>
                          <p className="font-semibold text-center">
                            Upload from your device
                          </p>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <h3 className="mt-5 mb-5 text-xl font-medium text-gray-500">
              What make your place attractive and exciting?
            </h3>
            <div className="">
              <p className="font-bold mt-5 mb-2.5">Title</p>
              <input
                className="px-[30px] py-[15px] border-[1px] border-gray-500 rounded-xl text-base font-semibold w-[280px] sm:w-[350px] md:w-[450] lg:w-[600px] outline-none"
                placeholder="Title"
                onChange={handleChangeDescription}
                name="title"
                value={formDescription.title}
                required
              />
              <p className="font-bold mt-5 mb-2.5">Description</p>
              <textarea
                className="px-[30px] py-[15px] border-[1px] border-gray-500 rounded-xl text-base font-semibold w-[280px] sm:w-[350px] md:w-[450] lg:w-[600px] outline-none"
                placeholder="Description"
                onChange={handleChangeDescription}
                name="description"
                value={formDescription.description}
                required
              />
              <p className="font-bold mt-5 mb-2.5">Highlight</p>
              <input
                className="px-[30px] py-[15px] border-[1px] border-gray-500 rounded-xl text-base font-semibold w-[280px] sm:w-[350px] md:w-[450] lg:w-[600px] outline-none"
                placeholder="Highlight"
                onChange={handleChangeDescription}
                name="highlight"
                value={formDescription.highlight}
                required
              />
              <p className="font-bold mt-5 mb-2.5">Highlight details</p>
              <textarea
                className="px-[30px] py-[15px] border-[1px] border-gray-500 rounded-xl text-base font-semibold w-[280px] sm:w-[350px] md:w-[450] lg:w-[600px] outline-none"
                placeholder="Highlight details"
                onChange={handleChangeDescription}
                name="highlightDesc"
                value={formDescription.highlightDesc}
                required
              />
              <p className="font-bold mt-5 mb-2.5">Now, set your PRICE</p>
              <span className="text-2xl font-bold mr-5">₹</span>
              <input
                className="px-[10px] py-[15px] border-[1px] border-gray-500 rounded-xl text-xl font-semibold w-[120px] outline-none"
                type="number"
                placeholder="999"
                onChange={handleChangeDescription}
                name="price"
                value={formDescription.price}
                required
              />
            </div>
          </div>
          <button className="submit_btn" type="submit">
            CREATE YOUR LISTING
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateListing;
