// src/hooks/useTopicNavigation.ts
import { useRouter } from "next/navigation";

export const useTopicNavigation = () => {
  const router = useRouter();

  const navigateToSubtopic = (_topicId?: string) => {
    router.push("/topic/subtopic");
  };

  const navigateToQuestion = (_id_Subtopic?: string) => {
    router.push("/topic/question");
  };



  
  

  return {

    navigateToSubtopic,
    navigateToQuestion,


  };
};

