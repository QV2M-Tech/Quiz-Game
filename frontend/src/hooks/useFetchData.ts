// ตัวอย่างการใช้งาน
import { TopicApi } from '../lib/topicApi';

// ดึงข้อมูล topic ทั้งหมด
const fetchAllTopics = async () => {
  try {
    const topics = await TopicApi.getAllTopics();
    console.log(topics);
  } catch (error) {
    console.error('Failed to fetch topics:', error);
  }
};

// สร้าง topic ใหม่
const createNewTopic = async () => {
  try {
    const newTopic = await TopicApi.createTopic({
      category: 'Technology',
      topicName: 'TypeScript'
    });
    console.log('New topic created:', newTopic);
  } catch (error) {
    console.error('Failed to create topic:', error);
  }
};

// เรียกใช้ฟังก์ชัน
fetchAllTopics();
createNewTopic();