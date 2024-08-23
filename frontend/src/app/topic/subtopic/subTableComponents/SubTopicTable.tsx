// SubTopicTable.tsx
import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { DataItem } from "@/lib/mockData";
import { SubTableHeader } from "../subTableComponents/SubTableHeader";
import SubTopicTableActions from "../subTableComponents/SubTopicTableActions";

interface SubTopicTableProps {
	requestSort: (key: keyof DataItem) => void;
	searchTerm: string;
	setSearchTerm: (value: string) => void;
	paginatedData: DataItem[];
}

const SubTopicTable: React.FC<SubTopicTableProps> = ({
	requestSort,
	searchTerm,
	setSearchTerm,
	paginatedData,
}) => (
	<Table>
		<SubTableHeader
			requestSort={requestSort}
			searchTerm={searchTerm}
			setSearchTerm={setSearchTerm}
		/>
		<TableBody>
			{paginatedData.map((item: DataItem) => (
				<TableRow key={item._id}>
					<TableCell>{item.subtopic}</TableCell>
					<TableCell>{item.questionCount}</TableCell>
					<TableCell>{item.duration}</TableCell>
					<TableCell>
						<SubTopicTableActions id_Subtopic={item._id} />
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	</Table>
);

export default SubTopicTable;
