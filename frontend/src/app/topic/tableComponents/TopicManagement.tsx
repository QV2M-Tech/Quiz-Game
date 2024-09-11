import React, { useState } from "react";
import {
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TableFooter,
	TableHeader,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Topic, TopicInput } from "@/types/Topic";
import Pagination from "@/components/ui/Pagination";
import CategoryBadge from "@/components/ui/badge/CategoryBadge";
import TableActions from "@/app/topic/tableComponents/TableActions";
import ModalTopicForm from "./ModalTopicForm";
import { useTopicManagement } from "@/hooks/useTopicManagement";
import Loading from "@/components/ui/Loading";
import { Input } from "@/components/ui/input";

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

	return (
		<div className="flex flex-col items-center py-10">
			<div className="w-11/12">
				<Table>
					<TableHeader>
						<TableRow>
							<TableCell colSpan={3}>
								<div className="flex justify-between items-center">
									<h2 className="font-bold">จัดการหัวข้อ</h2>
									<div className="flex gap-4">
										<Input
											className="w-64"
											placeholder="ค้นหา"
											value={searchTerm}
											onChange={(e) => setSearchTerm(e.target.value)}
										/>
										<div
											className=" bg-secondary hover:bg-secondary-hover text-white px-4 py-2 cursor-pointer"
											onClick={() => openModal()}
										>
											เพิ่มหัวข้อ
										</div>
									</div>
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableHead className="text-center w-1/3">หัวข้อ</TableHead>
							<TableHead className="text-center w-1/3">หมวดหมู่</TableHead>
							<TableHead className="text-center w-1/3">ตัวเลือก</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell colSpan={3}>
									<Loading />
								</TableCell>
							</TableRow>
						) : filteredTopics.length === 0 ? (
							<TableRow>
								<TableCell colSpan={3}>
									<h2>ไม่พบข้อมูลหัวข้อ</h2>
								</TableCell>
							</TableRow>
						) : (
							paginatedData.map((topic) => (
								<TableRow key={topic._id}>
									<TableCell>{topic.topicName}</TableCell>
									<TableCell>
										<CategoryBadge category={topic.category} />
									</TableCell>
									<TableCell>
										<TableActions
											topicId={topic._id}
											onEdit={() => openModal(topic)}
											onDelete={() => handleDeleteTopic(topic._id)}
											isDeleting={isDeleting}
											topicName={""}
											category={""}
										/>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>

					{filteredTopics.length > 0 && (
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
					)}
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
