import React, { ReactNode } from "react";
import { Edit, Trash } from "lucide-react";
import TooltipWrapper from "@/components/ui/TooltipWrapper";
import { Question } from "@/types/Question";

interface QuestionActionProps {
	question: Question;
	onEdit: () => void;
	onDelete: () => void;
	isOpen: boolean;
	initialData?: Question;
	isDeleting: boolean;
}

const QuestionAction: React.FC<QuestionActionProps> = ({
	question,
	onEdit,
	onDelete,
	isOpen,
	initialData,
	isDeleting,
}) => {
	const actions = [
		{
			icon: Edit,
			onClick: onEdit,
			tooltip: "แก้ไขคำถาม",
			className:
				"transform -rotate-45 transition-transform duration-300 ease-in-out",
		},
		{
			icon: Trash,
			onClick: isDeleting ? undefined : onDelete,
			tooltip: "ลบคำถาม",
			disabled: isDeleting,
		},
	];

	return (
		<div className="flex">
			{actions.map((action, index) => (
				<TooltipWrapper key={index} content={action.tooltip}>
					<div
						onClick={action.onClick}
						className={`mr-2 inline-block cursor-pointer rounded-md p-2 ${
							action.disabled
								? "text-gray-500 hover:bg-transparent"
								: "hover:bg-gray-200"
						}`}
					>
						{action.disabled && isDeleting ? (
							<span>กำลังลบ...</span>
						) : (
							<action.icon
								className={`inline-block text-3xl ${action.className || ""}`}
								size={16}
							/>
						)}
					</div>
				</TooltipWrapper>
			))}
		</div>
	);
};

export default QuestionAction;
