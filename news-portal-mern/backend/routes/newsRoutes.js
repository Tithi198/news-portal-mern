import express from "express";
import {
  createNews,
  deleteNews,
  getAllNews,
  getMyNews,
  getNewsBySlug,
  getTopNews,
  updateNews,
} from "../controllers/newsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllNews);
router.get("/top", getTopNews);
router.get("/my-news", protect, getMyNews);
router.get("/:slug", getNewsBySlug);
router.post("/", protect, createNews);
router.put("/:id", protect, updateNews);
router.delete("/:id", protect, deleteNews);

export default router;