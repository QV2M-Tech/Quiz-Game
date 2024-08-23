"use client";
import React from "react";
import SubTopicTable from "../subtopic/subTableComponents/SubTopicTable";
import { useDataTable } from "@/lib/useDataTable";

export default function TopicPage() {
	const { paginatedData, searchTerm, setSearchTerm, isLoading, requestSort } =
		useDataTable();

	if (isLoading) {
		return <div>กำลังโหลด...</div>;
	}

	return (
		<div className="flex flex-col items-center py-10">
			<div className="w-11/12">
				<SubTopicTable
					requestSort={requestSort}
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					paginatedData={paginatedData}
				/>
			</div>
		</div>
	);
}
