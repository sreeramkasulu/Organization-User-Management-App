import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";

import { Pencil, Trash, ChevronDown, Check, Plus } from "lucide-react";
import axios from "../config/axios";
import StatusBadge from "./StatusBadge";
import Loader from "./Loader";

export const userRoles = [
  {
    title: "admin",
    bg: "#E7F8E9",
    color: "#12BB23",
  },
  {
    title: "co-ordinator",
    bg: "#FEEFE6",
    color: "#DB5800",
  },
  {
    title: "coordinator",
    bg: "#FEEFE6",
    color: "#DB5800",
  },
];
const UserTab = ({ ordId }) => {
  const [addingUser, setAddingUser] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [userName, setUserName] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [addingUserErros, setAddingUserErrors] = useState({
    userName: "",
    selectedRole: "",
  });
  const [users, setUsers] = useState([]);
  const roles = ["admin", "coordinator"];

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("/users/org/" + ordId);
        if (data) {
          setUsers(data.users);
        }
      } catch (error) {
        console.log("error geting users data", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setIsDropdownOpen(false);
  };

  const validateUser = (userName, selectedRole) => {
    const newErrors = { userName: "", selectedRole: "" };
    let isValid = true;

    if (!userName || userName.trim() === "") {
      newErrors.userName = "User name is required.";
      isValid = false;
    }

    const validRoles = ["admin", "coordinator"];
    if (!selectedRole || !validRoles.includes(selectedRole)) {
      newErrors.selectedRole =
        "Please select a valid role (Admin or Co-ordinator).";
      isValid = false;
    }

    setAddingUserErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    console.log(userName, selectedRole);

    if (validateUser(userName, selectedRole)) {
      console.log("Validation passed. Submitting:", userName, selectedRole);

      try {
        setIsAddingUser(true);
        const response = await axios.post("/users", {
          name: userName,
          role: selectedRole,
          organizationId: ordId,
        });

        console.log("User added successfully:", response.data);

        setUsers((prev) => [...prev, response.data.user]);
        setAddingUser(false);
        setUserName("");
        setSelectedRole("");
      } catch (error) {
        console.error("Error submitting form:", error);

        setAddingUserErrors((prevErrors) => ({
          ...prevErrors,
          form: "An error occurred. Please try again.",
        }));
      } finally {
        setIsAddingUser(false);
      }
    } else {
      console.log("Validation failed. Please check the errors.");
    }
  };

  const deleteUser = async (user) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete user ${user.name}?`
    );
    if (!confirmDelete) return;

    try {
      const { data } = await axios.delete("/users/" + user.id);
      setUsers((prev) => prev.filter((us) => us.id != user.id));
    } catch (error) {
      console.log("error deleting users ", error);
    }
  };

  const handleRoleChangeOnEdit = (userId, newRole) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const updateUserRole = async (user) => {
    try {
      const { data } = await axios.patch("/users/" + user.id, {
        role: user.role,
      });
    } catch (error) {
      console.log("error deleting users ", error);
    }
  };
  return (
    <div>
      <div className="bg-white rounded-md border border-[#DFE2E7] mb-10 ">
        {/* Header */}
        <div className="flex items-center justify-between px-3 sm:px-4 md:px-5 py-3 sm:py-3 md:py-4">
          <h2 className="md:text-xl text-lg font-semibold text-[#232323]">
            Users
          </h2>

          <button
            onClick={() => setAddingUser(true)}
            title="add organization"
            className="flex items-center gap-2 px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-secondary text-white rounded-lg hover:bg-purple-700 transition"
          >
            <Plus className="w-4 h-4" />
            {/* Text hidden on small screens */}
            <span className="hidden sm:inline">Add user</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto ">
          <table className="min-w-[750px] w-full border border-gray-200 rounded-lg">
            <thead className="bg-[#F5F6F7] text-[#232323] text-sm leading-5 font-normal">
              <tr className="px-3">
                <th className="px-6   py-3 text-left w-25 font-normal">
                  Sr. No
                </th>
                <th className="px-6 py-3 text-left min-w-[200px] font-normal">
                  User name
                </th>
                <th className="px-6 py-3 text-left min-w-[200px] font-normal">
                  Role
                </th>
                <th className="px-6 py-3 text-left w-[120px] font-normal">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 border-t  border-gray-200 text-sm"
                >
                  <td className=" px-6 py-4 text-[#232323]">{index + 1}</td>
                  <td className="px-6 py-4 text-sm leading-5 text-[#232323]">
                    {user.name}
                  </td>
                  <td className="px-6 py-4">
                    {isEditing === user.id ? (
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChangeOnEdit(user.id, e.target.value)
                        }
                        className="block w-full py-1.5 px-2 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      >
                        <option value="select">Select role</option>
                        <option value="admin">Admin</option>
                        <option value="coordinator">Co-ordinator</option>
                      </select>
                    ) : (
                      <StatusBadge
                        config={userRoles}
                        title={user.role}
                        needPill={false}
                      />
                    )}
                  </td>

                  <td className="px-6 py-4 flex items-center gap-3">
                    {isEditing === user.id ? (
                      <button
                        onClick={() => {
                          setIsEditing(null);
                          updateUserRole(user);
                        }}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Check size={18} />
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsEditing(user.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Pencil size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteUser(user)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isLoading ? (
            <div className="w-full h-24">
              <Loader />
            </div>
          ) : (
            <>
              {" "}
              {users.length === 0 && (
                <h3 className="w-full text-2xl my-6 text-center text-gray-600">
                  No users in this organization
                </h3>
              )}{" "}
            </>
          )}
        </div>
      </div>

      <ModalWrapper
        isOpen={addingUser}
        onClose={() => {
          setAddingUserErrors({ userName: "", selectedRole: "" });
          setAddingUser(false);
        }}
        title="add users"
        onSubmit={handleSubmit}
        isSubmitting={isAddingUser}
      >
        <div className=" md:px-4 px-2 bg-white">
          {/* Name Input */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm mb-2"
              style={{ color: "#777777" }}
            >
              Name of the user
            </label>
            <input
              type="text"
              name="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Type here"
              className={`
          w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-1 placeholder:text-gray-400
       
         ${
           addingUserErros.userName
             ? "border-red-500 focus:border-red-500 focus:ring-red-500"
             : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
         }
        `}
            />
            {/* --- ADDED ERROR MESSAGE --- */}
            {addingUserErros.userName && (
              <p className="text-red-500 text-xs mt-1.5">
                {addingUserErros.userName}
              </p>
            )}
          </div>

          {/* Role Dropdown */}
          <div className="md:w-[45%] w-full relative">
            <label
              htmlFor="role"
              className="block text-sm mb-2"
              style={{ color: "#777777" }}
            >
              Choose user role
            </label>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`
          w-full px-4 py-2.5 border rounded-lg bg-white text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-1
          ${
            addingUserErros.selectedRole
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          }
        `}
            >
              <span
                className={selectedRole ? "text-gray-900" : "text-gray-400"}
              >
                {selectedRole || "Select an option"}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  isDropdownOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => handleRoleSelect(role)}
                    className="w-full px-4 py-3 text-left text-gray-900 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                  >
                    {role}
                  </button>
                ))}
              </div>
            )}

            {/* --- ADDED ERROR MESSAGE --- */}
            {addingUserErros.selectedRole && (
              <p className="text-red-500 text-xs mt-1.5">
                {addingUserErros.selectedRole}
              </p>
            )}
          </div>

          {/* --- ADDED: Optional general form error --- */}
          {addingUserErros.form && (
            <p className="text-red-500 text-sm mt-4 text-center">
              {addingUserErros.form}
            </p>
          )}
        </div>
      </ModalWrapper>
    </div>
  );
};

export default UserTab;
