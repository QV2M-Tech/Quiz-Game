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
import { ModalSubTopic } from "../subTableComponents/ModalSubTopic";
import { SubtopicInput } from "@/types/subtopic";

interface SubTableActionProps {
	id: string;
	onEdit: (data: SubtopicInput) => void;
	initialData: SubtopicInput;
}

const SubTableAction: React.FC<SubTableActionProps> = ({
	id,
	onEdit,
	initialData,
}) => {
	const { navigateToQuestion } = useTopicNavigation();
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<TableCell className="flex justify-center gap-2">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => navigateToQuestion(id)}
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
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setIsModalOpen(true)}
						>
							<Edit className="inline-block" size={16} />
						</Button>
					</TooltipTrigger>
					<TooltipContent>แก้ไขหัวข้อ</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<ModalSubTopic
				isOpen={isModalOpen}
				setIsOpen={setIsModalOpen}
				mode="edit"
				initialData={initialData}
				onSubmit={onEdit}
			/>
		</TableCell>
	);
};

export default SubTableAction;
