"use client";

import React, { useState, useEffect } from "react";
import Pagination from "@/components/ui/Pagination";
import { Input } from "@/components/ui/input";
import { ArrowUpDown } from "lucide-react";
import { Edit, Trash } from "lucide-react";
import ModalUserEdit from "./components/ModalUserEdit";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Loading from "@/components/ui/Loading";
import { thDateTime } from "@/lib/format";
import TooltipWrapper from "@/components/ui/TooltipWrapper";

interface User {
	_id: string;
	name: string;
	username: string;
	createOn: string;
}

export default function ScorePage() {
	const [data, setData] = useState<User[]>([]);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortConfig, setSortConfig] = useState<{
		key: keyof User;
		direction: "asc" | "desc";
	} | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [currentUserId, setCurrentUserId] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axiosInstance.get<User[]>("/users");
				setData(response.data);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);

	const handleEdit = async (newName: string) => {
		if (!currentUserId) return;
		setIsSubmitting(true);
		try {
			await axiosInstance.patch(`/users/${currentUserId}`, {
				name: newName,
			});
			setData((prevData) =>
				prevData.map((item) =>
					item._id === currentUserId ? { ...item, name: newName } : item
				)
			);
		} catch (error) {
			console.error("Error updating user:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDelete = async (userId: string) => {
		try {
			await axiosInstance.delete(`/users/${userId}`);
			setData((prevData) => prevData.filter((item) => item._id !== userId));
		} catch (error) {
			console.error("Error deleting user:", error);
		}
	};

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

	const requestSort = (key: keyof User) => {
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

	const openEditModal = (userId: string, name: string) => {
		setCurrentUserId(userId);
		setModalOpen(true);
	};

	return (
		<div className="flex flex-col items-center py-10">
			<div className="w-11/12">
				<Table>
					<TableHeader>
						<TableRow>
							<TableCell colSpan={4}>
								<div className="flex justify-between items-center">
									<h2 className="font-bold">จัดการผู้ใช้งาน</h2>
									<div className="flex gap-4">
										<Input
											className="w-64"
											placeholder="ค้นหา"
											value={searchTerm}
											onChange={(e) => setSearchTerm(e.target.value)}
										/>
									</div>
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableHead
								onClick={() => requestSort("createOn")}
								className="cursor-pointer text-center w-1/4"
							>
								วันที่สร้าง{" "}
								<ArrowUpDown className="inline-block ml-2" size={16} />
							</TableHead>
							<TableHead
								onClick={() => requestSort("name")}
								className="cursor-pointer text-center w-1/4"
							>
								ชื่อ <ArrowUpDown className="inline-block ml-2" size={16} />
							</TableHead>
							<TableHead
								onClick={() => requestSort("username")}
								className="cursor-pointer text-center w-1/4"
							>
								ชื่อผู้ใช้{" "}
								<ArrowUpDown className="inline-block ml-2" size={16} />
							</TableHead>
							<TableHead className="text-center w-1/4">ตัวเลือก</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell colSpan={4}>
									<Loading />
								</TableCell>
							</TableRow>
						) : sortedData.length === 0 ? (
							<TableRow>
								<TableCell colSpan={4}>
									<h2>ไม่พบข้อมูลผู้ใช้</h2>
								</TableCell>
							</TableRow>
						) : (
							paginatedData.map((item) => (
								<TableRow key={item._id}>
									<TableCell className="text-center">
										<div className="font-medium">
											{thDateTime(item.createOn).split(" ")[0]}
										</div>
										<div className="text-sm text-gray-500">
											{thDateTime(item.createOn).split(" ")[1]}
										</div>
									</TableCell>
									<TableCell className="text-center">{item.name}</TableCell>
									<TableCell className="text-center">{item.username}</TableCell>
									<TableCell className="text-center">
										<TooltipWrapper content="แก้ไขผู้ใช้">
											<div
												role="button"
												aria-label="แก้ไขผู้ใช้"
												tabIndex={0}
												onClick={() => openEditModal(item._id, item.name)}
												className="mr-2 cursor-pointer inline-flex items-center rounded-md p-2 hover:bg-primary-hover"
											>
												<Edit className="inline-block" size={16} />
											</div>
										</TooltipWrapper>
										<TooltipWrapper content="ลบผู้ใช้">
											<div
												role="button"
												className="mr-2 cursor-pointer inline-flex items-center rounded-md p-2 hover:bg-red-400"
												onClick={() => handleDelete(item._id)}
											>
												<Trash className="inline-block" size={16} />
											</div>
										</TooltipWrapper>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>

					{sortedData.length > 0 && (
						<TableFooter>
							<TableRow>
								<TableCell colSpan={4}>
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
					)}
				</Table>
			</div>

			<ModalUserEdit
				isOpen={modalOpen}
				setIsOpen={setModalOpen}
				onSubmit={handleEdit}
				initialName={
					currentUserId
						? data.find((user) => user._id === currentUserId)?.name
						: ""
				}
				isSubmitting={isSubmitting}
			/>
		</div>
	);
}
