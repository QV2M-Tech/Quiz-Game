import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export interface FormData {
	questionName: string;
	option1: string;
	option2: string;
	option3: string;
	option4: string;
	correctAnswer: string;
	hint: string;
}

interface QuestionModalProps {
	isOpen: boolean;
	mode: "add" | "edit";
	onClose: () => void;
	onSubmit: (data: FormData) => void;
	initialData?: FormData | null;
}

const QuestionModal: React.FC<QuestionModalProps> = ({
	isOpen,
	mode,
	onClose,
	onSubmit,
	initialData = null,
}) => {
	const [formData, setFormData] = useState<FormData>({
		questionName: "",
		option1: "",
		option2: "",
		option3: "",
		option4: "",
		correctAnswer: "",
		hint: "",
	});

	useEffect(() => {
		if (initialData) {
			setFormData(initialData);
		} else {
			setFormData({
				questionName: "",
				option1: "",
				option2: "",
				option3: "",
				option4: "",
				correctAnswer: "",
				hint: "",
			});
		}
	}, [initialData, isOpen]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = () => {
		onSubmit(formData);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{mode === "edit" ? "แก้ไขโจทย์" : "เพิ่มโจทย์"}
					</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="questionName" className="text-right">
							โจทย์
						</Label>
						<Textarea
							id="questionName"
							name="questionName"
							className="col-span-3"
							value={formData.questionName}
							onChange={handleChange}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="option1" className="text-right">
							ตัวเลือกที่ 1
						</Label>
						<Input
							id="option1"
							name="option1"
							className="col-span-3"
							value={formData.option1}
							onChange={handleChange}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="option2" className="text-right">
							ตัวเลือกที่ 2
						</Label>
						<Input
							id="option2"
							name="option2"
							className="col-span-3"
							value={formData.option2}
							onChange={handleChange}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="option3" className="text-right">
							ตัวเลือกที่ 3
						</Label>
						<Input
							id="option3"
							name="option3"
							className="col-span-3"
							value={formData.option3}
							onChange={handleChange}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="option4" className="text-right">
							ตัวเลือกที่ 4
						</Label>
						<Input
							id="option4"
							name="option4"
							className="col-span-3"
							value={formData.option4}
							onChange={handleChange}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="correctAnswer" className="text-right">
							ข้อที่ถูก
						</Label>
						<Input
							id="correctAnswer"
							name="correctAnswer"
							className="col-span-3"
							value={formData.correctAnswer}
							onChange={handleChange}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="hint" className="text-right">
							คำใบ้
						</Label>
						<Input
							id="hint"
							name="hint"
							className="col-span-3"
							value={formData.hint}
							onChange={handleChange}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
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

export default QuestionModal;
