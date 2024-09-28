import React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import Score from "./score";

interface MobileScoreBoardProps {
	isOpen: boolean;
	onClose: () => void;
	level: string;
	IsEnd: boolean;
}

const MobileScoreBoard: React.FC<MobileScoreBoardProps> = ({
	isOpen,
	onClose,
	level,
	IsEnd,
}) => {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex justify-between items-center">
						คะแนนสูงสุด
					</DialogTitle>
				</DialogHeader>
				<div className="mt-4">
					<Score level={level} IsEnd={IsEnd} />
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default MobileScoreBoard;
