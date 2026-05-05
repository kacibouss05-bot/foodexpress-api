import express from "express";
import { createMenu, getMenus, getAllMenus, UpdateMenu, deleteMenu } from "../controllers/MenuController.js";


const router = express.Router();

router.post("/", createMenu);
router.get("/", getMenus);
router.get("/", getAllMenus);
router.put("/:id", UpdateMenu);
router.delete("/:id", deleteMenu);

export default router;
