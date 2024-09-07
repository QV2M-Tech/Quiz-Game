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
import { QuestionInput } from "@/types/Question";
import { Checkbox } from "@/components/ui/checkbox";

interface QuestionModalProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	mode: "add" | "edit";
	onSubmit: (data: QuestionInput) => void;
	onClose: () => void;
	initialData?: QuestionInput | null;
	subtopicId: string;
}

const QuestionModal: React.FC<QuestionModalProps> = ({
	isOpen,
	mode,
	onClose,
	onSubmit,
	subtopicId,
	initialData = null,
}) => {
	const [formData, setFormData] = useState<QuestionInput>({
		questionName: "",
		option: [
			{ text: "", isCorrect: false },
			{ text: "", isCorrect: false },
			{ text: "", isCorrect: false },
			{ text: "", isCorrect: false },
		],
		hint: "",
		subtopicId: subtopicId,
	});

	useEffect(() => {
		if (initialData) {
			setFormData(initialData);
		} else {
			setFormData({
				questionName: "",
				option: [
					{ text: "", isCorrect: false },
					{ text: "", isCorrect: false },
					{ text: "", isCorrect: false },
					{ text: "", isCorrect: false },
				],
				hint: "",
				subtopicId: subtopicId,
			});
		}
	}, [initialData, isOpen, subtopicId]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleOptionChange = (index: number, value: string) => {
		setFormData((prev) => ({
			...prev,
			option: prev.option.map((opt, i) =>
				i === index ? { ...opt, text: value } : opt
			),
		}));
	};

	const handleCorrectChange = (index: number) => {
		setFormData((prev) => ({
			...prev,
			option: prev.option.map((opt, i) => ({
				...opt,
				isCorrect: i === index,
			})),
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
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
				<form onSubmit={handleSubmit}>
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
						{formData.option.map((opt, index) => (
							<div key={index} className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor={`option${index + 1}`} className="text-right">
									ตัวเลือกที่ {index + 1}
								</Label>
								<Input
									id={`option${index + 1}`}
									name={`option${index + 1}`}
									className="col-span-2"
									value={opt.text}
									onChange={(e) => handleOptionChange(index, e.target.value)}
								/>
								<Checkbox
									checked={opt.isCorrect}
									onCheckedChange={() => handleCorrectChange(index)}
								/>
							</div>
						))}
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
						<Button type="submit" variant="secondary">
							ยืนยัน
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default QuestionModal;
