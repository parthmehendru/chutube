import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  if (!isMenuOpen) {
    return null; // Don't render anything if the menu is closed
  }

  return (
    <div
      style={{ height: 'calc(100vh - 4rem)' }}
      className="py-5 shadow-md w-48 border border-gray-200 fixed top-16 left-0 z-10"
    >
      <ul className="my-2">

        <li className="py-2 px-4 flex gap-3 hover:bg-slate-200 items-center cursor-pointer">
          <Link to="/"><i className="fa-solid fa-house"></i></Link>
          <Link to="/"><span>Home</span></Link>
        </li>
        <li className="py-2 px-4 flex gap-3 hover:bg-slate-200 items-center cursor-pointer">
          <i className="fa-solid fa-video"></i>
          <span>Shorts</span>
        </li>
        <li className="py-2 px-4 flex gap-3 hover:bg-slate-200 items-center cursor-pointer">
          <i className="fa-brands fa-youtube"></i>
          <span>Videos</span>
        </li>
        <li className="py-2 px-4 flex gap-3 hover:bg-slate-200 items-center cursor-pointer">
          <i className="fa-solid fa-money-bill-wheat"></i>
          <span>Live</span>
        </li>
      </ul>
      <h1 className="text-xl text-center mt-5 font-semibold">Subscriptions</h1>
      <ul>
        <li className="py-2 px-4 flex gap-3 hover:bg-slate-200 items-center cursor-pointer">
          <i className="fa-solid fa-music"></i>
          <span>Music</span>
        </li>
        <li className="py-2 px-4 flex gap-3 hover:bg-slate-200 items-center cursor-pointer">
          <i className="fa-solid fa-baseball-bat-ball"></i>
          <span>Sports</span>
        </li>
        <li className="py-2 px-4 flex gap-3 hover:bg-slate-200 items-center cursor-pointer">
          <i className="fa-solid fa-headset"></i>
          <span>Gaming</span>
        </li>
        <li className="py-2 px-4 flex gap-3 hover:bg-slate-200 items-center cursor-pointer">
          <i className="fa-solid fa-film"></i>
          <span>Movies</span>
        </li>
      </ul>
      <h1 className="text-xl text-center mt-5 font-semibold">Watch Later</h1>
      <ul>
        <li className="py-2 px-4 flex gap-3 hover:bg-slate-200 items-center cursor-pointer">
          <i className="fa-solid fa-music"></i>
          <span>Music</span>
        </li>
        <li className="py-2 px-4 flex gap-3 hover:bg-slate-200 items-center cursor-pointer">
          <i className="fa-solid fa-baseball-bat-ball"></i>
          <span>Sports</span>
        </li>
        <li className="py-2 px-4 flex gap-3 hover:bg-slate-200 items-center cursor-pointer">
          <i className="fa-solid fa-headset"></i>
          <span>Gaming</span>
        </li>
        <li className="py-2 px-4 flex gap-3 hover:bg-slate-200 items-center cursor-pointer">
          <i className="fa-solid fa-film"></i>
          <span>Movies</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
