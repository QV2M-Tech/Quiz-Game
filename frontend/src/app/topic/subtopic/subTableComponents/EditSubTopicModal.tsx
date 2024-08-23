import React, { useState } from "react";
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

interface EditSubtopicModalProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

export function EditSubtopicModal({ isOpen, setIsOpen }: EditSubtopicModalProps) {
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
					<DialogTitle>แก้ไขหัวข้อย่อย</DialogTitle>
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
								{/* Add more categories as needed */}
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
}
