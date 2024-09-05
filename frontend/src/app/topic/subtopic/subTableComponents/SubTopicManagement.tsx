// src/app/topic/subtopic/subTableComponents/SubTopicManagement.tsx

import React, { useState, useEffect } from "react";
import {
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableRow,
	TableFooter,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, ChevronLeft } from "lucide-react";
import SubTableAction from "@/app/topic/subtopic/subTableComponents/SubTableActions";
import { ModalSubTopic } from "@/app/topic/subtopic/subTableComponents/ModalSubTopic";
import { SubTopicApi } from "@/lib/SubTopicApi";
import { TopicApi } from "@/lib/TopicApi";
import { Subtopic, SubtopicInput } from "@/types/SubTopic";
import { Topic } from "@/types/Topic";
import Pagination from "@/components/ui/Pagination";
import { useRouter } from "next/navigation";

interface SubtopicManagementProps {
	topicId: string;
}

const SubtopicManagementPage: React.FC<SubtopicManagementProps> = ({
	topicId,
}) => {
	const router = useRouter();
	const [subtopics, setSubtopics] = useState<Subtopic[]>([]);
	const [topic, setTopic] = useState<Topic | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [sortConfig, setSortConfig] = useState<{
		key: keyof Subtopic;
		direction: "asc" | "desc";
	} | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [isMounted, setIsMounted] = useState(false);
	const itemsPerPage = 10;
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [editingSubtopic, setEditingSubtopic] = useState<Subtopic | null>(null);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (isMounted) {
			fetchTopicAndSubtopics();
		}
	}, [topicId, isMounted]);

	const fetchTopicAndSubtopics = async () => {
		try {
			const [fetchedTopic, fetchedSubtopics] = await Promise.all([
				TopicApi.getTopicById(topicId),
				SubTopicApi.getAllSubtopicsByTopicId(topicId),
			]);
			setTopic(fetchedTopic);
			setSubtopics(fetchedSubtopics);
		} catch (error) {
			console.error("Error fetching topic and subtopics:", error);
		}
	};

	const requestSort = (key: keyof Subtopic) => {
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

	const sortedSubtopics = React.useMemo(() => {
		let sortableSubtopics = [...subtopics];
		if (sortConfig !== null) {
			sortableSubtopics.sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key]) {
					return sortConfig.direction === "asc" ? -1 : 1;
				}
				if (a[sortConfig.key] > b[sortConfig.key]) {
					return sortConfig.direction === "asc" ? 1 : -1;
				}
				return 0;
			});
		}
		return sortableSubtopics;
	}, [subtopics, sortConfig]);

	const filteredSubtopics = sortedSubtopics.filter((subtopic) =>
		subtopic.subtopicName.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleAddSubtopic = async (subtopicInput: SubtopicInput) => {
		console.log("Adding subtopic:", subtopicInput);
		try {
			const result = await SubTopicApi.createSubtopic({
				...subtopicInput,
				topicId: topicId, // Ensure topicId is always set
				_id: "", // Set to empty string for new subtopics
			});
			console.log("Subtopic added:", result);
			await fetchTopicAndSubtopics();
		} catch (error) {
			console.error("Error adding subtopic:", error);
		}
	};

	const handleEditSubtopic = async (subtopicInput: SubtopicInput) => {
		try {
			await SubTopicApi.updateSubtopic(subtopicInput._id, subtopicInput);
			await fetchTopicAndSubtopics();
		} catch (error) {
			console.error("Error editing subtopic:", error);
		}
	};

	const handleDeleteSubtopic = async (subtopicId: string) => {
		try {
			await SubTopicApi.deleteSubtopic(subtopicId);
			await fetchTopicAndSubtopics();
		} catch (error) {
			console.error("Error deleting subtopic:", error);
		}
	};

	const currentSubtopics = filteredSubtopics.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const totalPages = Math.ceil(filteredSubtopics.length / itemsPerPage);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<div className="flex flex-col items-center py-10">
			<div className="w-11/12">
				<Table>
					<TableRow>
						<TableCell colSpan={3}>
							<div className="flex items-center justify-between mb-4 w-full">
								{/* Left side content */}
								<div className="flex items-center">
									<Button
										variant="ghost"
										size="sm"
										onClick={() => router.back()}
									>
										<ChevronLeft
											strokeWidth={3}
											absoluteStrokeWidth
											className="inline-block"
											size={32}
										/>
									</Button>
									<h1 className=" ml-2">
										การจัดการหัวข้อย่อย: {topic?.topicName}
									</h1>
								</div>

								{/* Right side content */}
								<div className="flex items-center gap-4">
									<Input
										type="text"
										placeholder="ค้นหาหัวข้อย่อย"
										value={searchTerm}
										onChange={handleSearch}
									/>
									<Button
										className="bg-secondary hover:bg-secondary-hover text-white"
										onClick={() => setIsAddModalOpen(true)}
									>
										เพิ่มหัวข้อย่อย
									</Button>
								</div>
							</div>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableHead className="w-3/5">
							<div className="flex items-center justify-center">
								ชื่อหัวข้อย่อย
							</div>
						</TableHead>
						<TableHead className="w-1/5">
							<div
								className="flex items-center justify-center"
								onClick={() => requestSort("time")}
							>
								เวลา (นาที) <ArrowUpDown className="ml-2 h-4 w-4" />
							</div>
						</TableHead>
						<TableHead className="w-1/5 text-center">ตัวเลือก</TableHead>
					</TableRow>
					<TableBody>
						{currentSubtopics.map((subtopic) => (
							<TableRow key={subtopic._id}>
								<TableCell>{subtopic.subtopicName}</TableCell>
								<TableCell>{subtopic.time}</TableCell>
								<TableCell>
									<SubTableAction
										subtopicId={subtopic._id}
										onEdit={() => {
											setEditingSubtopic(subtopic);
											setIsEditModalOpen(true);
										}}
										onDelete={() => handleDeleteSubtopic(subtopic._id)}
										initialData={subtopic}
										subtopicName={""}
										isDeleting={false}
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					{filteredSubtopics.length > 0 && (
						<TableFooter>
							<TableRow>
								<TableCell colSpan={3}>
									<Pagination
										currentPage={currentPage}
										totalPages={totalPages}
										onPageChange={handlePageChange}
										itemsPerPage={itemsPerPage}
										totalItems={filteredSubtopics.length}
									/>
								</TableCell>
							</TableRow>
						</TableFooter>
					)}
				</Table>
				<ModalSubTopic
					isOpen={isAddModalOpen}
					setIsOpen={setIsAddModalOpen}
					mode="add"
					onSubmit={handleAddSubtopic}
					initialData={{ topicId: topicId }}
				/>
				{editingSubtopic && (
					<ModalSubTopic
						isOpen={isEditModalOpen}
						setIsOpen={setIsEditModalOpen}
						mode="edit"
						initialData={editingSubtopic}
						onSubmit={handleEditSubtopic}
					/>
				)}
			</div>
		</div>
	);
};

export default SubtopicManagementPage;
