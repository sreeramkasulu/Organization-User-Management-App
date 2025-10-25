import express from "express";
import {
  createOrganization,
  deleteOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateImage,
  updateOrganization,
  updateOrgStatus,
} from "../controllers/organization.controller.js";
import multer from "multer";

const router = express.Router();

// related to img uploading
const storage = multer.memoryStorage(); // store file in memory
const upload = multer({ storage });

//GET /org
router.get("/", getAllOrganizations);

// POST /org
router.post("/", createOrganization);

//PATCH /org
router.patch("/:id", updateOrganization);

//DELETE /org
router.delete("/:id", deleteOrganization);

// PATCH /org/img/:id
router.patch("/image/:id", upload.single("image"), updateImage);

// PATCH /org/status/:id
router.patch("/status/:id", updateOrgStatus);
//GET /org/:id
router.get("/:id", getOrganizationById);
export default router;
