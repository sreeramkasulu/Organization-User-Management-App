import Organization from "../models/organization.model.js";
import User from "../models/users.model.js";

export const createUser = async (req, res) => {
  try {
    const { name, role, organizationId } = req.body;

    // Basic validation
    if (!name || !organizationId) {
      return res
        .status(400)
        .json({ message: "Name and organizationId are required" });
    }

    // Check if organization exists
    const org = await Organization.findByPk(organizationId);
    if (!org) {
      return res.status(404).json({ message: "Organization not found" });
    }

    // Create user
    const user = await User.create({ name, role, organizationId });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, organizationId } = req.body;
    console.log(role);

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // If orgId is passed, validate that it exists (i made this optinal)
    if (organizationId) {
      const org = await Organization.findByPk(organizationId);
      if (!org)
        return res.status(404).json({ message: "Organization not found" });
    }

    await user.update({ name, role, organizationId });
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getUsersByOrganization = async (req, res) => {
  try {
    const { organizationId } = req.params;
    // console.log(organizationId);

    const org = await Organization.findByPk(organizationId);
    if (!org)
      return res.status(404).json({ message: "Organization not found" });

    const users = await User.findAll({ where: { organizationId } });
    res.json({ message: "Users fetched successfully", users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
