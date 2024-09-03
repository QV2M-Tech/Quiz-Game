import axios, { AxiosResponse, AxiosError } from 'axios';
import { Subtopic, SubtopicInput } from '@/types/SubTopic'
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

export class SubtopicApi {
  static async getSubtopicById(id: string): Promise<Subtopic> {
    try {
      const response: AxiosResponse<ApiResponse<Subtopic>> = await apiClient.get(`/subtopics/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching subtopic:", error);
      throw error;
    }
  }

  static async getAllSubtopicsByTopicId(topicId: string): Promise<Subtopic[]> {
    try {
      const response: AxiosResponse<ApiResponse<Subtopic[]>> = await apiClient.get(`/subtopics/topic/${topicId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching subtopics for topic:", error);
      throw error;
    }
  }

  static async createSubtopic(data: SubtopicInput): Promise<Subtopic> {
    try {
      const response: AxiosResponse<ApiResponse<Subtopic>> = await apiClient.post('/subtopics/create', data);
      return response.data.data;
    } catch (error) {
      console.error("Error creating subtopic:", error);
      throw error;
    }
  }

  static async updateSubtopic(id: string, data: SubtopicInput): Promise<Subtopic> {
    try {
      const response: AxiosResponse<ApiResponse<Subtopic>> = await apiClient.put(`/subtopics/${id}`, data);
      return response.data.data;
    } catch (error) {
      console.error("Error updating subtopic:", error);
      throw error;
    }
  }

  static async deleteSubtopic(id: string): Promise<void> {
    try {
      await apiClient.delete(`/subtopics/${id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 404) {
          console.error(`Subtopic with id ${id} not found`);
        } else {
          console.error("Error deleting subtopic:", axiosError.message);
        }
      } else {
        console.error("Unexpected error:", error);
      }
      throw error;
    }
  }
}