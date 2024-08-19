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

export const generateMockData = (): DataItem[] => {
	return Array.from({ length: 100 }, (_, i) => ({
		_id: `${i + 1}`,
		date: `${String(Math.floor(Math.random() * 28) + 1).padStart(
			2,
			"0"
		)}/${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}/2023`,
		name: `ชื่อ นามสกุล ${i + 1}`,
		username: `user${i + 1}`,
		category: i % 2 === 0 ? "วิชาการ" : "บันเทิง",
		topic: "วิชา ม.ปลาย",
		subtopic: "บทเรียนที่ " + (Math.floor(Math.random() * 10) + 1),
		score: Math.floor(Math.random() * 100) + 1,
	}));
};
