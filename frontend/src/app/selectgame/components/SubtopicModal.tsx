import React, { useState, useEffect } from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
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

	const handleSubtopicClick = (subtopicId: string) => {
		router.push(`/game/${subtopicId}`);
		onClose();
	};

	return (
		<React.Fragment>
			<Modal open={isOpen} onClose={onClose}>
				<ModalDialog
					className={`animate-slide-down`}
					variant="outlined"
					role="alertdialog"
				>
					<ModalClose />
					<DialogTitle>{topic.topicName}</DialogTitle>
					<Divider />
					{subtopics.map((subtopic) => (
						<Button
							key={subtopic._id}
							sx={{
								backgroundColor: "#bae6fd",
								color: "#082f49",
								"&:hover": {
									backgroundColor: "#7dd3fc",
								},
							}}
							onClick={() => handleSubtopicClick(subtopic._id)}
						>
							{subtopic.subtopicName}
						</Button>
					))}
				</ModalDialog>
			</Modal>
		</React.Fragment>
	);
};

export default SubtopicModal;
