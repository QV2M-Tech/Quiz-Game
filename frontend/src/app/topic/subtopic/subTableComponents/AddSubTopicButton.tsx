// AddTopicButton.tsx
import { useState } from "react";

import { SubtopicModal } from "../subTableComponents/AddSubTopicModal";

const AddSubTopicButton = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<>
			<SubtopicModal isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
		</>
	);
};

export default AddSubTopicButton;
