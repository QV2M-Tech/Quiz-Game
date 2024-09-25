"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/userContext";
import { getUserById, updateUserById } from "@/lib/userApi";
import { User } from "@/types/user";
import UploadProfileImage from "@/components/login/UploadProfileImage";
import ProfileModal from "./components/ProfileModal";

export default function Profile() {
	const { User, refreshUser } = useUser();
	const userId = User?._id || "";
	const [userProfile, setUserProfile] = useState<User>({
		_id: "",
		profile: "",
		name: "",
		username: "",
		password: "",
		isAdmin: User?.isAdmin || false,
		createOn: "",
	});
	const [popup, setPopup] = useState<boolean>(false);
	const [popupTitle, setPopupTitle] = useState<string>("");
	const [popupContent, setPopupContent] = useState<string>("");

	useEffect(() => {
		if (userId) {
			getUser(userId);
		}
	}, [userId]);

	async function getUser(userId: string) {
		const userInfo = await getUserById(userId);

		if (userInfo) {
			setUserProfile((prev) => ({
				...prev,
				profile: userInfo.profile,
				name: userInfo.name,
				username: userInfo.username,
			}));
		}
	}

	function handleChange(e: { target: { name: string; value: any } }) {
		const { name, value } = e.target;

		setUserProfile((prev) => ({ ...prev, [name]: value }));
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		try {
			const res = await updateUserById(userId, userProfile);
			setPopupTitle(res);
			setPopupContent(res);
		} catch (error) {
			setPopupTitle("มีข้อผิดพลาด");
			setPopupContent("แก้ไขข้อมูลผู้ใช้ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
		}

		setPopup(true);
		refreshUser();
	}

	return (
		<>
			<div className="flex flex-col items-center py-10 min-h-screen">
				<form
					className="tw-box flex flex-col gap-6 sm:w-1/2"
					onSubmit={handleSubmit}
				>
					<h2 className="font-bold">แก้ไขข้อมูลผู้ใช้</h2>
					<UploadProfileImage
						profileImg={userProfile.profile || User?.profile || ""}
						onImageUpload={(imageUrl: string) => {
							setUserProfile((prev) => ({ ...prev, profile: imageUrl }));
						}}
					/>

					<label className="login-label">
						ชื่อ
						<input
							name="name"
							value={userProfile?.name}
							onChange={handleChange}
							required
							className="border border-neutral-300 px-4 py-2 rounded-lg"
						/>
					</label>
					<label className="login-label">
						ชื่อผู้ใช้
						<input
							value={userProfile?.username}
							disabled
							className="border border-neutral-300 px-4 py-2 rounded-lg"
						/>
					</label>
					<label className="login-label">
						ตั้งรหัสผ่านใหม่
						<input
							type="password"
							name="password"
							value={userProfile?.password}
							onChange={handleChange}
							className="border border-neutral-300 px-4 py-2 rounded-lg"
						/>
					</label>
					<button
						type="submit"
						className="mt-1 px-4 py-2 bg-y2r3 hover:bg-y3r4 rounded-xl"
					>
						บันทึก
					</button>
				</form>
			</div>
			<ProfileModal
				popup={popup}
				setPopup={setPopup}
				title={popupTitle}
				content={popupContent}
			/>
		</>
	);
}
