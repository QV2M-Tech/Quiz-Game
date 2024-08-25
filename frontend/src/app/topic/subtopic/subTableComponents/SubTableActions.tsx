import React from "react";
import { Button } from "@/components/ui/button";
import { LibraryBigIcon, Edit, Trash } from "lucide-react";
import {
	TooltipProvider,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip";
import { TableCell } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { SubtopicInput } from "@/types/SubTopic";

interface SubTableActionProps {
	id: string;
	onEdit: (data: SubtopicInput) => void;
	onDelete: () => void;
	initialData: SubtopicInput;
}

const SubTableAction: React.FC<SubTableActionProps> = ({
	id,
	onEdit,
	onDelete,
	initialData,
}) => {
	const router = useRouter();

	const handleEdit = () => {
		onEdit(initialData);
	};

	const navigateToQuestion = () => {
		router.push(`/question/${id}`);
	};

	return (
		<TableCell className="flex justify-center gap-2">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<Button variant="ghost" size="sm" onClick={navigateToQuestion}>
							<LibraryBigIcon className="inline-block" size={16} />
						</Button>
					</TooltipTrigger>
					<TooltipContent>จัดการคำถาม</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<Button variant="ghost" size="sm" onClick={handleEdit}>
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
		</TableCell>
	);
};

export default SubTableAction;
