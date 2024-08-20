// mockData.ts
export interface DataItem {
	_id: string;
	date: string;
	name: string;
	username: string;
	category: "วิชาการ" | "บันเทิง";
	topic: string;
	subtopic: string;
	score: number;
  }
  
  const topics = [
	"คณิตศาสตร์",
	"วิทยาศาสตร์",
	"ฟิสิกส์",
	"เคมี",
	"ชีววิทยา",
	"ภาษาไทย",
	"ภาษาอังกฤษ",
	"สังคมศึกษา",
	"ประวัติศาสตร์",
	"ศิลปะ",
	"ดนตรี",
	"คอมพิวเตอร์",
	"เศรษฐศาสตร์",
	"จิตวิทยา",
	"สุขศึกษา",
  ];
  
  export const generateMockData = (): DataItem[] => {
	return Array.from({ length: 100 }, (_, i) => {
	  const category = i % 2 === 0 ? "วิชาการ" : "บันเทิง";
	  const topic = topics[i]
	  return {
		_id: `${i + 1}`,
		date: `${String(Math.floor(Math.random() * 28) + 1).padStart(
		  2,
		  "0"
		)}/${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}/2023`,
		name: `ชื่อ นามสกุล ${i + 1}`,
		username: `user${i + 1}`,
		category: category,
		topic: topic,
		subtopic: "บทเรียนที่ " + (Math.floor(Math.random() * 10) + 1),
		score: Math.floor(Math.random() * 100) + 1,
	  };
	});
  };