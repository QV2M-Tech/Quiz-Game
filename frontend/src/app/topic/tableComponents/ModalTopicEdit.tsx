import React from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface ModalTopicEditProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	initialData?: { title: string; category: string };
	onSubmit: (data: { title: string; category: string }) => void;
}

export function ModalTopicEdit({
	isOpen,
	setIsOpen,
	initialData,
	onSubmit,
}: ModalTopicEditProps) {
	const [title, setTitle] = React.useState(initialData?.title || "");
	const [category, setCategory] = React.useState(initialData?.category || "");

	const handleSubmit = () => {
		onSubmit({ title, category });
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>แก้ไขหัวข้อ</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="title" className="text-right">
							หัวข้อ
						</Label>
						<Input
							id="title"
							placeholder="หัวข้อ"
							className="col-span-3"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="category" className="text-right">
							หมวดหมู่
						</Label>
						<Select value={category} onValueChange={setCategory}>
							<SelectTrigger id="category" className="col-span-3">
								<SelectValue placeholder="เลือกหมวดหมู่" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="category1">หมวดหมู่ 1</SelectItem>
								<SelectItem value="category2">หมวดหมู่ 2</SelectItem>
								<SelectItem value="category3">หมวดหมู่ 3</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={() => setIsOpen(false)}>
						ยกเลิก
					</Button>
					<Button type="submit" onClick={handleSubmit}>
						ยืนยัน
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
