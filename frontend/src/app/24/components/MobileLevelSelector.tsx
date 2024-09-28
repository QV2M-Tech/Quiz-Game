import React from "react";
import { Button } from "@/components/ui/button";

interface MobileLevelSelectorProps {
	level: string;
	onLevelChange: (newLevel: string) => void;
}

const MobileLevelSelector: React.FC<MobileLevelSelectorProps> = ({
	level,
	onLevelChange,
}) => {
	return (
		<div className="flex justify-center gap-2 mb-4">
			<Button
				className={`px-2 py-1 ${
					level === "easy"
						? "bg-secondary text-white"
						: "bg-white text-secondary"
				}`}
				onClick={() => onLevelChange("easy")}
			>
				ง่าย
			</Button>
			<Button
				className={`px-2 py-1 ${
					level === "medium"
						? "bg-secondary text-white"
						: "bg-white text-secondary"
				}`}
				onClick={() => onLevelChange("medium")}
			>
				ปานกลาง
			</Button>
			<Button
				className={`px-2 py-1 ${
					level === "hard"
						? "bg-secondary text-white"
						: "bg-white text-secondary"
				}`}
				onClick={() => onLevelChange("hard")}
			>
				ยาก
			</Button>
		</div>
	);
};

export default MobileLevelSelector;
