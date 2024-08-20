import {
	TableHeader,
	TableRow,
	TableCell,
	TableHead,
} from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import SearchBar from "@/components/SearchBar";

interface TableHeaderSectionProps {
	requestSort: (column: string) => void;
	searchTerm: string;
	setSearchTerm: (value: string) => void;
}

const TableHeaderSection: React.FC<TableHeaderSectionProps> = ({
	requestSort,
	searchTerm,
	setSearchTerm,
}) => (
	<TableHeader>
		<TableRow>
			<TableCell colSpan={3}>
				<div className="flex justify-between items-center">
					<h2 className="font-bold">จัดการหัวข้อ</h2>
					<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
				</div>
			</TableCell>
		</TableRow>
		<TableRow>
			<TableHead className="text-center">หัวข้อ</TableHead>
			<TableHead
				onClick={() => requestSort("category")}
				className="cursor-pointer text-center"
			>
				หมวดหมู่ <ArrowUpDown className="inline-block ml-2" size={16} />
			</TableHead>
			<TableHead className="text-center">Action</TableHead>
		</TableRow>
	</TableHeader>
);

export default TableHeaderSection;
