import React, { useState, useEffect } from "react";
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
import { Topic } from "@/types/topic";
import Pagination from "@/components/ui/Pagination";
import CategoryBadge from "@/components/ui/badge/CategoryBadge";
import TableActions from "@/app/topic/tableComponents/TableActions";
import ModalTopicForm from "./ModalTopicForm";
import { TopicApi } from "@/lib/TopicApi";

const TopicManagementPage = () => {
	const [topics, setTopics] = useState<Topic[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isDeleting, setIsDeleting] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	useEffect(() => {
		fetchTopics();
	}, []);

	const fetchTopics = async () => {
		setIsLoading(true);
		try {
			const fetchedTopics = await TopicApi.getAllTopics();
			setTopics(fetchedTopics);
		} catch (error) {
			console.error("Failed to fetch topics:", error);
			// Here you can add user-friendly error handling, e.g., showing an error message
		} finally {
			setIsLoading(false);
		}
	};

	const handleTopicSubmit = async (data: {
		title: string;
		category: string;
	}) => {
		setIsSubmitting(true);
		try {
			if (selectedTopic) {
				// Edit existing topic
				await TopicApi.updateTopic(selectedTopic.id, {
					topicName: data.title,
					category: data.category,
				});
			} else {
				// Add new topic
				await TopicApi.createTopic({
					topicName: data.title,
					category: data.category,
				});
			}
			setIsModalOpen(false);
			setSelectedTopic(null);
			await fetchTopics(); // Refresh the topics list
		} catch (error) {
			console.error("Failed to submit topic:", error);
			// Here you can add user-friendly error handling, e.g., showing an error message
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDeleteTopic = async (id: string) => {
		setIsDeleting(id);
		try {
			await TopicApi.deleteTopic(id);
			await fetchTopics(); // Refresh the topics list
		} catch (error) {
			console.error("Failed to delete topic:", error);
			// Here you can add user-friendly error handling, e.g., showing an error message
		} finally {
			setIsDeleting(null);
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

	const requestSort = (key: keyof Topic) => {
		// Add sorting logic here if needed
	};

	if (isLoading) {
		return <div>Loading...</div>;
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
										disabled={isSubmitting}
									>
										{isSubmitting ? "กำลังเพิ่ม..." : "เพิ่มหัวข้อ"}
									</Button>
								</div>
							</div>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableHead className="w-3/5 text-center">หัวข้อ</TableHead>
						<TableHead
							onClick={() => requestSort("category")}
							className="cursor-pointer w-1/5"
						>
							<div className="flex items-center justify-center">
								หมวดหมู่ <ArrowUpDown className="ml-2" size={16} />
							</div>
						</TableHead>
						<TableHead className="w-1/5 text-center">Action</TableHead>
					</TableRow>
					<TableBody>
						{paginatedData.map((topic) => (
							<TableRow key={topic.id}>
								<TableCell>{topic.topicName}</TableCell>
								<TableCell>
									<CategoryBadge
										category={topic.category as "วิชาการ" | "บันเทิง"}
									/>
								</TableCell>
								<TableCell>
									<TableActions
										topicId={topic.id}
										onEdit={() => openModal(topic)}
										onDelete={() => handleDeleteTopic(topic.id)}
										isDeleting={isDeleting === topic.id}
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
