import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 flex justify-around items-center px-5 h-16 text-white text-[19px] ">
      <div className="font-bold">
        <span className="text-green-500 font-bold">&lt;</span>
        Pass
        <span className="text-green-500 font-bold">OP/&gt;</span>
      </div>
      {/* <ul>
        <li className="flex gap-6">
          <a href="/home" className="hover:font-bold">Home</a>
          <a href="/home" className="hover:font-bold">About</a>
          <a href="/home" className="hover:font-bold">Contact</a>
        </li>
      </ul> */}
      <button onClick="location.href='https://github.com/m-tayyab-saleem''"  className="font-bold text-sm bg-green-500 rounded-full py-1 px-4 hover:bg-green-400 border-green-900 border ring-white ring-1"><a href="https://github.com/m-tayyab-saleem">
      <i className="fa-brands fa-github mr-2"></i>
      <span >GitHub</span>
      </a></button>
    </nav>
  );
};

export default Navbar;
