// /lib/questionAPI.ts
import axios, { AxiosResponse, AxiosError } from 'axios';
import { Question, FormData } from '@/types/Question'; // Adjust the import paths as needed

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
  static async fetchQuestions(subtopicId: string): Promise<Question[]> {
    try {
      const response: AxiosResponse<ApiResponse<Question[]>> = await apiClient.get(`/questions/subtopic/${subtopicId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching questions:", error);
      throw error;
    }
  }

  static async createQuestion(newQuestion: any): Promise<void> {
    try {
      await apiClient.post("/questions", newQuestion);
    } catch (error) {
      console.error("Error creating question:", error);
      throw error;
    }
  }

  static async updateQuestion(questionId: string, updatedQuestion: any): Promise<void> {
    try {
      await apiClient.put(`/questions/${questionId}`, updatedQuestion);
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

  static questionToFormData(question: Question): FormData {
    return {
      questionName: question.questionName,
      option1: question.option[0]?.text || "",
      option2: question.option[1]?.text || "",
      option3: question.option[2]?.text || "",
      option4: question.option[3]?.text || "",
      correctAnswer: question.option.findIndex(opt => opt.isCorrect).toString(),
      hint: question.hint,
    };
  }

  static formDataToQuestion(formData: FormData, subtopicId?: string): any {
    return {
      questionName: formData.questionName,
      option: [
        { text: formData.option1, isCorrect: formData.correctAnswer === "0" },
        { text: formData.option2, isCorrect: formData.correctAnswer === "1" },
        { text: formData.option3, isCorrect: formData.correctAnswer === "2" },
        { text: formData.option4, isCorrect: formData.correctAnswer === "3" },
      ],
      hint: formData.hint,
      ...(subtopicId && { subtopicId }),
    };
  }
}
