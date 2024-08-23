// app/topic/page.tsx

"use client";
import React from "react";
import TopicTable from "@/app/topic/tableComponents/TopicTable";
import { useDataTable } from "@/lib/useDataTable";

export default function TopicPage() {
	const {
		paginatedData,
		itemsPerPage,
		currentPage,
		setCurrentPage,
		totalPages,
		searchTerm,
		setSearchTerm,
		isLoading,
		requestSort,
	} = useDataTable();

	if (isLoading) {
		return <div>กำลังโหลด...</div>;
	}

	return (
		<TopicTable
			searchTerm={searchTerm}
			setSearchTerm={setSearchTerm}
			requestSort={requestSort}
			paginatedData={paginatedData}
			currentPage={currentPage}
			totalPages={totalPages}
			setCurrentPage={setCurrentPage}
			itemsPerPage={itemsPerPage} sortedData={[]}		/>
	);
}
