import { useState } from "react";
import { FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseLargeFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`h-screen bg-gray-800 text-white transition-all ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <Link to={"/"} className="text-lg font-bold">
          logo
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none cursor-pointer "
        >
          {isOpen ? <RiCloseLargeFill /> : <GiHamburgerMenu />}
        </button>
      </div>
      <nav className="mt-4">
        <ul>
          <li className="p-4 hover:bg-gray-700 flex items-center space-x-2">
            <FiHome />
            {isOpen && <span>Dashboard</span>}
          </li>
          <li className="p-4 hover:bg-gray-700 flex items-center space-x-2">
            <Link to={"/add"} className="flex space-x-2">
              <FiUser />
              {isOpen && <span>Add</span>}
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700 flex items-center space-x-2">
            <FiSettings />
            {isOpen && <span>Settings</span>}
          </li>
          <li className="p-4 hover:bg-gray-700 flex items-center space-x-2 text-red-400">
            <FiLogOut />
            {isOpen && <span>Logout</span>}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
