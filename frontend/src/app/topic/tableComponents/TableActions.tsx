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

interface TableActionsProps {
	topicId: string;
	topicName: string;
	category: string;
	onEdit: () => void;
	onDelete: () => void;
	isDeleting: boolean;
}

const TableActions: React.FC<TableActionsProps> = ({
	topicId,
	topicName,
	category,
	onDelete,
	onEdit,
	isDeleting,
}) => {
	const router = useRouter();

	const navigateToSubtopic = () => {
		router.push(`/topic/subtopic/${topicId}`);
	};

	return (
		<TableCell className="flex justify-center gap-2">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<Button variant="ghost" size="sm" onClick={navigateToSubtopic}>
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
					<TooltipContent>แก้ไขหัวข้อ</TooltipContent>
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
					<TooltipContent>ลบหัวข้อหลัก</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</TableCell>
	);
};

export default TableActions;
