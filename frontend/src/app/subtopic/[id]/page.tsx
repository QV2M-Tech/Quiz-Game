"use client";
import SubtopicManagementPage from "../subTableComponents/SubTopicManagement";

interface PostProps {
	params: {
		id: string;
	};
}

const Post: React.FC<PostProps> = ({ params }) => {
	const { id } = params;

	return (
		<div>
			<SubtopicManagementPage topicId={id} />
		</div>
	);
};

export default Post;
