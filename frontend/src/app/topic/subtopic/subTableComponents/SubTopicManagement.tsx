import React, { useState, useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
	TableFooter,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown } from "lucide-react";
import SubTableAction from "@/app/topic/subtopic/subTableComponents/SubTableActions";
import { ModalSubTopic } from "@/app/topic/subtopic/subTableComponents/ModalSubTopic";
import { SubtopicApi } from "@/lib/SubTopicApi";
import { Subtopic, SubtopicInput } from "@/types/subtopic";
import Pagination from "@/components/ui/Pagination";
import { useRouter } from "next/router";

interface SubtopicManagementProps {
	topicId: string;
}

const SubtopicManagementPage: React.FC<SubtopicManagementProps> = ({
	topicId,
}) => {
	const [subtopics, setSubtopics] = useState<Subtopic[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [sortConfig, setSortConfig] = useState<{
		key: keyof Subtopic;
		direction: "asc" | "desc";
	} | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
	const router = useRouter();
	const { name } = router.query;

	useEffect(() => {
		fetchSubtopics();
	}, [topicId]);

	const fetchSubtopics = async () => {
		try {
			const fetchedSubtopics = await SubtopicApi.getAllSubtopicsByTopicId(
				topicId
			);
			setSubtopics(fetchedSubtopics);
		} catch (error) {
			console.error("Error fetching subtopics:", error);
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

	const handleAdd = async (newSubtopic: SubtopicInput) => {
		try {
			const createdSubtopic = await SubtopicApi.createSubtopic({
				...newSubtopic,
				topicId,
			});
			setSubtopics([...subtopics, createdSubtopic]);
		} catch (error) {
			console.error("Error adding subtopic:", error);
		}
	};

	const handleEdit = async (id: string, updatedSubtopic: SubtopicInput) => {
		try {
			const updated = await SubtopicApi.updateSubtopic(id, updatedSubtopic);
			setSubtopics(subtopics.map((st) => (st._id === id ? updated : st)));
		} catch (error) {
			console.error("Error updating subtopic:", error);
		}
	};

	const handleDelete = async (id: string) => {
		try {
			await SubtopicApi.deleteSubtopic(id);
			setSubtopics(subtopics.filter((st) => st._id !== id));
		} catch (error) {
			console.error("Error deleting subtopic:", error);
		}
	};

	const totalPages = Math.ceil(filteredSubtopics.length / itemsPerPage);
	const paginatedData = filteredSubtopics.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	return (
		<div className="flex flex-col items-center py-10">
			<div className="w-11/12">
				<Table>
					<TableRow>
						<TableCell colSpan={3}>
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-lg font-bold">จัดการหัวข้อย่อย : {name}</h2>
								<div className="flex items-center gap-4">
									<Input
										placeholder="ค้นหา..."
										value={searchTerm}
										onChange={handleSearch}
									/>
									<Button onClick={() => setIsAddModalOpen(true)}>
										เพิ่มหัวข้อย่อย
									</Button>
								</div>
							</div>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="font-medium">หัวข้อย่อย</TableCell>
						<TableCell>
							จำนวนโจทย์{" "}
							<ArrowUpDown
								className="inline-block ml-2 cursor-pointer"
								size={16}
								onClick={() => requestSort("questionCount")}
							/>
						</TableCell>
						<TableCell>
							เวลา{" "}
							<ArrowUpDown
								className="inline-block ml-2 cursor-pointer"
								size={16}
								onClick={() => requestSort("time")}
							/>
						</TableCell>
						<TableCell>Action</TableCell>
					</TableRow>
					<TableBody>
						{paginatedData.map((subtopic) => (
							<TableRow key={subtopic._id}>
								<TableCell>{subtopic.subtopicName}</TableCell>
								<TableCell>{subtopic.questionCount}</TableCell>
								<TableCell>{subtopic.time}</TableCell>
								<SubTableAction
									id={subtopic._id}
									onEdit={(updatedData) =>
										handleEdit(subtopic._id, updatedData)
									}
									initialData={{
										subtopicName: subtopic.subtopicName,
										time: subtopic.time,
										category: subtopic.category,
										topicId: subtopic.topicId,
									}}
								/>
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
									totalItems={filteredSubtopics.length}
								/>
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
			<ModalSubTopic
				isOpen={isAddModalOpen}
				setIsOpen={setIsAddModalOpen}
				mode="add"
				onSubmit={handleAdd}
			/>
		</div>
	);
};

export default SubtopicManagementPage;
