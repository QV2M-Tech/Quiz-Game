import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { Topic } from "@/types/Topic";
import { Subtopic } from "@/types/SubTopic";
import { SubtopicApi } from "@/lib/SubTopicApi";
import { useRouter } from "next/navigation";

interface SubtopicModalProps {
	isOpen: boolean;
	onClose: () => void;
	topic: Topic;
}

const SubtopicModal: React.FC<SubtopicModalProps> = ({
	isOpen,
	onClose,
	topic,
}) => {
	const [subtopics, setSubtopics] = useState<Subtopic[]>([]);
	const router = useRouter();

	useEffect(() => {
		const fetchSubtopics = async () => {
			try {
				const fetchedSubtopics = await SubtopicApi.getAllSubtopicsByTopicId(
					topic._id
				);
				setSubtopics(fetchedSubtopics);
			} catch (error) {
				console.error("Error fetching subtopics:", error);
			}
		};

		if (isOpen) {
			fetchSubtopics();
		}
	}, [isOpen, topic._id]);

	const handleSubtopicClick = (subtopic: Subtopic) => {
		router.push(`/game/${subtopic._id}`);
		onClose();
	};

	return (
		<Modal
			open={isOpen}
			onClose={onClose}
			aria-labelledby="subtopic-modal-title"
		>
			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: 400,
					bgcolor: "background.paper",
					boxShadow: 24,
					p: 4,
					borderRadius: 2,
				}}
			>
				<Typography
					id="subtopic-modal-title"
					variant="h6"
					component="h2"
					gutterBottom
				>
					{topic.topicName}
				</Typography>
				<Box sx={{ mt: 2, maxHeight: 300, overflowY: "auto" }}>
					{subtopics.map((subtopic) => (
						<Button
							key={subtopic._id}
							fullWidth
							variant="contained"
							sx={{
								mb: 1,
								backgroundColor: "#bae6fd",
								color: "#082f49",
								"&:hover": { backgroundColor: "#7dd3fc" },
							}}
							onClick={() => handleSubtopicClick(subtopic)}
						>
							{subtopic.subtopicName}
						</Button>
					))}
				</Box>
				<Button onClick={onClose} sx={{ mt: 2 }}>
					Close
				</Button>
			</Box>
		</Modal>
	);
};

export default SubtopicModal;
