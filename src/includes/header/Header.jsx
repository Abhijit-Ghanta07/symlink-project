import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between bg-white shadow-md p-4 relative">
      {/* Logo Section */}
      <Link to={"/"} className="text-xl font-bold text-gray-800">
        Logo
      </Link>

      {/* User Info Section */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center space-x-2"
        >
          <span className="text-gray-700">John Doe</span>
          <img alt="User Avatar" className="w-10 h-10 rounded-full border" />
        </button>

        {/* Menu */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 shadow-lg rounded-lg text-left z-10">
            <button className="block w-full px-4 py-2 text-sm hover:bg-gray-200">
              Profile
            </button>
            <button className="block w-full px-4 py-2 text-sm hover:bg-gray-200">
              Settings
            </button>
            <button className="block w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-200">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
