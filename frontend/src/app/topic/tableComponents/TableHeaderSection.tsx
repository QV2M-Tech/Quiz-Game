import React from "react";
import { TableHead, TableRow, TableCell } from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import SearchBar from "@/app/topic/tableComponents/SearchBar"; // Assuming you have this component
import { DataItem } from "@/lib/mockData";
import AddTopicButton from "./AddTopicButton";

interface TableHeaderSectionProps {
	requestSort: (key: keyof DataItem) => void;
	searchTerm: string;
	setSearchTerm: (term: string) => void;
}

const TableHeaderSection: React.FC<TableHeaderSectionProps> = ({
	requestSort,
	searchTerm,
	setSearchTerm,
}) => (
	<>
		<TableRow>
			<TableCell colSpan={3}>
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-lg font-bold">จัดการหัวข้อ</h2>
					<div className="flex items-center gap-4">
						<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
						<AddTopicButton />
					</div>
				</div>
			</TableCell>
		</TableRow>
		<TableRow>
			<TableHead className="w-3/5 text-center">หัวข้อ</TableHead>
			<TableHead
				onClick={() => requestSort("category")}
				className="cursor-pointer w-1/5"
			>
				<div className="flex items-center justify-center">
					หมวดหมู่ <ArrowUpDown className="ml-2" size={16} />
				</div>
			</TableHead>
			<TableHead className="w-1/5 text-center">Action</TableHead>
		</TableRow>
	</>
);

export default TableHeaderSection;
