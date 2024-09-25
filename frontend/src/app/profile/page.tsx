"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/userContext";
import { getUserById, updateUserById } from "@/lib/userApi";
import { User } from "@/types/user";
import UploadProfileImage from "@/components/login/UploadProfileImage";

export default function Profile() {
	const { User } = useUser();
	const userId = User?.id || "";
	const [profile, setProfile] = useState<User>({
		profile: `${User?.profile}`,
		name: `${User?.name}`,
		username: `${User?.username}`,
		password: "",
		isAdmin: User?.isAdmin || false,
	});
	const [message, setMessage] = useState<string>("");

	async function getUser(userId: string) {
		const userInfo = await getUserById(userId);
		if (userInfo) {
			setProfile(userInfo);
		}
	}

	function handleChange(e: { target: { name: string; value: any } }) {
		const { name, value } = e.target;

		setProfile((prev) => ({ ...prev, [name]: value }));
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		try {
			const res = await updateUserById(userId, profile);
			setMessage(res);
		} catch (error) {
			setMessage("แก้ไขข้อมูลผู้ใช้ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
		}
	}

	return (
		<div className="flex flex-col items-center py-10 min-h-screen">
			<form
				className="tw-box flex flex-col gap-6 sm:w-1/2"
				onSubmit={handleSubmit}
			>
				<h2 className="font-bold">แก้ไขข้อมูลผู้ใช้</h2>
				<UploadProfileImage
					onImageUpload={(imageUrl: any) =>
						setProfile((prev) => {
							return { ...prev, profile: imageUrl };
						})
					}
				/>

				<label className="login-label">
					ชื่อ
					<input
						name="name"
						value={profile?.name}
						onChange={handleChange}
						required
						className="border border-neutral-300 px-4 py-2 rounded-lg"
					/>
				</label>
				<label className="login-label">
					ชื่อผู้ใช้
					<input
						value={profile?.username}
						disabled
						className="border border-neutral-300 px-4 py-2 rounded-lg"
					/>
				</label>
				<label className="login-label">
					ตั้งรหัสผ่านใหม่
					<input
						type="password"
						name="password"
						value={profile?.password}
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
	);
}
