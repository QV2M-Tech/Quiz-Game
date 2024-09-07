"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./AnimatedForm.css";
import Image from "next/image";
import UploadProfileImage from "../components/login/UploadProfileImage";
import axiosInstance from "../lib/axiosInstance";
import {
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Modal,
	ModalClose,
	ModalDialog,
} from "@mui/joy";

const LoginUserPage = () => {
	const [isLogin, setIsLogin] = useState<boolean>(true);
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [name, setname] = useState<string>("");
	const [usernamer, setUsernamer] = useState<string>("");
	const [passwordr, setPasswordr] = useState<string>("");
	const [popup, setpopup] = useState<boolean>(false);
	const [profile, setprofile] = useState<string>("/defaultProfile.png");

	const [isError, setIsError] = useState<boolean>(false);

	const router = useRouter(); // ใช้ useRouter จาก next/navigation

	// ฟังก์ชันสำหรับจัดการการคลิกปุ่ม
	const handleSubmit = async (isLogin: boolean) => {
		try {
			if (isLogin) {
				// สำหรับการเข้าสู่ระบบ
				const response = await axiosInstance.post("/users/login", {
					username: username,
					password: password,
				});
				const { token } = response.data;

				if (token) {
					localStorage.setItem("token", token);
					router.push("/selectgame");
				}
			} else {
				// สำหรับการลงทะเบียน
				const response = await axiosInstance.post("/users/register", {
					profile: profile,
					name: name,
					username: usernamer,
					password: passwordr,
				});
				const { token } = response.data;

				if (token) {
					localStorage.setItem("token", token);
					setpopup(true);
					setIsError(false);
				}
			}
		} catch (error) {
			console.error("Operation failed", error);
			setIsError(true);
			setpopup(true);

			// Handle error (e.g., show error message)
		}
	};

	const pop = () => {
		router.push("/selectgame");
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
		if (event.key === "Enter") {
			event.preventDefault(); // ป้องกันการทำงานแบบ default ของ form
			handleSubmit(isLogin);
		}
	};

	return (
		<div
			className="bg-sky-100 h-full"
			style={{
				transform: "translate(-33%, -33%) scale(0.67)",
				transformOrigin: "top left",
				position: "absolute",
				top: "50%",
				left: "50%",
			}}
		>
			<section className="forms-section h-full relative">
				<Image
					src="/LogoLaSalleChote.png"
					alt="Landscape picture"
					width={200}
					height={200}
				/>

				<React.Fragment>
					<Modal open={popup} onClose={() => setpopup(false)}>
						<ModalDialog
							className={`animate-slide-down`}
							variant="outlined"
							role="alertdialog"
						>
							<ModalClose />
							<DialogTitle>
								{isError ? "มีชื่อผู้ใช้นี้ในระบบแล้ว" : "สร้างบัญชีสำเร็จ"}
							</DialogTitle>
							{isError && (
								<>
									<Divider />
									<DialogContent>กรุณาใช้ชื่อผู้ใช้อื่น</DialogContent>
								</>
							)}
							{!isError && (
								<DialogActions>
									<Button
										sx={{
											backgroundColor: "#0c4a6e",
											color: "#fff",
											"&:hover": {
												backgroundColor: "#082f49",
											},
										}}
										onClick={pop}
									>
										เข้าสู่ระบบ
									</Button>
								</DialogActions>
							)}
						</ModalDialog>
					</Modal>
				</React.Fragment>

				<div className="forms">
					{/* Login Form */}
					<div className={`form-wrapper ${isLogin ? "is-active" : ""}`}>
						<button
							type="button"
							className={`switcher switcher-login ${isLogin ? "active" : ""}`}
							onClick={() => setIsLogin(true)}
						>
							เข้าสู่ระบบ
							<span className="underline"></span>
						</button>
						<form
							className="form form-login "
							onSubmit={(e) => e.preventDefault()}
							onKeyDown={handleKeyDown}
						>
							<fieldset>
								<div className="input-block">
									<label htmlFor="login-username" className="">
										ชื่อผู้ใช้
									</label>
									<input
										id="login-username"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										required
									/>
								</div>
								<div className="input-block">
									<label htmlFor="login-password" className="">
										รหัสผ่าน
									</label>
									<input
										id="login-password"
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</div>
								<div className="flex ml-12">
									<button
										type="button"
										className="btn-login text-3xl p-2 rounded-xl"
										onClick={() => handleSubmit(true)}
									>
										เข้าสู่ระบบ
									</button>
								</div>
							</fieldset>
						</form>
					</div>

					{/* Sign Up Form */}
					<div className={`form-wrapper ${!isLogin ? "is-active" : ""}`}>
						<button
							type="button"
							className={`switcher switcher-signup ${!isLogin ? "active" : ""}`}
							onClick={() => setIsLogin(false)}
						>
							ลงทะเบียน
							<span className="underline"></span>
						</button>
						<form
							className="form form-signup"
							onSubmit={(e) => e.preventDefault()}
							onKeyDown={handleKeyDown}
						>
							<fieldset>
								<UploadProfileImage
									onImageUpload={(imageUrl: any) => setprofile(imageUrl)} // ส่ง URL ของภาพที่อัปโหลดมาอัปเดต state profile
								/>
								<div className="input-block">
									<label htmlFor="signup-username">ชื่อ</label>
									<input
										id="signup-name"
										value={name}
										onChange={(e) => setname(e.target.value)}
										required
									/>
								</div>
								<div className="input-block">
									<label htmlFor="signup-username">ชื่อผู้ใช้</label>
									<input
										id="signup-username"
										value={usernamer}
										onChange={(e) => setUsernamer(e.target.value)}
										required
									/>
								</div>
								<div className="input-block">
									<label htmlFor="signup-password">รหัสผ่าน</label>
									<input
										id="signup-password"
										type="password"
										value={passwordr}
										onChange={(e) => setPasswordr(e.target.value)}
										required
									/>
								</div>
								<button
									type="button"
									className="btn-login text-3xl p-2 rounded-xl ml-12"
									onClick={() => handleSubmit(false)}
								>
									ลงทะเบียน
								</button>
							</fieldset>
						</form>
					</div>
				</div>
			</section>
		</div>
	);
};

export default LoginUserPage;
