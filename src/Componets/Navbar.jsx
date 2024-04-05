import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white ">
      <div className="mycontainer flex justify-around items-center py-5 px-4 h-14">
        <div className="logo font-bold text-white text-2xl">
          {" "}
          <span className="text-green-700">&lt;</span>
          Nickshay <span className="text-green-700">OP/&gt;</span>
        </div>

        {/*  <ul>
          <li className="flex gap-4">
            <a className="hover:font-bold text-white" href="/">
              Home
            </a>
            <a className="hover:font-bold  text-white" href="#">
              About
            </a>
            <a className="hover:font-bold  text-white" href="#">
              Contact
            </a>
          </li>
        </ul>*/}
        <button className="text-white bg-green-700 my-8 rounded-full flex justify-between items-center">
          <img
            className="invert  w-9 p-0 m-1.60 "
            src="/images/github.png"
            alt="github logo"
          />
          <a href="https://github.com/nickshay27">
            <span className="font-bold px-2"> GitHub</span>
          </a>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
