import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ModalUserEditProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	onSubmit: (newName: string) => Promise<void>;
	initialName?: string;
	isSubmitting: boolean;
}

const ModalUserEdit: React.FC<ModalUserEditProps> = ({
	isOpen,
	setIsOpen,
	onSubmit,
	initialName,
	isSubmitting,
}) => {
	const [userName, setUserName] = useState(initialName || "");

	useEffect(() => {
		if (isOpen) {
			setUserName(initialName || "");
		}
	}, [isOpen, initialName]);

	const handleSubmit = async () => {
		if (userName.trim() === "") {
			alert("กรุณากรอกชื่อ");
			return;
		}
		await onSubmit(userName);
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent className="max-w-sm mx-auto p-4 rounded-lg bg-white shadow-lg">
				<DialogTitle className="text-lg font-semibold mb-4">
					แก้ไขชื่อผู้ใช้
				</DialogTitle>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						ชื่อผู้ใช้
					</label>
					<input
						type="text"
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
						placeholder="ชื่อผู้ใช้"
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</div>
				<DialogFooter className="flex justify-end space-x-2">
					<DialogClose>
						<Button variant="outline">ยกเลิก</Button>
					</DialogClose>
					<Button type="submit" disabled={isSubmitting} onClick={handleSubmit}>
						{isSubmitting ? "กำลังบันทึก..." : "บันทึก"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ModalUserEdit;
