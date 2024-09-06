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
import QuestionAction from "./QuestionAction";
import QuestionModal from "../QuestionTableComponents/QuestionModal";
import { ArrowUpDown, ChevronLeft } from "lucide-react";
import { QuestionApi } from "@/lib/questionAPI";
import { SubTopicApi } from "@/lib/SubTopicApi";
import { Question, QuestionInput } from "@/types/Question";
import { Subtopic } from "@/types/SubTopic";
import Pagination from "@/components/ui/Pagination";

import router from "next/router";

interface QuestionFormData {
	_id?: string;
	questionName: string;
	option1: string;
	option2: string;
	option3: string;
	option4: string;
	correctAnswer: string;
	hint: string;
}

interface QuestionManagementProps {
	topicId: string;
	subtopicId: string;
	topicName: string;
	createOn?: string;
}

const QuestionManagement: React.FC<QuestionManagementProps> = ({
	topicId,
	subtopicId,
	topicName,
}) => {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [subtopic, setSubtopic] = useState<Subtopic | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [isMounted, setIsMounted] = useState(false);
	const itemsPerPage = 10;
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [editingQuestion, setEditingQuestion] =
		useState<QuestionFormData | null>(null);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		if (isMounted) {
			fetchSubtopicAndQuestions();
		}
	}, [subtopicId, isMounted]);

	const fetchSubtopicAndQuestions = async () => {
		try {
			console.log("666");
			const [fetchedSubtopic, fetchedQuestions] = await Promise.all([
				SubTopicApi.getSubtopicById(subtopicId),
				QuestionApi.getQuestionsBySubtopicId(subtopicId),
			]);
			console.log("777");
			setSubtopic(fetchedSubtopic);
			setQuestions(fetchedQuestions);
		} catch (error) {
			console.error("Error fetching subtopic and questions:", error);
		}
	};

	const filteredQuestions = questions.filter((question) =>
		question.questionName.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const questionToFormData = (question: Question): QuestionFormData => {
		const options = question.option || [];
		return {
			_id: question._id,
			questionName: question.questionName,
			option1: options[0]?.text || "",
			option2: options[1]?.text || "",
			option3: options[2]?.text || "",
			option4: options[3]?.text || "",
			correctAnswer: options.length
				? options.findIndex((opt) => opt.isCorrect).toString()
				: "",
			hint: question.hint,
		};
	};

	const handleAddQuestion = async (data: QuestionInput) => {
		try {
			await QuestionApi.createQuestion(data);
			await fetchSubtopicAndQuestions();
			setIsAddModalOpen(false);
		} catch (error) {
			console.error("Error adding question:", error);
		}
	};

	const handleEditQuestion = async (data: QuestionInput) => {
		if (!data._id) return;
		try {
			await QuestionApi.updateQuestion(data._id, data);
			await fetchSubtopicAndQuestions();
			setIsEditModalOpen(false);
		} catch (error) {
			console.error("Error editing question:", error);
		}
	};

	const handleDeleteQuestion = async (questionId: string) => {
		try {
			await QuestionApi.deleteQuestion(questionId);
			await fetchSubtopicAndQuestions();
		} catch (error) {
			console.error("Error deleting question:", error);
		}
	};

	const currentQuestions = filteredQuestions.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);

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
										การจัดการโจทย์: {subtopic?.subtopicName}
									</h1>
								</div>

								{/* Right side content */}
								<div className="flex items-center gap-4">
									<Input
										type="text"
										placeholder="ค้นหาหัวโจทย์"
										value={searchTerm}
										onChange={handleSearch}
									/>
									<Button
										className="bg-secondary hover:bg-secondary-hover text-white"
										onClick={() => setIsAddModalOpen(true)}
									>
										เพิ่มโจทย์
									</Button>
								</div>
							</div>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableHead className="w-3/5">
							<div className="flex items-center justify-center">ชื่อโจทย์</div>
						</TableHead>
						<TableHead className="w-1/5">
							<div className="flex items-center justify-center">
								วันที่สร้างโจทย์
							</div>
						</TableHead>
						<TableHead className="w-1/5 text-center">ตัวเลือก</TableHead>
					</TableRow>
					<TableBody>
						{currentQuestions.map((question) => (
							<TableRow key={question._id}>
								<TableCell>{question.questionName}</TableCell>
								<TableCell>
									{question.createOn
										? new Date(question.createOn).toLocaleDateString()
										: "N/A"}
								</TableCell>
								<TableCell>
									<QuestionAction
										question={question}
										onEdit={() => {
											setEditingQuestion(questionToFormData(question));
											setIsEditModalOpen(true);
										}}
										onDelete={() => handleDeleteQuestion(question._id)}
										isOpen={isEditModalOpen}
										initialData={question}
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					{filteredQuestions.length > 0 && (
						<TableFooter>
							<TableRow>
								<TableCell colSpan={3}>
									<Pagination
										currentPage={currentPage}
										totalPages={totalPages}
										onPageChange={handlePageChange}
										itemsPerPage={itemsPerPage}
										totalItems={filteredQuestions.length}
									/>
								</TableCell>
							</TableRow>
						</TableFooter>
					)}
				</Table>
				<QuestionModal
					isOpen={isAddModalOpen}
					setIsOpen={setIsAddModalOpen}
					mode="add"
					onSubmit={handleAddQuestion}
					subtopicId={subtopicId}
					onClose={() => setIsAddModalOpen(false)}
				/>
				{editingQuestion && (
					<QuestionModal
						isOpen={isEditModalOpen}
						setIsOpen={setIsEditModalOpen}
						mode="edit"
						initialData={{
							...editingQuestion,
							option: [
								{
									text: editingQuestion.option1,
									isCorrect: editingQuestion.correctAnswer === "0",
								},
								{
									text: editingQuestion.option2,
									isCorrect: editingQuestion.correctAnswer === "1",
								},
								{
									text: editingQuestion.option3,
									isCorrect: editingQuestion.correctAnswer === "2",
								},
								{
									text: editingQuestion.option4,
									isCorrect: editingQuestion.correctAnswer === "3",
								},
							],
							subtopicId: subtopicId,
						}}
						onSubmit={handleEditQuestion}
						subtopicId={subtopicId}
						onClose={() => setIsEditModalOpen(false)}
					/>
				)}
			</div>
		</div>
	);
};

export default QuestionManagement;
