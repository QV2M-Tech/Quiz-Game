import React, { useState, useEffect } from "react";
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
import { SubtopicInput } from "@/types/SubTopic";

interface ModalSubTopicProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	mode: "add" | "edit";
	initialData?: Partial<SubtopicInput>;
	onSubmit: (data: SubtopicInput) => void;
}

export function ModalSubTopic({
	isOpen,
	setIsOpen,
	mode,
	initialData,
	onSubmit,
}: ModalSubTopicProps) {
	const [subtopicName, setSubtopicName] = useState(
		initialData?.subtopicName || ""
	);
	const [time, setTime] = useState(initialData?.time?.toString() || "");
	const [category, setCategory] = useState(initialData?.category || "");

	const handleSubmit = () => {
		// Convert time to milliseconds before sending to backend
		const timeInMilliseconds = parseInt(time, 10) * 60000;
		console.log("", timeInMilliseconds);

		onSubmit({
			_id: initialData?._id || "",
			subtopicName,
			time: timeInMilliseconds, // Send the time in milliseconds
			category: category || "",
			topicId: initialData?.topicId || "",
		});
		setIsOpen(false);
	};

	useEffect(() => {
		setSubtopicName(initialData?.subtopicName || "");
		setTime(initialData?.time?.toString() || "");
		setCategory(initialData?.category || "");
	}, [initialData]);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{mode === "add" ? "เพิ่มหัวข้อย่อย" : "แก้ไขหัวข้อย่อย"}
					</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="subtopicName" className="text-right">
							หัวข้อย่อย
						</Label>
						<Input
							id="subtopicName"
							placeholder="หัวข้อย่อย"
							className="col-span-3"
							value={subtopicName}
							onChange={(e) => setSubtopicName(e.target.value)}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="time" className="text-right">
							เวลา (นาที)
						</Label>
						<Input
							id="time"
							type="number"
							placeholder="เวลา"
							className="col-span-3"
							value={time}
							onChange={(e) => setTime(e.target.value)}
						/>
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
