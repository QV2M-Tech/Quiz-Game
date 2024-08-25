"use client";

import { useParams } from "next/navigation";
import SubtopicManagementPage from "@/app/subtopic/subTableComponents/SubTopicManagement";

const SubtopicsPage = () => {
	const params = useParams();
	const topicId = params.topicId as string;

	if (!topicId) {
		return <div>Error: Topic ID is missing</div>;
	}

	return <SubtopicManagementPage topicId={topicId} />;
};

export default SubtopicsPage;
