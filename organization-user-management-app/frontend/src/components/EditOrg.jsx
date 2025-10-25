import { Edit2, Mail, Phone, Users, ChevronDown } from "lucide-react";

const EditOrg = ({
  isEditing,
  handleCancel,
  handleSubmit,
  organization,
  handleInputChange,
  formData,
  setIsEditing,
  isSubmitting,
  hasFieldError,
  errors,
  getFieldError,
}) => {
  console.log(errors);

  return (
    <div>
      <div className="p-6 rounded-lg shadow-sm border border-gray-200 bg-white">
        {/* Profile Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#232323]">Profile</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-4 text-secondary bg-[#F0EBFF] hover:bg-blue-50 rounded-md transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                disabled={isSubmitting}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white disabled:cursor-not-allowed hover:bg-blue-700 rounded-lg transition-colors"
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
          )}
        </div>

        {/* Separator */}
        <hr className="text-[#DFE2E7] mb-7" />

        {/* General error message */}
        {errors.find((err) => err.field === "general") && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">
              {errors.find((err) => err.field === "general").message}
            </p>
          </div>
        )}

        {/* Organization Details */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Organization details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[12px] text-[#777777] mb-2">
                Organization Name
              </label>
              <input
                type="text"
                value={organization.name}
                disabled
                className="w-full px-3 h-11 bg-[#F5F6F7] border border-[#DFE2E7] rounded-md text-sm text-[#777777] cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-[12px] text-[#777777] mb-2">
                Organization SLUG
              </label>
              <input
                type="text"
                value={organization.slug}
                disabled
                className="w-full px-3 h-11 bg-[#F5F6F7] border border-[#DFE2E7] rounded-md text-sm text-[#777777] cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Contact details</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Primary Admin Name */}
            <div>
              <label className="block text-[12px] text-[#777777] mb-2">
                Primary Admin name
              </label>
              <input
                type="text"
                name="adminName"
                value={formData.adminName}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder={isEditing ? "Taylor Jones" : ""}
                className={`w-full px-3 h-11 border rounded-md text-sm text-[#777777] ${
                  hasFieldError("adminName")
                    ? "border-red-500"
                    : "border-[#DFE2E7]"
                } ${
                  isEditing ? "bg-white" : "bg-[#F5F6F7] cursor-not-allowed"
                }`}
              />
              {hasFieldError("adminName") && (
                <p className="text-red-500 text-xs mt-1">
                  {getFieldError("adminName")}
                </p>
              )}
            </div>

            {/* Primary Admin Mail */}
            <div>
              <label className="block text-[12px] text-[#777777] mb-2">
                Primary Admin Mail-id
              </label>
              <input
                type="email"
                name="primaryAdminMail"
                value={formData.primaryAdminMail}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder={isEditing ? "Gitam@gmail.com" : ""}
                className={`w-full px-3 h-11 border rounded-md text-sm text-[#777777] ${
                  hasFieldError("primaryAdminMail")
                    ? "border-red-500"
                    : "border-[#DFE2E7]"
                } ${
                  isEditing ? "bg-white" : "bg-[#F5F6F7] cursor-not-allowed"
                }`}
              />
              {hasFieldError("primaryAdminMail") && (
                <p className="text-red-500 text-xs mt-1">
                  {getFieldError("primaryAdminMail")}
                </p>
              )}
            </div>

            {/* Support Email */}
            <div>
              <label className="block text-[12px] text-[#777777] mb-2">
                Support Email ID
              </label>
              <input
                type="email"
                name="supportEmail"
                value={formData.supportEmail}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder={isEditing ? "support@organization.com" : ""}
                className={`w-full px-3 h-11 border rounded-md text-sm text-[#777777] ${
                  hasFieldError("supportEmail")
                    ? "border-red-500"
                    : "border-[#DFE2E7]"
                } ${
                  isEditing ? "bg-white" : "bg-[#F5F6F7] cursor-not-allowed"
                }`}
              />
              {hasFieldError("supportEmail") && (
                <p className="text-red-500 text-xs mt-1">
                  {getFieldError("supportEmail")}
                </p>
              )}
            </div>

            {/* Phone Numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone No (disabled) */}
              <div>
                <label className="block text-[12px] text-[#777777] mb-2">
                  Phone no
                </label>
                <div className="flex gap-2">
                  <SelectWithIcon
                    disabled
                    className="w-20 h-11 px-2 bg-[#F5F6F7] border border-[#DFE2E7] rounded-md text-sm text-[#777777] cursor-not-allowed"
                    value="+91"
                  >
                    <option>+91</option>
                    <option>+1</option>
                    <option>+44</option>
                  </SelectWithIcon>
                  <input
                    type="text"
                    value={organization.contact}
                    disabled
                    className="flex-1 h-11 px-3 bg-[#F5F6F7] border border-[#DFE2E7] rounded-md text-sm text-[#777777] cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Alternative Phone (editable) */}
              <div>
                <label className="block text-[12px] text-[#777777] mb-2">
                  Alternative phone no
                </label>
                <div className="flex gap-2">
                  <SelectWithIcon
                    disabled={!isEditing}
                    className={`w-20 h-11 px-2  rounded-md text-sm ${
                      isEditing
                        ? "bg-white text-[#333]"
                        : "bg-[#F5F6F7] text-[#777777] cursor-not-allowed"
                    }`}
                    name="altCountryCode"
                    value={formData.altCountryCode || "+91"}
                    onChange={handleInputChange}
                  >
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                  </SelectWithIcon>
                  <input
                    type="text"
                    name="alternativePhone"
                    value={formData.alternativePhone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder={isEditing ? "9876543210" : ""}
                    className={`flex-1 h-11 px-3 border rounded-md text-sm text-[#777777] ${
                      hasFieldError("alternativePhone")
                        ? "border-red-500"
                        : "border-[#DFE2E7]"
                    } ${
                      isEditing ? "bg-white" : "bg-[#F5F6F7] cursor-not-allowed"
                    }`}
                  />
                </div>
                {hasFieldError("alternativePhone") && (
                  <p className="text-red-500 text-xs mt-1">
                    {getFieldError("alternativePhone")}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Maximum Allowed Coordinators */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">
            Maximum Allowed Coordinators
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[12px] text-[#777777] mb-2">
                Max active Coordinators allowed
              </label>
              <SelectWithIcon
                name="maxCoordinators"
                value={formData.maxCoordinators}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-3 h-11 border border-[#DFE2E7] rounded-md text-sm ${
                  isEditing
                    ? "bg-white text-[#333]"
                    : "bg-[#F5F6F7] text-[#777777] cursor-not-allowed"
                }`}
              >
                <option value={3}>Up to 3 Coordinators</option>
                <option value={5}>Up to 5 Coordinators</option>
                <option value={10}>Up to 10 Coordinators</option>
                <option value={999}>Unlimited</option>
              </SelectWithIcon>
            </div>
          </div>
        </div>

        {/* Timezone */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Timezone</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-[12px] text-[#777777] mb-2">
                Common name
              </label>
              <SelectWithIcon
                name="timezone"
                value={formData.timezone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-3 h-11 border border-[#DFE2E7] rounded-md text-sm ${
                  isEditing
                    ? "bg-white text-[#333]"
                    : "bg-[#F5F6F7] text-[#777777] cursor-not-allowed"
                }`}
              >
                <option value="India Standard Time">India Standard Time</option>
                <option value="Eastern Standard Time">
                  Eastern Standard Time
                </option>
                <option value="Central European Time">
                  Central European Time
                </option>
                <option value="Pacific Standard Time">
                  Pacific Standard Time
                </option>
              </SelectWithIcon>
            </div>
            <div>
              <label className="block text-[12px] text-[#777777] mb-2">
                Region
              </label>
              <SelectWithIcon
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-3 h-11 border border-[#DFE2E7] rounded-md text-sm ${
                  isEditing
                    ? "bg-white text-[#333]"
                    : "bg-[#F5F6F7] text-[#777777] cursor-not-allowed"
                }`}
              >
                <option value="Asia/Colombo">Asia/Colombo</option>
                <option value="America/New_York">America/New_York</option>
                <option value="Europe/London">Europe/London</option>
                <option value="Asia/Kolkata">Asia/Kolkata</option>
              </SelectWithIcon>
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Language</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[12px] text-[#777777] mb-2">
                Choose the language for organization
              </label>
              <SelectWithIcon
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-3 h-11 border border-[#DFE2E7] rounded-md text-sm ${
                  isEditing
                    ? "bg-white text-[#333]"
                    : "bg-[#F5F6F7] text-[#777777] cursor-not-allowed"
                }`}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </SelectWithIcon>
            </div>
          </div>
        </div>

        {/* Official Website URL */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Official website URL</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[12px] text-[#777777] mb-2">
                Website URL
              </label>
              <input
                type="url"
                name="websiteURL"
                value={formData.websiteURL}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder={isEditing ? "https://organization.com" : ""}
                className={`w-full px-3 h-11 border border-[#DFE2E7] rounded-md text-sm text-[#777777] ${
                  isEditing ? "bg-white" : "bg-[#F5F6F7] cursor-not-allowed"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOrg;

const SelectWithIcon = ({ children, ...props }) => {
  return (
    <div className="relative">
      <select
        {...props}
        className={`${props.className ?? ""} appearance-none pr-10`}
      >
        {children}
      </select>

      {/* custom arrow */}
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        {/* SVG sized to match h-11 input visually */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M7 10l5 5 5-5"
            stroke="#9AA0A6"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
};
