import { Headphones, Bell, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white sticky top-0  z-10 border-b border-gray-200 ">
      <div className="">
        <div className="flex items-center justify-between w-full px-8 py-4 bg-white shadow-[0_4px_8px_rgba(54,93,226,0.08)] backdrop-blur-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center space-x-8 gap-0.5">
            <div className="border-2 border-black px-3 py-1 mx-auto">
              <span className="font-bold text-sm">LOGO</span>
            </div>
            <p className="text-center text-[5px] w-full font-bold leading-1">
              ESTD <br /> 2025
            </p>
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <Headphones className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <Bell className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 bg-[#F0EBFF] rounded-full transition cursor-pointer">
              <User className="w-5 h-5 text-secondary" />
            </button>
          </div>
        </div>
        {/* Navigation tabs */}
        <div className="flex items-center space-x-8 mt-6 w-full md:px-[70px] px-4 py-2` bg-white shadow-[0_4px_8px_rgba(54,93,226,0.08)] backdrop-blur-2xl">
          <button className="text-[#777777] text-[14px] hover:text-gray-900 pb-3 transition cursor-pointer">
            Dashboard
          </button>
          <button className="text-secondary text-[14px] border-b-2 border-secondary pb-3 font-semibold cursor-pointer">
            Manage B2B organizations
          </button>
        </div>
      </div>
    </nav>
  );
}
