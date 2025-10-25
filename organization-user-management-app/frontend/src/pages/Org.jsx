import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrum";
import React, { useState, useEffect } from "react";
import { Edit2, Mail, Phone, Users, ChevronDown, Globe } from "lucide-react";
import axios from "../config/axios";
import EditOrg from "../components/EditOrg";
import UserTab from "../components/UserTab";
import Avatar from "../components/Avatar";
import StatusBadge from "../components/StatusBadge";
import { StatusConfig } from "../components/Organizations";
import Loader from "../components/Loader";

const OrganizationProfile = () => {
  const { id } = useParams();
  const breadcrumbItems = [
    { title: "Manage B2B organizations", link: "/" },
    { title: "Organization details", link: `/${id}` },
  ];
  const [activeTab, setActiveTab] = useState("basic");
  const [isEditing, setIsEditing] = useState(false);
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIssubmitting] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [formData, setFormData] = useState({
    adminName: "",
    supportEmail: "",
    alternativePhone: "",
    maxCoordinators: 5,
    timezone: "",
    region: "",
    language: "",
    websiteURL: "",
  });

  const [errors, setErrors] = useState([]);
  useEffect(() => {
    fetchOrganization();
  }, [id]);

  const fetchOrganization = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/org/${id}`);
      if (data?.organization) {
        setOrganization(data.organization);
        setFormData({
          adminName: data.organization.adminName || "",
          supportEmail: data.organization.supportEmail || "",
          alternativePhone: data.organization.alternativePhone || "",
          maxCoordinators: data.organization.maxCoordinators || 5,
          timezone: data.organization.timezone || "",
          region: data.organization.region || "",
          language: data.organization.language || "",
          websiteURL: data.organization.websiteURL || "",
        });
      }
    } catch (error) {
      console.error("Error fetching organization:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = [];

    // Validate adminName (if provided)
    if (formData.adminName && formData.adminName.trim().length < 2) {
      newErrors.push({
        field: "adminName",
        message: "Admin name must be at least 2 characters long",
      });
    }

    // Validate supportEmail (if provided)
    if (formData.supportEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.supportEmail)) {
        newErrors.push({
          field: "supportEmail",
          message: "Please enter a valid email address",
        });
      }
    }

    // Validate alternativePhone (if provided)
    if (formData.alternativePhone) {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(formData.alternativePhone.replace(/[\s-]/g, ""))) {
        newErrors.push({
          field: "alternativePhone",
          message: "Please enter a valid 10-digit phone number",
        });
      }
    }

    // Validate maxCoordinators
    if (formData.maxCoordinators < 1) {
      newErrors.push({
        field: "maxCoordinators",
        message: "Maximum coordinators must be at least 1",
      });
    }

    // Validate websiteURL (if provided)
    if (formData.websiteURL) {
      try {
        new URL(formData.websiteURL);
        if (
          !formData.websiteURL.startsWith("http://") &&
          !formData.websiteURL.startsWith("https://")
        ) {
          newErrors.push({
            field: "websiteURL",
            message: "Website URL must start with http:// or https://",
          });
        }
      } catch {
        newErrors.push({
          field: "websiteURL",
          message: "Please enter a valid URL",
        });
      }
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async () => {
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    try {
      // Filter out empty fields
      setIssubmitting(true);
      const updateData = Object.entries(formData).reduce(
        (acc, [key, value]) => {
          if (value !== "" && value !== null && value !== undefined) {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );

      const { data } = await axios.patch(`/org/${id}`, updateData);
      if (data?.organization) {
        setOrganization(data.organization);
        setIsEditing(false);
        setErrors([]);
      }
    } catch (error) {
      console.error("Error updating organization:", error);
      // Handle API errors
      if (error.response?.data?.message) {
        setErrors([
          {
            field: "general",
            message: error.response.data.message,
          },
        ]);
      } else {
        setErrors([
          {
            field: "general",
            message: "Failed to update organization. Please try again.",
          },
        ]);
      }
    } finally {
      setIssubmitting(false);
    }
  };
  const getFieldError = (fieldName) => {
    const error = errors.find((err) => err.field === fieldName);
    return error?.message;
  };

  // Helper function to check if a field has an error
  const hasFieldError = (fieldName) => {
    return errors.some((err) => err.field === fieldName);
  };
  const handleCancel = () => {
    setFormData({
      adminName: organization.adminName || "",
      supportEmail: organization.supportEmail || "",
      alternativePhone: organization.alternativePhone || "",
      maxCoordinators: organization.maxCoordinators || 5,
      timezone: organization.timezone || "",
      region: organization.region || "",
      language: organization.language || "",
      websiteURL: organization.websiteURL || "",
    });
    setIsEditing(false);
  };
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const handleStatusChange = async (newStatus) => {
    try {
      setIsUpdatingStatus(true);
      setShowStatusDropdown(false);
      const { data } = await axios.patch(`/org/status/${id}`, {
        status: newStatus,
      });
      setOrganization((prev) => ({
        ...prev,
        status: newStatus,
      }));
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Inactive":
        return "bg-yellow-100 text-yellow-700";
      case "Blocked":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="w-full md:px-10 px-3 mx-auto relative">
          <Breadcrumb items={breadcrumbItems} />
          <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
            <Loader />
            <div className="text-gray-600 text-3xl font-semibold">
              Loading...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div>
        <Navbar />
        <div className="w-full md:px-10 px-3 mx-auto relative">
          <Breadcrumb items={breadcrumbItems} />
          <div className="h-72 bg-gray-50 flex items-center justify-center">
            <div className="text-red-600">Organization not found</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <div className="w-full md:px-10 px-3 mx-auto relative">
        <Breadcrumb items={breadcrumbItems} />
        <div className="">
          {/* Header Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-start justify-between ">
              <div className="flex md:flex-row flex-col gap-6 h-full ">
                <Avatar
                  organization={organization}
                  onImageUpdate={(url) =>
                    setOrganization((prev) => ({ ...prev, image: url }))
                  }
                />
                <div className="flex flex-col flex-1  justify-between">
                  <h1 className="text-3xl leading-8 font-semibold text-gray-900 break-all">
                    {organization.name}
                  </h1>

                  <div className="flex flex-col mt-5 md:mt-0 gap-2 text-[14px] text-[#777777]">
                    <span className="flex items-center  gap-2 break-all">
                      <Mail className="w-4 h-4" />
                      {organization.email}
                    </span>
                    <span className="flex items-center gap-2 break-all">
                      <Phone className="w-4 h-4" />
                      {organization.contact}
                    </span>
                    <span
                      className="flex items-center gap-2 cursor-pointer line-clamp-2 break-all"
                      onClick={() => {
                        window.open(organization.websiteURL);
                      }}
                    >
                      <Globe className={`w-4 h-4`} />
                      <span
                        className={` ${
                          organization.websiteURL ? "text-secondary" : ""
                        }`}
                      >
                        {organization.websiteURL || "N/A"}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 relative">
                <StatusBadge
                  config={StatusConfig}
                  title={organization.status}
                  needPill={true}
                />
                <button
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className="text-[#6834FF] hover:bg-blue-50 px-3 py-1 rounded-lg cursor-pointer text-[12px] "
                >
                  {isUpdatingStatus ? "Updating..." : "Change status"}
                  {/* <ChevronDown className="w-4 h-4" /> */}
                </button>

                {showStatusDropdown && (
                  <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[140px]">
                    <button
                      onClick={() => handleStatusChange("Active")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm"
                    >
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      Active
                    </button>
                    <button
                      onClick={() => handleStatusChange("Inactive")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm"
                    >
                      <span className="w-2 h-2 rounded-full bg-stone-500"></span>
                      Inactive
                    </button>
                    <button
                      onClick={() => handleStatusChange("Blocked")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm"
                    >
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      Blocked
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className=" ">
            <div className=" mb-7  ">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab("basic")}
                  className={`px-4 py-1.5 rounded-lg leading-5  text-sm ${
                    activeTab === "basic"
                      ? "bg-[#F0EBFF] text-secondary font-semibold"
                      : "bg-[#F5F6F7]  text-[#777777]"
                  }`}
                >
                  Basic details
                </button>
                <button
                  onClick={() => setActiveTab("users")}
                  className={`px-4 py-1.5 rounded-lg  leading-5 text-sm ${
                    activeTab === "users"
                      ? "bg-[#F0EBFF] text-secondary font-semibold"
                      : "bg-[#F5F6F7]  text-[#777777]"
                  }`}
                >
                  Users
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="">
              {activeTab === "basic" && (
                <EditOrg
                  handleCancel={handleCancel}
                  handleInputChange={handleInputChange}
                  formData={formData}
                  isEditing={isEditing}
                  organization={organization}
                  setIsEditing={setIsEditing}
                  handleSubmit={handleSubmit}
                  hasFieldError={hasFieldError}
                  isSubmitting={isSubmitting}
                  errors={errors}
                  getFieldError={getFieldError}
                />
              )}

              {activeTab === "users" && <UserTab ordId={id} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationProfile;
