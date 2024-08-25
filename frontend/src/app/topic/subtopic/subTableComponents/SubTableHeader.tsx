import React, { useState } from "react";
import { TableHead, TableRow, TableCell } from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import SearchBar from "@/app/topic/tableComponents/SearchBar";
import { DataItem } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface TableHeaderProps {
	requestSort: (key: keyof DataItem) => void;
	searchTerm: string;
	setSearchTerm: (value: string) => void;
}

interface SubtopicModalProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

const SubtopicModal: React.FC<SubtopicModalProps> = ({ isOpen, setIsOpen }) => {
	const [title, setTitle] = useState("");
	const [duration, setDuration] = useState("");
	const [category, setCategory] = useState("");
	const [difficulty, setDifficulty] = useState("");

	const handleSubmit = () => {
		// TODO: Implement the logic to save the subtopic
		console.log({ title, duration, category, difficulty });
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>เพิ่มหัวข้อย่อย</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="title" className="text-right">
							หัวข้อย่อย
						</Label>
						<Input
							id="title"
							placeholder="หัวข้อย่อย"
							className="col-span-3"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="duration" className="text-right">
							เวลา (นาที)
						</Label>
						<Input
							id="duration"
							type="number"
							placeholder="เวลา"
							className="col-span-3"
							value={duration}
							onChange={(e) => setDuration(e.target.value)}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="category" className="text-right">
							หมวดหมู่
						</Label>
						<Select value={category} onValueChange={setCategory}>
							<SelectTrigger id="category" className="col-span-3">
								<SelectValue placeholder="วิชาการ" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="academic">วิชาการ</SelectItem>
								<SelectItem value="entertainment">บันเทิง</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="difficulty" className="text-right">
							ทักษะ
						</Label>
						<Select value={difficulty} onValueChange={setDifficulty}>
							<SelectTrigger id="difficulty" className="col-span-3">
								<SelectValue placeholder="พื้นฐาน" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="basic">พื้นฐาน</SelectItem>
								{/* Add more difficulty levels as needed */}
							</SelectContent>
						</Select>
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={() => setIsOpen(false)}>
						ยกเลิก
					</Button>
					<Button type="submit" onClick={handleSubmit}>
						ยืนยัน
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

const AddSubTopicButton: React.FC = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setIsDialogOpen(true)}>เพิ่มหัวข้อย่อย</Button>
			<SubtopicModal isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
		</>
	);
};

export const SubTableHeader: React.FC<TableHeaderProps> = ({
	requestSort,
	searchTerm,
	setSearchTerm,
}) => (
	<>
		<TableRow>
			<TableCell colSpan={4}>
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-lg font-bold">จัดการหัวข้อย่อย</h2>
					<div className="flex items-center gap-4">
						<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
						<AddSubTopicButton />
					</div>
				</div>
			</TableCell>
		</TableRow>
		<TableRow>
			<TableHead className="w-3/5 text-center">หัวข้อย่อย</TableHead>
			<TableHead className="w-1/5">
				<div className="flex items-center justify-center">
					จำนวนโจทย์{" "}
					<ArrowUpDown
						className="ml-2 cursor-pointer"
						size={16}
						onClick={() => requestSort("questionCount")}
					/>
				</div>
			</TableHead>
			<TableHead className="w-1/5 text-center">
				<div className="flex items-center justify-center">
					เวลา{" "}
					<ArrowUpDown
						className="ml-2 cursor-pointer"
						size={16}
						onClick={() => requestSort("duration")}
					/>
				</div>
			</TableHead>
			<TableHead className="w-1/5 text-center">Action</TableHead>
		</TableRow>
	</>
);

export default SubTableHeader;
