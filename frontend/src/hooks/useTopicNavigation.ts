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


  

  
const deleteTopic = async (id: string) => {
    try {
      const response = await fetch(`/api/delete-item/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Item deleted successfully');
        router.push('/success-page'); // Navigate after successful operation
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  
  const updateTopic = async (id: string, newData: any) => {
    try {
      const response = await fetch(`/api/update-item/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      if (response.ok) {
        console.log('Item updated successfully');
        router.push('/success-page'); // Navigate after successful operation
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return {

    navigateToSubtopic,
    navigateToQuestion,
    deleteTopic,
    updateTopic,

  };
};

