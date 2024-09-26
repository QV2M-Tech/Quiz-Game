import React from "react";
import {
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	FormControl,
	FormLabel,
	// Input,
	Modal,
	ModalClose,
	ModalDialog,
	Stack,
} from "@mui/joy";
import { Input } from "@/components/ui/input";
import { AllScore } from "@/types/score";

export default function ScoreModal({
	isEditModalOpen,
	setIsEditModalOpen,
	handleUpdateScore,
	editedScore,
	setEditedScore,
}: {
	isEditModalOpen: boolean;
	setIsEditModalOpen: Function;
	handleUpdateScore: Function;
	editedScore: number;
	setEditedScore: Function;
}) {
	return (
		<React.Fragment>
			<Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
				<ModalDialog
					className={`animate-slide-down`}
					variant="outlined"
					role="alertdialog"
				>
					<ModalClose />
					<DialogTitle>แก้ไขคะแนน</DialogTitle>

					<Divider />
					{/* <DialogContent>xxx</DialogContent> */}
					<form
						onSubmit={(event) => {
							event.preventDefault();
							handleUpdateScore();
							setIsEditModalOpen(false);
						}}
					>
						<Stack spacing={2}>
							<FormControl>
								<FormLabel>คะแนน</FormLabel>
								<Input
									type="number"
									value={editedScore}
									onChange={(e) => setEditedScore(Number(e.target.value))}
									placeholder="Enter new score"
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
									onClick={() => setIsEditModalOpen(false)}
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
}
