"use client";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

interface DataTableProps {
	itemsPerPage: number;
}

const DataTable: React.FC<DataTableProps> = ({ itemsPerPage }) => {
	const [data, setData] = useState<DataItem[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortConfig, setSortConfig] = useState<{
		key: keyof DataItem;
		direction: "asc" | "desc";
	} | null>(null);

	useEffect(() => {
		const mockData = generateMockData();
		setData(mockData);
		setIsLoading(false);
	}, []);

	const filteredData = data.filter((item) =>
		Object.values(item).some((value) =>
			value.toString().toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	const sortedData = React.useMemo(() => {
		let sortableItems = [...filteredData];
		if (sortConfig !== null) {
			sortableItems.sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key]) {
					return sortConfig.direction === "asc" ? -1 : 1;
				}
				if (a[sortConfig.key] > b[sortConfig.key]) {
					return sortConfig.direction === "asc" ? 1 : -1;
				}
				return 0;
			});
		}
		return sortableItems;
	}, [filteredData, sortConfig]);

	const totalPages = Math.ceil(sortedData.length / itemsPerPage);
	const paginatedData = sortedData.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const requestSort = (key: keyof DataItem) => {
		let direction: "asc" | "desc" = "asc";
		if (
			sortConfig &&
			sortConfig.key === key &&
			sortConfig.direction === "asc"
		) {
			direction = "desc";
		}
		setSortConfig({ key, direction });
	};

	if (isLoading) {
		return <div>กำลังโหลด...</div>;
	}

	return (
		<div className="p-4 space-y-4 w-11/12">
			<h2 className="text-2xl font-bold">สรุปรายการคะแนน</h2>
			<div className="flex justify-between mb-4">
				<Input
					className="w-64"
					placeholder="ค้นหา"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<div className="space-x-2">
					<Button variant="outline">เอกสารใหม่</Button>
					<Button variant="outline">ตัวกรอง</Button>
				</div>
			</div>
			<div className="border rounded-lg overflow-hidden bg-white shadow">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[50px]">
								<Checkbox />
							</TableHead>
							<TableHead
								onClick={() => requestSort("date")}
								className="cursor-pointer"
							>
								วันที่เล่น{" "}
								<ArrowUpDown className="inline-block ml-2" size={16} />
							</TableHead>
							<TableHead
								onClick={() => requestSort("name")}
								className="cursor-pointer"
							>
								ชื่อผู้ใช้{" "}
								<ArrowUpDown className="inline-block ml-2" size={16} />
							</TableHead>
							<TableHead
								onClick={() => requestSort("category")}
								className="cursor-pointer"
							>
								หมวดหมู่ <ArrowUpDown className="inline-block ml-2" size={16} />
							</TableHead>
							<TableHead
								onClick={() => requestSort("topic")}
								className="cursor-pointer"
							>
								หัวข้อ <ArrowUpDown className="inline-block ml-2" size={16} />
							</TableHead>
							<TableHead
								onClick={() => requestSort("subtopic")}
								className="cursor-pointer"
							>
								หัวข้อย่อย{" "}
								<ArrowUpDown className="inline-block ml-2" size={16} />
							</TableHead>
							<TableHead
								onClick={() => requestSort("score")}
								className="cursor-pointer text-right"
							>
								คะแนน <ArrowUpDown className="inline-block ml-2" size={16} />
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.map((item) => (
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
						))}
					</TableBody>
				</Table>
			</div>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setCurrentPage}
				itemsPerPage={itemsPerPage}
				totalItems={sortedData.length}
			/>
		</div>
	);
};

export default DataTable;
