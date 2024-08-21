// components/MainComponent.tsx

import React from "react";
import TableHeaderSection from "@/app/topic/components/TableHeaderSection";
import TableRowWithActions from "@/app/topic/components/TableRowWithAction";
import Pagination from "@/components/ui/Pagination";
import {
	Table,
	TableBody,
	TableFooter,
	TableRow,
	TableCell,
} from "@/components/ui/table";

const TopicTable = ({
	setSearchTerm,
	searchTerm,
	requestSort,
	paginatedData,
	currentPage,
	totalPages,
	setCurrentPage,
	itemsPerPage,
	sortedData,
}: any) => (
	<div className="flex flex-col items-center py-10">
		<div className="w-11/12">
			<Table>
				<TableHeaderSection
					requestSort={requestSort}
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
				/>
				<TableBody>
					{paginatedData.map((item: any) => (
						<TableRowWithActions item={item} />
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
