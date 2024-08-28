"use client";

import React, { useState, useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { Checkbox } from "@/components/ui/checkbox";
import Pagination from "@/components/ui/Pagination";
import CategoryBadge from "@/components/ui/badge/CategoryBadge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { getAllScore } from "@/lib/scoreApi";
import { AllScore } from "@/types/score";
import { thDateTime } from "@/lib/format";

export default function ScorePage() {
	const [data, setData] = useState<AllScore[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const itemsPerPage: number = 10;

	const [searchTerm, setSearchTerm] = useState("");
	const [sortConfig, setSortConfig] = useState<{
		key: keyof AllScore;
		direction: "asc" | "desc";
	} | null>(null);

	useEffect(() => {
		getScore();
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [currentPage]);

	async function getScore() {
		setIsLoading(true);
		const scoreData = await getAllScore();
		setData(scoreData ?? []);
		setIsLoading(false);
	}

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

	const requestSort = (key: keyof AllScore) => {
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
		<div className="flex flex-col items-center py-10">
			<div className="w-11/12 ">
				<Table>
					<TableHeader>
						<TableRow>
							<TableCell colSpan={8}>
								<div className="flex justify-between items-center">
									<h2 className="font-bold">สรุปรายการคะแนน</h2>
									<div className="flex gap-4">
										<Input
											className="w-64"
											placeholder="ค้นหา"
											value={searchTerm}
											onChange={(e) => setSearchTerm(e.target.value)}
										/>
										{/* <Button
											variant="outline"
											className="hover:bg-secondary/20 border-secondary"
										>
											เลือกวันที่
										</Button>
										<Button variant="secondary">ตัวกรอง</Button> */}
									</div>
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							{/* <TableHead className="text-center">
								<Checkbox />
							</TableHead> */}
							<TableHead
								onClick={() => requestSort("createOn")}
								className="cursor-pointer text-center w-2/12"
							>
								วันที่เล่น{" "}
								<ArrowUpDown className="inline-block ml-2" size={16} />
							</TableHead>
							<TableHead
								onClick={() => requestSort("name")}
								className="cursor-pointer text-center w-2/12"
							>
								ชื่อผู้ใช้{" "}
								<ArrowUpDown className="inline-block ml-2" size={16} />
							</TableHead>
							<TableHead
								onClick={() => requestSort("category")}
								className="cursor-pointer text-center w-2/12"
							>
								หมวดหมู่ <ArrowUpDown className="inline-block ml-2" size={16} />
							</TableHead>
							<TableHead
								onClick={() => requestSort("topic")}
								className="cursor-pointer text-center w-2/12"
							>
								หัวข้อ <ArrowUpDown className="inline-block ml-2" size={16} />
							</TableHead>
							<TableHead
								onClick={() => requestSort("subtopic")}
								className="cursor-pointer text-center w-2/12"
							>
								หัวข้อย่อย{" "}
								<ArrowUpDown className="inline-block ml-2" size={16} />
							</TableHead>
							<TableHead
								onClick={() => requestSort("score")}
								className="cursor-pointer text-center w-1/12"
							>
								คะแนน <ArrowUpDown className="inline-block ml-2" size={16} />
							</TableHead>
							<TableHead className="text-center w-2/12">ตัวเลือก</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{paginatedData.map((item) => (
							<TableRow key={item._id}>
								{/* <TableCell>
									<Checkbox />
								</TableCell> */}
								<TableCell>{thDateTime(item.createOn)}</TableCell>
								<TableCell className="text-left">
									<div className="font-medium">{item.name}</div>
									<div className="text-sm text-gray-500">{item.username}</div>
								</TableCell>
								<TableCell>
									<CategoryBadge category={item.category} />
								</TableCell>
								<TableCell>{item.topic}</TableCell>
								<TableCell>{item.subtopic}</TableCell>
								<TableCell className="text-center">{item.score}</TableCell>
								<TableCell className="text-center">ลบ</TableCell>
							</TableRow>
						))}
					</TableBody>

					<TableFooter>
						<TableRow>
							<TableCell colSpan={8}>
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
}
