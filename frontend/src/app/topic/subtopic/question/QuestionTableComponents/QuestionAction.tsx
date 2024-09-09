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
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<Button variant="ghost" size="sm" onClick={onEdit} className="mr-2">
							<Edit className="inline-block" size={16} />
						</Button>
					</TooltipTrigger>
					<TooltipContent>แก้ไขคำถาม</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<Button variant="ghost" size="sm" onClick={onDelete}>
							<Trash className="inline-block" size={16} />
						</Button>
					</TooltipTrigger>
					<TooltipContent>ลบคำถาม</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</>
	);
};

export default QuestionAction;
