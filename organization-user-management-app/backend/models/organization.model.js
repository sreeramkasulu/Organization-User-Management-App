import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./users.model.js";

const Organization = sequelize.define(
  "Organization",
  {
    // Basic organization details
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { notEmpty: true },
    },

    // Contact details
    adminName: {
      type: DataTypes.STRING,
      // allowNull: false,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    supportEmail: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isEmail: true },
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alternativePhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // Other details
    maxCoordinators: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
    },
    timezone: {
      type: DataTypes.STRING,
      defaultValue: "India Standard Time",
    },
    region: {
      type: DataTypes.STRING,
      defaultValue: "Asia/Colombo",
    },
    language: {
      type: DataTypes.STRING,
      defaultValue: "English",
    },
    websiteURL: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isUrl: true },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Status
    status: {
      type: DataTypes.ENUM("Active", "Inactive", "Blocked"),
      defaultValue: "Active",
    },
  },
  {
    tableName: "organizations",
  }
);

export default Organization;
