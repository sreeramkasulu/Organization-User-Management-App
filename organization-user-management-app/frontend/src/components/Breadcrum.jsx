import { Home, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Breadcrumb({ items = [] }) {
  const navigate = useNavigate();
  const handleClick = (link, e) => {
    if (link) {
      e.preventDefault();
      navigate(link);
    }
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 py-7">
      {/* Home Icon */}
      <button
        onClick={(e) => handleClick(items[0]?.link || "/", e)}
        className="hover:text-gray-900 transition"
      >
        <Home className="w-5 h-5" />
      </button>

      {/* Breadcrumb Items */}
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-1 ">
          <ChevronRight className="w-6 h-6 text-[#777777]" />
          {item.link ? (
            <button
              onClick={(e) => handleClick(item.link, e)}
              className="hover:text-gray-900 transition cursor-pointer"
            >
              {item.title}
            </button>
          ) : (
            <span className="text-[#777777]">{item.title}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

// Example usage:
function App() {
  const breadcrumbItems = [
    { title: "Dashboard", link: "/dashboard" },
    { title: "Manage B2B organizations", link: null }, // null = current page (no link)
  ];

  return (
    <div className="p-8">
      <Breadcrumb items={breadcrumbItems} />

      {/* More examples */}
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-bold mb-4">More Examples:</h3>

        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-600 mb-2">Single item:</p>
            <Breadcrumb items={[{ title: "Settings", link: null }]} />
          </div>

          <div>
            <p className="text-xs text-gray-600 mb-2">Multiple items:</p>
            <Breadcrumb
              items={[
                { title: "Products", link: "/products" },
                { title: "Electronics", link: "/products/electronics" },
                { title: "Laptops", link: null },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
