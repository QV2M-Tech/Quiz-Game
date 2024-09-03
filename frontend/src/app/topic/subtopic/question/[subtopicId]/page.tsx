"use client";

import React from "react";
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
			<QuestionManagement subtopicId={subtopicId} topicId="" topicName="" />
		</div>
	);
};

export default Page;
