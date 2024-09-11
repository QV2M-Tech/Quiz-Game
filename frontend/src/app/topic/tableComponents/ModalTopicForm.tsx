import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Topic, TopicInput } from "@/types/Topic";

interface ModalTopicFormProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	onSubmit: (data: TopicInput) => Promise<void>;
	initialData?: Topic;
	isSubmitting: boolean;
}

const ModalTopicForm: React.FC<ModalTopicFormProps> = ({
	isOpen,
	setIsOpen,
	onSubmit,
	initialData,
	isSubmitting,
}) => {
	const [topicName, setTopicName] = useState(initialData?.topicName || "");
	const [category, setCategory] = useState(initialData?.category || "");
	const categories = ["วิชาการ", "บันเทิง"];

	useEffect(() => {
		if (isOpen) {
			setTopicName(initialData?.topicName || "");
			setCategory(initialData?.category || "");
		}
	}, [isOpen, initialData]);

	const handleSubmit = async () => {
		await onSubmit({ topicName, category });
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent className="max-w-sm mx-auto p-4 rounded-lg bg-white shadow-lg">
				<DialogTitle className="text-lg font-semibold mb-4">
					{initialData ? "แก้ไขหัวข้อ" : "เพิ่มหัวข้อ"}
				</DialogTitle>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						หัวข้อ
					</label>
					<input
						type="text"
						value={topicName}
						onChange={(e) => setTopicName(e.target.value)}
						placeholder="หัวข้อ"
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						หมวดหมู่
					</label>
					<select
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm"
					>
						<option value="" disabled>
							เลือกหมวดหมู่
						</option>
						{categories.map((cat) => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>
				</div>
				<DialogFooter className="flex justify-end space-x-2">
					<DialogClose>
						<Button asChild variant="outline">
							<div>ยกเลิก</div>
						</Button>
					</DialogClose>
					<Button
						asChild
						variant="secondary"
						disabled={isSubmitting}
						onClick={handleSubmit}
					>
						<div>{isSubmitting ? "กำลังบันทึก..." : "บันทึก"}</div>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ModalTopicForm;
