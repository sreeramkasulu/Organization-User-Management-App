import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrum";
import ModalWrapper from "../components/ModalWrapper";
import B2BOrganizationsTable from "../components/Organizations";
import axios from "../config/axios";
import { Search } from "lucide-react";
import SearchIcon from "../components/SearchIcon";
import Loader from "../components/Loader";

const breadcrumbItems = [{ title: "Manage B2B organizations", link: "/" }];

const Home = () => {
  const [addingOrg, setAddingOrg] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    email: "",
    contact: "",
  });

  // Fetch organizations
  const fetchOrganizations = async (searchTerm) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get("/org", {
        params: {
          name: searchTerm,
        },
      });
      if (data) setOrganizations(data.organizations);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch organizations. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrganizations();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: "" })); // clear error on change
  };

  // Validate all fields
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{7,15}$/;

    if (!formData.name.trim()) {
      errors.name = "Organization name is required.";
    }
    if (!formData.slug.trim()) {
      errors.slug = "Slug is required.";
    }
    if (!formData.email.trim()) {
      errors.email = "Organization mail is required.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format.";
    }
    if (!formData.contact.trim()) {
      errors.contact = "Contact number is required.";
    } else if (!phoneRegex.test(formData.contact)) {
      errors.contact = "Enter a valid phone number (7–15 digits).";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      setError(null);

      const { data } = await axios.post("/org", formData);

      // Add new organization to the list  (optimistic update)
      setOrganizations((prev) => {
        return [...prev, data.organization];
      });

      // Reset form and close modal
      setFormData({
        name: "",
        slug: "",
        email: "",
        contact: "",
      });
      setAddingOrg(false);
    } catch (err) {
      console.error(err);
      setError("Failed to add organization. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className="max-w-[1450px] md:px-10 px-3 mx-auto relative">
        <SearchIcon fetchOrganizations={fetchOrganizations} />
        <Breadcrumb items={breadcrumbItems} />

        {loading ? (
          <div className="h-44 w-full">
            {" "}
            <Loader />
          </div>
        ) : error && !addingOrg ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : (
          <B2BOrganizationsTable
            addOrd={() => setAddingOrg(true)}
            organizations={organizations}
            setOrganizations={setOrganizations}
          />
        )}
      </div>

      <ModalWrapper
        isOpen={addingOrg}
        onClose={() => {
          setFormErrors({});
          setAddingOrg(false);
        }}
        title={"Add Organization"}
        onSubmit={handleSubmit}
        isSubmitting={submitting}
      >
        <form className="w-full">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mb-4">
            {/* Name of the organization */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm mb-2"
                style={{ color: "#777777" }}
              >
                Name of the organization
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Text"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-3 border ${
                  formErrors.name ? "border-red-500" : ""
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm`}
                style={{
                  borderColor: formErrors.name ? undefined : "#777777",
                  color: "#000000",
                }}
              />
              {formErrors.name && (
                <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
              )}
            </div>

            {/* Slug */}
            <div>
              <label
                htmlFor="slug"
                className="block text-sm mb-2"
                style={{ color: "#777777" }}
              >
                Slug
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                placeholder="Type here"
                value={formData.slug}
                onChange={handleChange}
                className={`w-full px-3 py-3 border ${
                  formErrors.slug ? "border-red-500" : ""
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm`}
                style={{
                  borderColor: formErrors.slug ? undefined : "#777777",
                  color: "#000000",
                }}
              />
              {formErrors.slug && (
                <p className="text-red-500 text-xs mt-1">{formErrors.slug}</p>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
            {/* Organization mail */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm mb-2"
                style={{ color: "#777777" }}
              >
                Organization mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Type here"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-3 border ${
                  formErrors.email ? "border-red-500" : "border-[#777777]"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm`}
                style={{
                  borderColor: formErrors.email ? undefined : "#777777",
                  color: "#000000",
                }}
              />
              {formErrors.email && (
                <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
              )}
            </div>

            {/* Contact */}
            <div>
              <label
                htmlFor="contact"
                className="block text-sm mb-2"
                style={{ color: "#777777" }}
              >
                Contact
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                placeholder="Type here"
                value={formData.contact}
                onChange={handleChange}
                className={`w-full px-3 py-3 border ${
                  formErrors.contact ? "border-red-500" : ""
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm`}
                style={{
                  borderColor: formErrors.contact ? undefined : "#777777",
                  color: "#000000",
                }}
              />
              {formErrors.contact && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.contact}
                </p>
              )}
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
          )}
          {submitting && (
            <p className="text-gray-500 text-sm mt-20 text-center">
              Adding organization...
            </p>
          )}
        </form>

        <style>{`
          input::placeholder {
            color: #777777;
            opacity: 0.5;
          }
        `}</style>
      </ModalWrapper>
    </div>
  );
};

export default Home;
