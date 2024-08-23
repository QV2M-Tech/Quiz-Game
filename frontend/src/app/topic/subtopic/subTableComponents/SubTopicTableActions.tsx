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
import { EditSubtopicModal } from "./EditSubTopicModal";

const SubTopicTableActions = ({ id_Subtopic }: { id_Subtopic: string }) => {
	const { navigateToQuestion, deleteTopic, updateTopic } = useTopicNavigation();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	return (
		<TableCell className="flex justify-center gap-2">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => navigateToQuestion(id_Subtopic)}
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
						<Button variant="ghost" size="sm" onClick={handleOpenModal}>
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
							onClick={() => deleteTopic(id_Subtopic)}
						>
							<Trash className="inline-block" size={16} />
						</Button>
					</TooltipTrigger>
					<TooltipContent>ลบหัวข้อหลัก</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<EditSubtopicModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
		</TableCell>
	);
};

export default SubTopicTableActions;
