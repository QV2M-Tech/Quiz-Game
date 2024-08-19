"use client";
// DataTable.tsx
import React, { useState, useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import Pagination from "@/components/ui/Pagination";
import { DataItem, generateMockData } from "@/lib/mockData";
import CategoryBadge from "@/components/ui/badge/CategoryBadge";

interface DataTableProps {
	itemsPerPage: number;
}

const page: React.FC<DataTableProps> = ({ itemsPerPage }) => {
	const [data, setData] = useState<DataItem[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const mockData = generateMockData();

		setData(mockData);
		setIsLoading(false);
	}, []);

	const totalPages = Math.ceil(data.length / itemsPerPage);
	const paginatedData = data.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	if (isLoading) {
		return <div>กำลังโหลด...</div>;
	}

	return (
		<div className="p-4 space-y-4">
			<h2 className="text-2xl font-bold">สรุปรายการคะแนน</h2>
			<div className="border rounded-lg overflow-hidden bg-white shadow">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[50px]">
								<Checkbox />
							</TableHead>
							<TableHead>วันที่เล่น</TableHead>
							<TableHead>ชื่อผู้ใช้</TableHead>
							<TableHead>หมวดหมู่</TableHead>
							<TableHead>หัวข้อ</TableHead>
							<TableHead>หัวข้อย่อย</TableHead>
							<TableHead className="text-right">คะแนน</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.map((item) => {
							return (
								<TableRow key={item.id}>
									<TableCell>
										<Checkbox />
									</TableCell>
									<TableCell>{item.date}</TableCell>
									<TableCell>
										<div className="font-medium">{item.name}</div>
										<div className="text-sm text-gray-500">{item.email}</div>
									</TableCell>
									<TableCell>
										<CategoryBadge category={item.category} />
									</TableCell>
									<TableCell>{item.topic}</TableCell>
									<TableCell>{item.subtopic}</TableCell>
									<TableCell className="text-right">{item.score}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setCurrentPage}
				itemsPerPage={itemsPerPage}
				totalItems={data.length}
			/>
		</div>
	);
};

export default page;
