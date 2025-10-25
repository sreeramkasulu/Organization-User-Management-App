import imagekit from "../config/imagekit.js";
import Organization from "../models/organization.model.js";
import { Op } from "sequelize";
export const createOrganization = async (req, res) => {
  try {
    const { name, slug, contact, email } = req.body;
    console.log(name, slug, contact, email);

    // Basic validation
    if (!name || !slug || !contact || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create the org
    const org = await Organization.create({
      name,
      slug,
      contact,
      email,
    });

    res.status(201).json({
      message: "Organization created successfully",
      organization: org,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllOrganizations = async (req, res) => {
  try {
    const { name } = req.query; // Get query param
    // console.log("name", name);

    let orgs;

    if (name) {
      orgs = await Organization.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`, // Works in SQLite (case-insensitive by default)
          },
        },
      });
    } else {
      orgs = await Organization.findAll();
    }

    res.status(200).json({
      message: "Organizations fetched successfully",
      organizations: orgs,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrganizationById = async (req, res) => {
  try {
    const { id } = req.params;

    const org = await Organization.findByPk(id);
    if (!org) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.status(200).json({
      message: "Organization fetched successfully",
      organization: org,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body; // Expect all fields in req.body

    const org = await Organization.findByPk(id);
    if (!org)
      return res.status(404).json({ message: "Organization not found" });

    // List of allowed fields to update
    const allowedFields = [
      //   "name",
      //   "slug",
      "adminName",
      //   "email",
      "supportEmail",
      //   "contact",
      "alternativePhone",
      "maxCoordinators",
      "timezone",
      "region",
      "language",
      "websiteURL",
    ];

    // Update only allowed fields
    allowedFields.forEach((field) => {
      if (updates[field] !== undefined) {
        org[field] = updates[field];
      }
    });

    await org.save();

    res.status(200).json({
      message: "Organization updated successfully",
      organization: org,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const org = await Organization.findByPk(id);
    if (!org)
      return res.status(404).json({ message: "Organization not found" });

    await org.destroy();
    res.status(200).json({ message: "Organization deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateImage = async (req, res) => {
  try {
    const orgId = req.params.id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No image uploaded" });
    }
    // Upload image to ImageKit
    const uploadResponse = await imagekit.upload({
      file: file.buffer, // file buffer from multer
      fileName: `${orgId}_${Date.now()}_${file.originalname}`,
      folder: "/org-images",
    });

    // Update org record in DB
    const org = await Organization.findByPk(orgId);
    if (!org) return res.status(404).json({ error: "Organization not found" });

    org.image = uploadResponse.url;
    await org.save();

    res.json({
      message: "✅ Image uploaded successfully",
      imageUrl: uploadResponse.url,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upload image" });
  }
};

export const updateOrgStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status value
    const validStatuses = ["Active", "Inactive", "Blocked"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    // Find org by ID
    const org = await Organization.findByPk(id);
    if (!org) {
      return res.status(404).json({ error: "Organization not found" });
    }

    // Update status
    org.status = status;
    await org.save();

    res.json({
      message: "✅ Status updated successfully",
      org: {
        id: org.id,
        status: org.status,
      },
    });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
};
