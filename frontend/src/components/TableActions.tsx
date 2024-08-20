// components/TableActions.tsx

import { Button } from "@/components/ui/button";
import { LibraryBigIcon, Edit, Trash } from "lucide-react";
import {
	TooltipProvider,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip";
import { TableCell } from "@/components/ui/table";

const TableActions = () => (
	<TableCell className="flex justify-center gap-2">
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Button variant="ghost" size="sm">
						<LibraryBigIcon className="inline-block" size={16} />
					</Button>
				</TooltipTrigger>
				<TooltipContent>จัดการหัวข้อหลัก</TooltipContent>
			</Tooltip>
		</TooltipProvider>

		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Button variant="ghost" size="sm">
						<Edit className="inline-block" size={16} />
					</Button>
				</TooltipTrigger>
				<TooltipContent>แก้ไขหัวข้อ</TooltipContent>
			</Tooltip>
		</TooltipProvider>

		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Button variant="ghost" size="sm">
						<Trash className="inline-block" size={16} />
					</Button>
				</TooltipTrigger>
				<TooltipContent>ลบหัวข้อหลัก</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	</TableCell>
);

export default TableActions;
