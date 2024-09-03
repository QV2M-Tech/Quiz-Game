// src/app/topic/subtopic/subTableComponents/SubTableActions.tsx

import React from "react";
import { Button } from "@/components/ui/button";
import { LibraryBigIcon, Edit, Trash } from "lucide-react";
import {
	TooltipProvider,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip";
import { SubtopicInput } from "@/types/SubTopic";
import { useRouter } from "next/navigation";

interface SubTableActionProps {
	subtopicId: string;
	subtopicName: string;
	onEdit: () => void;
	onDelete: () => void;
	initialData: SubtopicInput;
}

const SubTableAction: React.FC<SubTableActionProps> = ({
	subtopicId,
	subtopicName,
	onEdit,
	onDelete,
	initialData,
}) => {
	const router = useRouter();

	const navigateToQuestion = () => {
		router.push(`/topic/subtopic/question/${subtopicId}`);
	};

	return (
		<div className="flex justify-center gap-2">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<Button variant="ghost" size="sm" onClick={navigateToQuestion}>
							<LibraryBigIcon className="inline-block" size={16} />
						</Button>
					</TooltipTrigger>
					<TooltipContent>จัดการหัวข้อหลัก</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<Button variant="ghost" size="sm" onClick={onEdit}>
							<Edit className="inline-block" size={16} />
						</Button>
					</TooltipTrigger>
					<TooltipContent>แก้ไขหัวข้อย่อย</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<Button variant="ghost" size="sm" onClick={onDelete}>
							<Trash className="inline-block" size={16} />
						</Button>
					</TooltipTrigger>
					<TooltipContent>ลบหัวข้อย่อย</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
};

export default SubTableAction;
