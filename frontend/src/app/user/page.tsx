"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	Table2,
	Table2Body,
	Table2Cell,
	Table2Footer,
	Table2Head,
	Table2Header,
	Table2Row,
} from "@/components/ui/userPage/table2";
import Pagination from "@/components/ui/Pagination";
import { Input } from "@/components/ui/input";
import { ArrowUpDown } from "lucide-react";
import { Edit, Trash } from "lucide-react";
import ModalUserEdit from "./components/ModalUserEdit";
import { Button } from "@/components/ui/button";

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
				const response = await axios.get<User[]>(
					"http://localhost:6969/api/users"
				);
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
			await axios.patch(`http://localhost:6969/api/users/${currentUserId}`, {
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
			await axios.delete(`http://localhost:6969/api/users/${userId}`);
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

	if (isLoading) {
		return <div>กำลังโหลด...</div>;
	}

	return (
		<div className="flex flex-col items-center py-10">
			<div className="w-11/12">
				<Table2>
					<Table2Header>
						<Table2Row>
							<Table2Cell colSpan={8}>
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
							</Table2Cell>
						</Table2Row>
						<Table2Row>
							<Table2Head
								onClick={() => requestSort("createOn")}
								className="cursor-pointer text-center"
							>
								วันที่สร้าง{" "}
								<ArrowUpDown className="inline-block ml-2" size={16} />
							</Table2Head>
							<Table2Head
								onClick={() => requestSort("name")}
								className="cursor-pointer text-center"
							>
								ชื่อ <ArrowUpDown className="inline-block ml-2" size={16} />
							</Table2Head>
							<Table2Head
								onClick={() => requestSort("username")}
								className="cursor-pointer text-center"
							>
								ชื่อผู้ใช้{" "}
								<ArrowUpDown className="inline-block ml-2" size={16} />
							</Table2Head>
							<Table2Head className="text-center">ตัวเลือก</Table2Head>
						</Table2Row>
					</Table2Header>

					<Table2Body>
						{paginatedData.map((item) => (
							<Table2Row key={item._id}>
								<Table2Cell className="text-center">
									{new Date(item.createOn).toLocaleDateString()}
								</Table2Cell>
								<Table2Cell className="text-center">{item.name}</Table2Cell>
								<Table2Cell className="text-center">{item.username}</Table2Cell>
								<Table2Cell className="text-center flex justify-center gap-2">
									<Button
										onClick={() => openEditModal(item._id, item.name)}
										className="bg-white "
									>
										<Edit size={16} />
									</Button>
									<Button
										onClick={() => handleDelete(item._id)}
										className=" bg-white "
									>
										<Trash size={16} />
									</Button>
								</Table2Cell>
							</Table2Row>
						))}
					</Table2Body>

					<Table2Footer>
						<Table2Row>
							<Table2Cell colSpan={8}>
								<Pagination
									currentPage={currentPage}
									totalPages={totalPages}
									onPageChange={setCurrentPage}
									itemsPerPage={itemsPerPage}
									totalItems={sortedData.length}
								/>
							</Table2Cell>
						</Table2Row>
					</Table2Footer>
				</Table2>
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
