import React from "react";
import TableHeaderSection from "@/app/topic/tableComponents/TableHeaderSection";
import Pagination from "@/components/ui/Pagination";
import {
	Table,
	TableBody,
	TableFooter,
	TableRow,
	TableCell,
} from "@/components/ui/table";
import { DataItem } from "@/lib/mockData";
import CategoryBadge from "@/components/ui/badge/CategoryBadge";
import TableActions from "@/app/topic/tableComponents/TableActions";

// Define interfaces for the props
interface TopicTableProps {
	setSearchTerm: (term: string) => void;
	searchTerm: string;
	requestSort: (key: keyof DataItem) => void;
	paginatedData: Array<any>;
	currentPage: number;
	totalPages: number;
	setCurrentPage: (page: number) => void;
	itemsPerPage: number;
	sortedData: Array<any>;
	topicId: string | React.ReactNode;
}

const TopicTable: React.FC<TopicTableProps> = ({
	setSearchTerm,
	searchTerm,
	requestSort,
	paginatedData = [],
	currentPage,
	totalPages,
	setCurrentPage,
	itemsPerPage,
	sortedData = [],
}) => (
	<div className="flex flex-col items-center py-10">
		<div className="w-11/12">
			<Table>
				<TableHeaderSection
					requestSort={requestSort}
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
				/>
				<TableBody>
					{paginatedData.map((item) => (
						<TableRow key={item._id}>
							<TableCell>{item.topic}</TableCell>
							<TableCell>
								<CategoryBadge category={item.category} />
							</TableCell>
							<TableCell>
								<TableActions topicId={""} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={3}>
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={setCurrentPage}
								itemsPerPage={itemsPerPage}
								totalItems={sortedData.length}
							/>
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	</div>
);

export default TopicTable;
