import React from "react";

const Loader = () => {
  return (
    <div className="flex  justify-center items-center h-screen">
      <div className="w-10 h-10 rounded-full border-t-[#f8395a] border-[6px] border-solid border-[#f3f3f3] animate-spin"></div>
    </div>
  );
};

export default Loader;
