import axios, { AxiosResponse, AxiosError } from 'axios';
import { Topic, TopicInput } from '@/types/topic';

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

export class TopicApi {
  static async getTopicById(id: string): Promise<Topic> {
    try {
      const response: AxiosResponse<ApiResponse<Topic>> = await apiClient.get(`/topics/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching topic:", error);
      throw error;
    }
  }

  static async getAllTopics(): Promise<Topic[]> {
    try {
      const response: AxiosResponse<ApiResponse<Topic[]>> = await apiClient.get('/topics');
      return response.data.data;
    } catch (error) {
      console.error("Error fetching all topics:", error);
      throw error;
    }
  }

  static async createTopic(data: TopicInput): Promise<Topic> {
    try {
      const response: AxiosResponse<ApiResponse<Topic>> = await apiClient.post('/topics/create', data);
      return response.data.data;
    } catch (error) {
      console.error("Error creating topic:", error);
      throw error;
    }
  }

  static async updateTopic(id: string, data: TopicInput): Promise<Topic> {
    try {
      const response: AxiosResponse<ApiResponse<Topic>> = await apiClient.put(`/topics/${id}`, data);
      return response.data.data;
    } catch (error) {
      console.error("Error updating topic:", error);
      throw error;
    }
  }

  static async deleteTopic(id: string): Promise<void> {
    try {
      await apiClient.delete(`/topics/${id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 404) {
          console.error(`Topic with id ${id} not found`);
        } else {
          console.error("Error deleting topic:", axiosError.message);
        }
      } else {
        console.error("Unexpected error:", error);
      }
      throw error;
    }
  }
}