"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={headerRef} className="bg-yellow-400 px-4 py-3">
      {/* Top Section */}
      <div className="flex justify-between items-center">
        {/* Branding */}
        <div>
          <p className="text-black text-sm">Fulltoss</p>
          <p className="text-black text-2xl font-bold">10 minutes</p>
        </div>

        {/* Profile Icon */}
        <div className="relative">
          <div
            className="w-8 h-8 bg-white rounded-full flex justify-center items-center shadow cursor-pointer"
            onClick={toggleDropdown}
          >
            <FaUserAlt className="text-black" aria-label="User Profile" />
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-0 w-36 bg-white shadow-lg rounded-lg text-sm text-gray-700 z-50 opacity-90"
            >
              <ul>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Profile
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => router.push("/cart")}
                >
                  My Cart
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => router.push(`/tickets/${1}`)}
                >
                  My Tickets
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Subheading */}
      <div className="mt-2 text-sm text-black">
        HOME -{" "}
        <span className="font-semibold">
          Divya Kumar, Near Panchvati Jajmau
        </span>
      </div>

      {/* Search Bar */}
      <div className="mt-3">
        <div className="flex items-center bg-white rounded-full shadow px-3 py-1">
          <CiSearch className="text-gray-700" aria-label="Search Icon" />
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 flex-grow bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400"
            aria-label="Search"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
