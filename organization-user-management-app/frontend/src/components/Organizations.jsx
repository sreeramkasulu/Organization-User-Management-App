import { Plus, Eye, Trash2, Filter } from "lucide-react";
import { useState } from "react";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import StatusBadge from "./StatusBadge";

export const StatusConfig = [
  {
    title: "Active",
    bg: "#E7F8E9",
    color: "#12BB23",
  },
  {
    title: "Blocked",
    bg: "#FDEAEA",
    color: "#E92B2B",
  },
  {
    title: "Inactive",
    bg: "#F5F6F7",
    color: "#777777",
  },
];

export default function B2BOrganizationsTable({
  addOrd,
  organizations,
  setOrganizations,
}) {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const navigate = useNavigate();

  const handleView = (org) => {
    navigate(`/${org.id}`);
  };

  const handleDelete = async (org) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${org.name}?`
    );
    if (!confirmDelete) return;

    try {
      setDeleting(org.id);
      await axios.delete(`/org/${org.id}`);

      // Remove deleted org from list
      setOrganizations((prev) => prev.filter((item) => item.id !== org.id));
    } catch (error) {
      console.error("Error deleting organization:", error);
      alert("Failed to delete organization. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="bg-white rounded-md border border-[#DFE2E7]  ">
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 md:px-5 py-3 sm:py-3 md:py-4">
        <h2 className="md:text-xl text-lg font-semibold text-[#232323]">
          B2B organizations
        </h2>

        <button
          onClick={addOrd}
          title="add organization"
          className="flex items-center gap-2 px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-secondary text-white rounded-lg hover:bg-purple-700 transition"
        >
          <Plus className="w-4 h-4" />
          {/* Text hidden on small screens */}
          <span className="hidden sm:inline">Add organization</span>
        </button>
      </div>

      {/* Table using CSS Grid */}
      <div className="w-full overflow-x-scroll">
        {/* Header Row */}
        <div className="grid grid-cols-[80px_minmax(200px,1fr)_minmax(200px,1fr)_minmax(200px,200px)_minmax(120px,120px)] gap-4 border-b border-gray-200 px-3 py-1 bg-[#F5F6F7] min-w-[750px] ">
          <div className="text-sm  text-[#232323] p-3">Sr. No</div>
          <div className="text-sm  text-[#232323] p-3">Organizations</div>
          <div className="text-sm  text-[#232323] p-3">Pending requests</div>
          <div className="flex items-center justify-start gap-2 text-sm  text-[#232323] p-3">
            Status
            <Filter className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-sm  text-[#232323] p-3 bg-[#F5F6F7]">Action</div>
        </div>

        {/* Data Rows */}
        {organizations.map((org) => (
          <div
            key={org.id}
            className="grid grid-cols-[80px_minmax(200px,1fr)_minmax(200px,1fr)_minmax(200px,200px)_minmax(120px,120px)] gap-4 items-center py-3 px-3 border-b border-gray-100 hover:bg-gray-50 transition relative  text-[#232323]"
            onMouseEnter={() => setHoveredRow(org.id)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            {/* Sr. No */}
            <div className="text-sm text-[#232323] px-3">{org.id}</div>

            {/* Organization */}
            <div className="flex items-center gap-3 relative">
              {/* <div
                className={`w-10 h-10 ${org.logoColor} rounded flex items-center justify-center text-white text-xl flex-shrink-0`}
              >
                {org.logo}
              </div> */}
              <Avatar organization={org} />

              <span className="text-sm text-[#232323] px-3">{org.name}</span>

              {/* Tooltip */}
              {org.tooltip && hoveredRow === org.id && (
                <div className="absolute left-16 top-12 bg-purple-600 text-white px-3 py-1.5 rounded text-sm whitespace-nowrap z-10 shadow-lg">
                  {org.tooltip}
                  <div className="absolute -top-1 left-4 w-2 h-2 bg-purple-600 transform rotate-45"></div>
                </div>
              )}
            </div>

            {/* Pending Requests */}
            <div className="text-sm text-[#232323] px-3">
              {org.pendingRequests || 45} pending requests
            </div>

            {/* Status */}
            <div className="flex items-center justify-start gap-2 text-sm ">
              <StatusBadge
                config={StatusConfig}
                title={org.status}
                needPill={true}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 px-3">
              <button
                onClick={() => handleView(org)}
                className="p-1.5 hover:bg-gray-200 rounded transition"
                title="View"
              >
                <Eye className="w-5 h-5 text-[#97A1B2] cursor-pointer" />
              </button>
              <button
                onClick={() => handleDelete(org)}
                disabled={deleting === org.id}
                className="p-1.5 hover:bg-gray-200 rounded transition"
                title="Delete"
              >
                {deleting === org.id ? (
                  <span className="text-sm text-gray-500">...</span>
                ) : (
                  <Trash2 className="w-5 h-5 text-[#97A1B2] cursor-pointer" />
                )}
              </button>
            </div>
          </div>
        ))}

        {organizations.length === 0 && (
          <div className="text-center py-6 text-gray-500 text-sm">
            No organizations found.
          </div>
        )}
      </div>
    </div>
  );
}
