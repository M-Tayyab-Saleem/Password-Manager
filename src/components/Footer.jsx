import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-800 text-white bottom-0 w-full flex flex-col items-center justify-center">
      <div className="font-bold mt-2">
        <span className="text-green-500 font-bold">&lt;</span>
        Pass
        <span className="text-green-500 font-bold">OP/&gt;</span>
      </div>
      <div>
        Created With
        <i className="fa-solid fa-heart text-red-600 mx-2 my-3 "></i>
        By M Tayyab Saleem
      </div>
    </div>
  );
};

export default Footer;
