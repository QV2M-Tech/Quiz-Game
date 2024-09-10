import React from "react";
import { LibraryBigIcon, Edit, Trash } from "lucide-react";
import TooltipWrapper from "@/components/ui/TooltipWrapper";
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
			<TooltipWrapper content="จัดการหัวข้อย่อย">
				<div
					onClick={navigateToSubtopic}
					className="mr-2 inline-block cursor-pointer rounded-md p-2 hover:bg-gray-200"
				>
					<LibraryBigIcon className="inline-block" size={16} />
				</div>
			</TooltipWrapper>

			<TooltipWrapper content="แก้ไขหัวข้อ">
				<div
					onClick={onEdit}
					className="mr-2 inline-block cursor-pointer rounded-md p-2 hover:bg-gray-200"
				>
					<Edit className="inline-block" size={16} />
				</div>
			</TooltipWrapper>

			<TooltipWrapper content="ลบหัวข้อหลัก">
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
			</TooltipWrapper>
		</>
	);
};

export default TableActions;
