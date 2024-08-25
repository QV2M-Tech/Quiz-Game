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
import { useTopicNavigation } from "@/hooks/useTopicNavigation";

interface TableActionsProps {
	topicId: string;
	onEdit: () => void;
	onDelete: () => void;
	isDeleting: boolean;
}

const TableActions: React.FC<TableActionsProps> = ({
	topicId,
	onDelete,
	onEdit,
	isDeleting,
}) => {
	const { navigateToSubtopic } = useTopicNavigation();

	return (
		<TableCell className="flex justify-center gap-2">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => navigateToSubtopic(topicId)}
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
