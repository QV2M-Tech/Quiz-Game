import React from "react";
import { Edit, Trash } from "lucide-react";
import TooltipWrapper from "@/components/ui/TooltipWrapper";
import { Question } from "@/types/Question";

interface QuestionActionProps {
	question: Question;
	onEdit: () => void;
	onDelete: () => void;
	isOpen: boolean;
	initialData?: Question;
}

const QuestionAction: React.FC<QuestionActionProps> = ({
	question,
	onEdit,
	onDelete,
	isOpen,
	initialData,
}) => {
	return (
		<>
			<TooltipWrapper content="แก้ไขคำถาม">
				<div
					onClick={onEdit}
					role="button"
					aria-label="แก้ไขคำถาม"
					tabIndex={0}
					className="relative mr-2 cursor-pointer inline-flex items-center rounded-md p-2 hover:bg-gray-200"
				>
					<Edit className="inline-block" size={16} />
				</div>
			</TooltipWrapper>

			<TooltipWrapper content="ลบคำถาม">
				<div
					onClick={isOpen ? undefined : onDelete}
					aria-label={isOpen ? "กำลังลบ..." : "ลบคำถาม"}
					tabIndex={0}
					className={`relative mr-2 cursor-pointer inline-flex items-center rounded-md p-2 ${
						isOpen ? "text-gray-500 hover:bg-transparent" : "hover:bg-gray-200"
					}`}
				>
					{isOpen ? "กำลังลบ..." : <Trash className="inline-block" size={16} />}
				</div>
			</TooltipWrapper>
		</>
	);
};

export default QuestionAction;
