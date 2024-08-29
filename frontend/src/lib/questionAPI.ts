// /lib/questionAPI.ts
import axios, { AxiosResponse } from 'axios';
import { Question, QuestionInput } from '@/types/Question';

interface ApiResponse<T> {
  message: string;
  data: T;
}

const API_BASE_URL = "http://localhost:6969/api/";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export class QuestionApi {
  static async getQuestionsBySubtopicId(subtopicId: string): Promise<Question[]> {
    try {
      const response: AxiosResponse<ApiResponse<Question[]>> = await apiClient.get(`/questions/subtopic/${subtopicId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching questions for subtopic:", error);
      throw error;
    }
  }

  static async createQuestion(newQuestion: QuestionInput): Promise<Question> {
    try {
      const response: AxiosResponse<ApiResponse<Question>> = await apiClient.post("/questions", newQuestion);
      return response.data.data;
    } catch (error) {
      console.error("Error creating question:", error);
      throw error;
    }
  }

  static async updateQuestion(questionId: string, updatedQuestion: QuestionInput): Promise<Question> {
    try {
      const response: AxiosResponse<ApiResponse<Question>> = await apiClient.put(`/questions/${questionId}`, updatedQuestion);
      return response.data.data;
    } catch (error) {
      console.error("Error updating question:", error);
      throw error;
    }
  }

  static async deleteQuestion(questionId: string): Promise<void> {
    try {
      await apiClient.delete(`/questions/${questionId}`);
    } catch (error) {
      console.error("Error deleting question:", error);
      throw error;
    }
  }
}