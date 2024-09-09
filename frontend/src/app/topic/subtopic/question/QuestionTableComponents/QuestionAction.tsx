import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import {
	TooltipProvider,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip";
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
	return (
		<>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<div
							onClick={onEdit}
							className="mr-2 inline-block cursor-pointer rounded-md p-2 hover:bg-gray-200"
						>
							<Edit className="inline-block" size={16} />
						</div>
					</TooltipTrigger>
					<TooltipContent>แก้ไขคำถาม</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<div
							onClick={isDeleting ? undefined : onDelete}
							className={`mr-2 inline-block cursor-pointer rounded-md p-2 ${
								isDeleting
									? "text-gray-500 hover:bg-transparent"
									: "hover:bg-gray-200"
							}`}
						>
							{isDeleting ? (
								<span>กำลังลบ...</span>
							) : (
								<Trash className="inline-block" size={16} />
							)}
						</div>
					</TooltipTrigger>
					<TooltipContent>ลบคำถาม</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</>
	);
};

export default QuestionAction;
