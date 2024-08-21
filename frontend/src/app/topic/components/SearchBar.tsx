import { Input } from "@/components/ui/input";
import { TopicModal } from "@/app/topic/components/ModalTopicAdd";
import { useState } from "react";

const SearchBar = ({
	searchTerm,
	setSearchTerm,
}: {
	searchTerm: string;
	setSearchTerm: (value: string) => void;
}) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<div className="flex gap-4">
			<Input
				className="w-64"
				placeholder="ค้นหา"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<TopicModal isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
		</div>
	);
};

export default SearchBar;
