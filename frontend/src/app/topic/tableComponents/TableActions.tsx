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
		<>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<div
							onClick={navigateToSubtopic}
							className="mr-2 inline-block cursor-pointer rounded-md p-2 hover:bg-gray-200"
						>
							<LibraryBigIcon className="inline-block" size={16} />
						</div>
					</TooltipTrigger>
					<TooltipContent>จัดการหัวข้อย่อย</TooltipContent>
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
					<TooltipContent>แก้ไขหัวข้อ</TooltipContent>
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
					<TooltipContent>ลบหัวข้อหลัก</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</>
	);
};

export default TableActions;
