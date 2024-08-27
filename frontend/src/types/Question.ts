export interface Question {
    _id: string;
    questionName: string;
    option: { text: string; isCorrect: boolean }[];
    hint: string;
    updatedAt: string;
  }
  
  export interface FormData {
    _id?: string; // Add this line 
    questionName: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correctAnswer: string;
    hint: string;
  }