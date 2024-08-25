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
import { SubtopicInput } from "@/types/SubTopic";

interface ModalSubTopicProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	mode: "add" | "edit";
	initialData?: SubtopicInput;
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
		onSubmit({
			subtopicName,
			time: parseInt(time),
			category,
			topicId: initialData?.topicId || "",
		});
		setIsOpen(false);
	};

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
