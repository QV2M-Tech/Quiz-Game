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
						<Button
							variant="ghost"
							size="sm"
							onClick={navigateToQuestion}
							className="mr-2"
						>
							<LibraryBigIcon className="inline-block" size={16} />
						</Button>
					</TooltipTrigger>
					<TooltipContent>จัดการหัวข้อหลัก</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<Button variant="ghost" size="sm" onClick={onEdit} className="mr-2">
							<Edit className="inline-block" size={16} />
						</Button>
					</TooltipTrigger>
					<TooltipContent>แก้ไขหัวข้อย่อย</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<Button
							variant="ghost"
							size="sm"
							onClick={onDelete}
							disabled={isDeleting}
						>
							{isDeleting ? "กำลังลบ..." : ""}
							<Trash className="inline-block" size={16} />
						</Button>
					</TooltipTrigger>
					<TooltipContent>ลบหัวข้อย่อย</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</>
	);
};

export default SubTableAction;
