import express from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getUsersByOrganization,
} from "../controllers/user.controller.js";

const router = express.Router();

// /users/ ...
router.post("/", createUser); // Add a new user
router.patch("/:id", updateUser); // Update user details
router.delete("/:id", deleteUser); // Delete user

// GET /users/org/:orgId
router.get("/org/:organizationId", getUsersByOrganization); // Get users by organization

export default router;
