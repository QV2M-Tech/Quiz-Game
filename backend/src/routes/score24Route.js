import express from "express";
import Score24 from "../models/Score24";

const router = express.Router();

router.post("/create", create);
router.post("/top10", top10);

const create = async (req, res) => {
	try {
		const data = await res.json();
	} catch (error) {}
};

const top10easy = async (req, res) => {
	try {
		const data = await res.json();
	} catch (error) {}
};

const top10medium = async (req, res) => {
	try {
		const data = await res.json();
	} catch (error) {}
};

const top10hard = async (req, res) => {
	try {
		const data = await res.json();
	} catch (error) {}
};

export default router;
