import React, { useState } from "react";
import {
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TableFooter,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import SearchBar from "@/app/topic/tableComponents/SearchBar";
import { Topic, TopicInput } from "@/types/topic";
import Pagination from "@/components/ui/Pagination";
import CategoryBadge from "@/components/ui/badge/CategoryBadge";
import TableActions from "@/app/topic/tableComponents/TableActions";
import ModalTopicForm from "./ModalTopicForm";
import { useTopicManagement } from "@/hooks/useTopicManagement";

const TopicManagementPage: React.FC = () => {
	const { topics, isLoading, error, createTopic, updateTopic, deleteTopic } =
		useTopicManagement();
	const [searchTerm, setSearchTerm] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const itemsPerPage = 10;

	const handleTopicSubmit = async (data: TopicInput) => {
		setIsSubmitting(true);
		try {
			if (selectedTopic) {
				await updateTopic(selectedTopic._id, data);
			} else {
				await createTopic(data);
			}
			setIsModalOpen(false);
			setSelectedTopic(null);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDeleteTopic = async (id: string) => {
		setIsDeleting(true);
		try {
			await deleteTopic(id);
		} finally {
			setIsDeleting(false);
		}
	};

	const openModal = (topic?: Topic) => {
		setSelectedTopic(topic || null);
		setIsModalOpen(true);
	};

	const filteredTopics = topics.filter(
		(topic) =>
			topic.topicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			topic.category.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const totalPages = Math.ceil(filteredTopics.length / itemsPerPage);
	const paginatedData = filteredTopics.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="flex flex-col items-center py-10">
			<div className="w-11/12">
				<Table>
					<TableRow>
						<TableCell colSpan={3}>
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-lg font-bold">จัดการหัวข้อ</h2>
								<div className="flex items-center gap-4">
									<SearchBar
										searchTerm={searchTerm}
										setSearchTerm={setSearchTerm}
									/>
									<Button
										className="bg-secondary text-white"
										onClick={() => openModal()}
									>
										เพิ่มหัวข้อ
									</Button>
								</div>
							</div>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableHead className="w-3/5 text-center">หัวข้อ</TableHead>
						<TableHead className="cursor-pointer w-1/5">
							<div className="flex items-center justify-center">
								หมวดหมู่ <ArrowUpDown className="ml-2" size={16} />
							</div>
						</TableHead>
						<TableHead className="w-1/5 text-center">Action</TableHead>
					</TableRow>
					<TableBody>
						{paginatedData.map((topic) => (
							<TableRow key={topic._id}>
								<TableCell>{topic.topicName}</TableCell>
								<TableCell>
									<CategoryBadge
										category={topic.category as "วิชาการ" | "บันเทิง"}
									/>
								</TableCell>
								<TableCell>
									<TableActions
										topicId={topic._id}
										onEdit={() => openModal(topic)}
										onDelete={() => handleDeleteTopic(topic._id)}
										isDeleting={isDeleting}
									/>
								</TableCell>
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
									totalItems={filteredTopics.length}
								/>
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
			<ModalTopicForm
				isOpen={isModalOpen}
				setIsOpen={setIsModalOpen}
				onSubmit={handleTopicSubmit}
				initialData={selectedTopic || undefined}
				isSubmitting={isSubmitting}
			/>
		</div>
	);
};

export default TopicManagementPage;
