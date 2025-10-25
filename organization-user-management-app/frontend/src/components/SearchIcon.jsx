import { Search, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const SearchIcon = ({ fetchOrganizations }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleClick = () => {
    if (isOpen) {
      // Search and close
      fetchOrganizations(searchTerm);
      setIsOpen(false);
      setSearchTerm("");
    } else if (isOpen) {
      // Just close if empty
      setIsOpen(false);
      setSearchTerm("");
    } else {
      // Open search box
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      fetchOrganizations(searchTerm);
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  return (
    <div className="absolute top-5 md:right-15 right-3 flex items-center">
      {/* Search Input */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "w-64 opacity-100 mr-2" : "w-0 opacity-0"
        }`}
      >
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search organizations..."
            className="w-full h-8 px-3 pr-8 rounded-md bg-[#F0EBFF] text-secondary placeholder-secondary/50 focus:outline-none  text-sm"
          />
          {isOpen && (
            <button
              onClick={handleClose}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-secondary/60 hover:text-secondary transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Search Icon Button */}
      <button
        onClick={handleClick}
        className="bg-[#F0EBFF] w-8 h-8 rounded-md flex items-center justify-center hover:bg-[#E5DEFF] transition-colors"
      >
        <Search className="w-3 h-3 text-secondary font-extrabold" />
      </button>
    </div>
  );
};

export default SearchIcon;
