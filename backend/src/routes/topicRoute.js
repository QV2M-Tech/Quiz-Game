import express from "express";
import { createTopic } from "../controllers/topicController.js";

const router = express.Router();

router.post("/create", createTopic);

export default router;
