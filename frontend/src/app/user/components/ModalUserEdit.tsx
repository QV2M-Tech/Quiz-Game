import React, { useState, useEffect } from "react";

import {
	Button,
	DialogActions,
	DialogTitle,
	Divider,
	FormControl,
	FormLabel,
	Modal,
	ModalClose,
	ModalDialog,
	Stack,
} from "@mui/joy";
import { Input } from "@/components/ui/input";

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
		<React.Fragment>
			<Modal open={isOpen} onClose={() => setIsOpen(false)}>
				<ModalDialog
					className={`animate-slide-down`}
					variant="outlined"
					role="alertdialog"
				>
					<ModalClose />
					<DialogTitle>แก้ไขชื่อ</DialogTitle>

					<Divider />

					<form
						onSubmit={(event) => {
							event.preventDefault();
							handleSubmit();
						}}
					>
						<Stack spacing={2}>
							<FormControl>
								<FormLabel>ชื่อ</FormLabel>
								<Input
									type="text"
									value={userName}
									onChange={(e) => setUserName(e.target.value)}
									placeholder="ชื่อ"
								/>
							</FormControl>
							<DialogActions>
								<Button
									type="submit"
									sx={{
										backgroundColor: "#c2410c",
										color: "#fff",
										"&:hover": {
											backgroundColor: "#7c2d12",
										},
									}}
								>
									บันทึก
								</Button>
								<Button
									variant="outlined"
									color="neutral"
									onClick={() => setIsOpen(false)}
								>
									ยกเลิก
								</Button>
							</DialogActions>
						</Stack>
					</form>
				</ModalDialog>
			</Modal>
		</React.Fragment>
	);
};

export default ModalUserEdit;
