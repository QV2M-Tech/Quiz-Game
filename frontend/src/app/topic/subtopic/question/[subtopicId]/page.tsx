"use client";
import QuestionManagement from "../QuestionTableComponents/QuestionManagement";

interface PageProps {
	params: {
		subtopicId: string;
	};
}

const Page: React.FC<PageProps> = ({ params }) => {
	const { subtopicId } = params;
	return (
		<div>
			<QuestionManagement subtopicId={subtopicId} topicId={""} />
		</div>
	);
};

export default Page;
