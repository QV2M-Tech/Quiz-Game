import React, { useState } from "react";
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

interface EditTopicButtonProps {
	topicId: string;
}

const EditTopicButton: React.FC<EditTopicButtonProps> = ({ topicId }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleEditClick = () => {
		setIsModalOpen(true);
	};

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Button variant="ghost" size="sm" onClick={handleEditClick}>
						<Edit className="inline-block" size={16} />
					</Button>
				</TooltipTrigger>
				<TooltipContent>แก้ไขหัวข้อ</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

interface TableActionsProps {
	topicId: string;
}

const TableActions: React.FC<TableActionsProps> = ({ topicId }) => {
	const { navigateToSubtopic, deleteTopic } = useTopicNavigation();

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

			<EditTopicButton topicId={topicId} />

			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => deleteTopic(topicId)}
						>
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
