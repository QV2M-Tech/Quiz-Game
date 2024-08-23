// SubTableHeader.tsx
import React from "react";
import { TableHead, TableRow, TableCell } from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import SearchBar from "@/app/topic/tableComponents/SearchBar";
import { DataItem } from "@/lib/mockData";

interface TableHeaderProps {
	requestSort: (key: keyof DataItem) => void;
	searchTerm: string;
	setSearchTerm: (value: string) => void;
}

export const SubTableHeader: React.FC<TableHeaderProps> = ({
	requestSort,
	searchTerm,
	setSearchTerm,
}) => (
	<>
		<TableRow>
			<TableCell colSpan={4}>
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-lg font-bold">จัดการหัวข้อย่อย</h2>
					<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
				</div>
			</TableCell>
		</TableRow>
		<TableRow>
			<TableHead className="w-3/5 text-center">หัวข้อย่อย</TableHead>
			<TableHead className="w-1/5">
				<div className="flex items-center justify-center">
					จำนวนโจทย์ <ArrowUpDown className="ml-2" size={16} />
				</div>
			</TableHead>
			<TableHead className="w-1/5 text-center">
				<div className="flex items-center justify-center">
					เวลา <ArrowUpDown className="ml-2" size={16} />
				</div>
			</TableHead>
			<TableHead className="w-1/5 text-center">Action</TableHead>
		</TableRow>
	</>
);
