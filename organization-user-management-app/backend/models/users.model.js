import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "coordinator"),
      allowNull: false,
      defaultValue: "coordinator",
    },
    // Foreign key to Organization
    organizationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "organizations", // matches Organization tableName
        key: "id",
      },
      onDelete: "CASCADE", // Delete users if org is deleted
    },
  },
  {
    tableName: "users",
  }
);

export default User;
