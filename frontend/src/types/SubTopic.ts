export interface Subtopic {
    _id: string;
    topicId: string;
    subtopicName: string;
    time: number; // in milliseconds
    category: string;
    questionCount: number;
  }
  
  export interface SubtopicInput {
    topicId: string;
    subtopicName: string;
    time: number;
    category: string;
  }