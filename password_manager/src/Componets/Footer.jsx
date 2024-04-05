import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-800 text-white flex flex-col justify-center items-center  bottom-0 w-full">
      <div className="logo font-bold text-white text-2xl ">
        <span className="text-green-700">&lt;</span>
        Nickshay <span className="text-green-700">OP/&gt;</span>
      </div>
      <div className="flex justify-center items-center">
        Created with{" "}
        <img src="/images/heart.png" alt="" className="w-6 mx-2 " /> by Nickshay
        Chouhan
      </div>
    </div>
  );
};

export default Footer;
