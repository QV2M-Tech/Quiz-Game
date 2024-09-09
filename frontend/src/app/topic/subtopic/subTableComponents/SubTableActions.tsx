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
	isDeleting: boolean;
	initialData: SubtopicInput;
}

const SubTableAction: React.FC<SubTableActionProps> = ({
	subtopicId,
	subtopicName,
	onEdit,
	onDelete,
	initialData,
	isDeleting,
}) => {
	const router = useRouter();

	const navigateToQuestion = () => {
		router.push(`/topic/subtopic/question/${subtopicId}`);
	};

	return (
		<>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<div
							onClick={navigateToQuestion}
							className="mr-2 inline-block cursor-pointer rounded-md p-2 hover:bg-gray-200"
						>
							<LibraryBigIcon className="inline-block" size={16} />
						</div>
					</TooltipTrigger>
					<TooltipContent>จัดการโจทย์</TooltipContent>
				</Tooltip>
			</TooltipProvider>
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
					<TooltipContent>แก้ไขหัวข้อย่อย</TooltipContent>
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
					<TooltipContent>ลบหัวข้อย่อย</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</>
	);
};

export default SubTableAction;
