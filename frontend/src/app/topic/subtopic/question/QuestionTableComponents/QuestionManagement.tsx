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
import { ArrowUpDown } from "lucide-react";
import Pagination from "@/components/ui/Pagination";
import QuestionModal from "./QuestionModal";
import { QuestionApi } from "@/lib/questionAPI";
import { Question, FormData } from "@/types/Question";
import QuestionAction from "./QuestionAction";
import SearchBar from "@/app/topic/tableComponents/SearchBar";
import { Subtopic } from "@/types/SubTopic";

interface QuestionManagementProps {
	topicId: string;
	subtopicId: string;
}

const QuestionManagement: React.FC<QuestionManagementProps> = ({
	topicId,
	subtopicId,
}) => {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [sortConfig, setSortConfig] = useState({
		key: "updatedAt",
		direction: "desc",
	});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingQuestion, setEditingQuestion] = useState<FormData | null>(null);
	const itemsPerPage = 10;
	const [isMounted, setIsMounted] = useState(false); // New isMounted state

	useEffect(() => {
		setIsMounted(true); // Set isMounted to true when the component mounts
	}, []);

	useEffect(() => {
		if (isMounted) {
			fetchQuestionsData();
		}
	}, [subtopicId, isMounted]);

	const fetchQuestionsData = async () => {
		setIsLoading(true);
		try {
			const data = await QuestionApi.fetchQuestions(subtopicId);
			setQuestions(data);
			setError(null);
		} catch (err) {
			setError("Failed to fetch questions. Please try again later.");
			console.error("Error fetching questions:", err);
		} finally {
			setIsLoading(false);
		}
	};

	const requestSort = (key: string) => {
		let direction = "asc";
		if (sortConfig.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });
	};

	const sortedQuestions = React.useMemo(() => {
		let sortableQuestions = [...questions];
		if (sortConfig !== null) {
			sortableQuestions.sort((a, b) => {
				if (
					a[sortConfig.key as keyof Question] <
					b[sortConfig.key as keyof Question]
				) {
					return sortConfig.direction === "asc" ? -1 : 1;
				}
				if (
					a[sortConfig.key as keyof Question] >
					b[sortConfig.key as keyof Question]
				) {
					return sortConfig.direction === "asc" ? 1 : -1;
				}
				return 0;
			});
		}
		return sortableQuestions;
	}, [questions, sortConfig]);

	const filteredQuestions = sortedQuestions.filter((question) =>
		question.questionName.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const paginatedQuestions = filteredQuestions.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
		setCurrentPage(1);
	};

	const handleEdit = (question: Question) => {
		setEditingQuestion(QuestionApi.questionToFormData(question));
		setIsModalOpen(true);
	};

	const handleDelete = async (id: string) => {
		if (window.confirm("Are you sure you want to delete this question?")) {
			try {
				await QuestionApi.deleteQuestion(id);
				fetchQuestionsData();
			} catch (err) {
				console.error("Error deleting question:", err);
				alert("Failed to delete question. Please try again.");
			}
		}
	};

	const handleAddQuestion = () => {
		setEditingQuestion(null);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setEditingQuestion(null);
	};

	const handleModalSubmit = async (formData: FormData) => {
		try {
			if (editingQuestion && editingQuestion._id) {
				await QuestionApi.updateQuestion(
					editingQuestion._id,
					QuestionApi.formDataToQuestion(formData)
				);
			} else {
				await QuestionApi.createQuestion(
					QuestionApi.formDataToQuestion(formData, subtopicId)
				);
			}
			fetchQuestionsData();
			handleModalClose();
		} catch (err) {
			console.error("Error saving question:", err);
			alert("Failed to save question. Please try again.");
		}
	};

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="flex flex-col items-center py-10">
			<div className="w-11/12">
				<Table>
					<TableRow>
						<TableCell colSpan={3}>
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-lg font-bold">จัดการโจทย์: {subtopicId}</h2>
								<div className="flex items-center gap-4">
									<SearchBar
										searchTerm={searchTerm}
										setSearchTerm={setSearchTerm}
									/>
									<Button
										className="bg-secondary text-white"
										onClick={handleAddQuestion}
									>
										เพิ่มโจทย์
									</Button>
								</div>
							</div>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableHead
							className="w-2/12 cursor-pointer"
							onClick={() => requestSort("updatedAt")}
						>
							<div className="flex items-center justify-center">
								วันที่แก้ไขล่าสุด <ArrowUpDown className="ml-2" size={16} />
							</div>
						</TableHead>
						<TableHead className="w-8/12">คำถาม</TableHead>
						<TableHead className="w-2/12 text-center">การดำเนินการ</TableHead>
					</TableRow>
					<TableBody>
						{paginatedQuestions.map((question) => (
							<TableRow key={question._id}>
								<TableCell>
									{new Date(question.updatedAt).toLocaleDateString()}
								</TableCell>
								<TableCell>{question.questionName}</TableCell>
								<TableCell>
									<QuestionAction
										question={question}
										onEdit={() => handleEdit(question)}
										onDelete={() => handleDelete(question._id)}
										isOpen={false}
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
									itemsPerPage={0}
									totalItems={0}
								/>
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
				<QuestionModal
					isOpen={isModalOpen}
					onClose={handleModalClose}
					onSubmit={handleModalSubmit}
					initialData={editingQuestion}
					mode={"add"}
				/>
			</div>
		</div>
	);
};

export default QuestionManagement;
