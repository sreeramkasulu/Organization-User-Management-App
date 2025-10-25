import React, { useState, useRef } from "react";
import { Pencil } from "lucide-react";
import axios from "../config/axios";

const Avatar = ({ organization, onImageUpdate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      setIsUploading(true);
      const res = await axios.patch(`/org/image/${organization.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (onImageUpdate) onImageUpdate(res.data.imageUrl);
      setShowModal(false);
      setSelectedFile(null);
      setPreview(null);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("❌ Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  // Determine if avatar is editable
  const isEditable = typeof onImageUpdate === "function";

  return (
    <>
      {/* Avatar Box */}
      <div
        className={`relative flex items-center justify-center font-bold text-white overflow-hidden
          ${
            isEditable
              ? "w-32 h-32 rounded-md text-7xl"
              : "w-10 h-10 rounded-md text-lg"
          }
          bg-secondary
          cursor-${isEditable ? "pointer" : "default"}`}
        onMouseEnter={() => isEditable && setIsHovered(true)}
        onMouseLeave={() => isEditable && setIsHovered(false)}
      >
        {/* Display image or first char */}
        {organization.image ? (
          <img
            src={organization.image}
            alt={organization.name}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="flex items-center justify-center h-full w-full leading-none">
            {organization.name.charAt(0).toUpperCase()}
          </span>
        )}

        {/* Hover Overlay */}
        {isEditable && isHovered && (
          <div
            onClick={() => setShowModal(true)}
            className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all"
          >
            <div className="w-11 h-11 rounded-md bg-[#F0EBFF] flex items-center justify-center ">
              <Pencil className="w-5 h-5 text-secondary" />
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isEditable && showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 animate-fadeIn">
            {/* --- Body --- */}
            <div className="px-6 py-5">
              <label className="block text-sm font-medium text-gray-600 mb-3">
                Choose an image
              </label>

              {/* Hidden native input */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                id="org-image-upload"
              />

              {/* Custom styled button */}
              <label
                htmlFor="org-image-upload"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-50 text-gray-700 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M3 12l4.5-4.5M3 12l4.5 4.5M3 12h18"
                  />
                </svg>
                <span>Choose a file</span>
              </label>

              {/* Optional filename display */}
              {selectedFile && (
                <p className="text-sm text-gray-600 mt-2 truncate">
                  Selected:{" "}
                  <span className="font-medium">{selectedFile.name}</span>
                </p>
              )}

              {/* Preview */}
              {preview && (
                <div className="mt-5">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border border-gray-200 shadow-sm"
                  />
                </div>
              )}
            </div>

            {/* --- Footer --- */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedFile(null);
                  setPreview(null);
                }}
                className="px-4 py-2 rounded-lg text-gray-700 bg-white border border-gray-200 hover:bg-gray-100 transition font-medium"
              >
                Cancel
              </button>

              <button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className={`px-4 py-2 rounded-lg font-medium text-white transition ${
                  isUploading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Avatar;
