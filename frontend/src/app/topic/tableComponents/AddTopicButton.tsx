// AddTopicButton.tsx
import { useState } from "react";

import { TopicModal } from "@/app/topic/tableComponents/ModalTopicAdd";

const AddTopicButton = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<>
			<TopicModal isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
		</>
	);
};

export default AddTopicButton;
