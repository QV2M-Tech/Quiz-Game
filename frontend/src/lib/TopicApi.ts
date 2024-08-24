import axios, { AxiosResponse, AxiosError } from 'axios';

interface Topic {
  id: string;
  category: string;
  topicName: string;
}

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

export const TopicApi = {
  getTopicById: async (id: string): Promise<Topic> => {
    try {
      const response: AxiosResponse<ApiResponse<Topic>> = await apiClient.get(`/topics/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching topic:", error);
      throw error;
    }
  },

  getAllTopics: async (): Promise<Topic[]> => {
    try {
      const response: AxiosResponse<ApiResponse<Topic[]>> = await apiClient.get('/topics');
      return response.data.data;
    } catch (error) {
      console.error("Error fetching all topics:", error);
      throw error;
    }
  },

  createTopic: async (topic: Omit<Topic, 'id'>): Promise<Topic> => {
    try {
      const response: AxiosResponse<ApiResponse<Topic>> = await apiClient.post('/topics/create', topic);
      return response.data.data;
    } catch (error) {
      console.error("Error creating topic:", error);
      throw error;
    }
  },

  updateTopic: async (id: string, topic: Partial<Topic>): Promise<Topic> => {
    try {
      const response: AxiosResponse<ApiResponse<Topic>> = await apiClient.put(`/topics/${id}`, topic);
      return response.data.data;
    } catch (error) {
      console.error("Error updating topic:", error);
      throw error;
    }
  },

  deleteTopic: async (id: string): Promise<void> => {
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
  },
};