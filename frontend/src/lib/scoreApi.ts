import axiosInstance from "./axiosInstance";
import { AllScore, ScoreInput, TopScore } from "@/types/score";

export async function getTopScore(
	subtopicId: string
): Promise<TopScore[] | undefined> {
	try {
		const response = await axiosInstance.get(`/scores/top/${subtopicId}`);

		return response.data.data;
	} catch (error) {
		console.log("Failed to get top 10 score:", error);
		return undefined;
	}
}

export async function getAllScore(): Promise<AllScore[] | undefined> {
	try {
		const response = await axiosInstance.get("/scores");

		return response.data.data;
	} catch (error) {
		console.log("Failed to get all score:", error);
		return undefined;
	}
}

export async function createScore(scoreInput: ScoreInput): Promise<string> {
	try {
		await axiosInstance.post("/scores", scoreInput);

		return "Create score success";
	} catch (error) {
		console.log("Failed to create score:", error);
		return "Failed to create score";
	}
}

export async function deleteScore(scoreId: string): Promise<string> {
	try {
		await axiosInstance.delete(`/scores/${scoreId}`);

		return `Delete score id ${scoreId} success`;
	} catch (error) {
		console.log(`Failed to delete score with id ${scoreId}:`, error);
		return `Failed to delete score with id ${scoreId}`;
	}
}
