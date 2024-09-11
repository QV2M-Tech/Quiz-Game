"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./AnimatedForm.css";
import Image from "next/image";
import UploadProfileImage from "../components/login/UploadProfileImage";
import axiosInstance from "../lib/axiosInstance";
import LoginModal from "@/components/login/LoginModal";

const LoginUserPage = () => {
	const [isLogin, setIsLogin] = useState<boolean>(true);
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [name, setname] = useState<string>("");
	const [usernamer, setUsernamer] = useState<string>("");
	const [passwordr, setPasswordr] = useState<string>("");
	const [popup, setpopup] = useState<boolean>(false);
	const [profile, setprofile] = useState<string>("/defaultProfile.png");
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");

	const [isError, setIsError] = useState<boolean>(false);

	const router = useRouter(); // ใช้ useRouter จาก next/navigation

	// ฟังก์ชันสำหรับจัดการการคลิกปุ่ม
	const handleSubmit = async (isLogin: boolean) => {
		if (isLogin) {
			// สำหรับการเข้าสู่ระบบ
			try {
				const response = await axiosInstance.post("/users/login", {
					username: username,
					password: password,
				});
				const { token } = response.data;

				if (token) {
					localStorage.setItem("token", token);
					setIsError(false);
					router.push("/selectgame");
				}
			} catch (error) {
				console.error("Operation failed", error);
				setIsError(true);
				setpopup(true);
				setTitle("ชื่อผู้ใช้หรือรหัสผ่านผิด");
				setContent("กรุณาลองใหม่อีกครั้ง");
			}
		} else {
			// สำหรับการลงทะเบียน
			try {
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
					setTitle("ลงทะเบียนสำเร็จ");
					setContent("");
				} else {
				}
			} catch (error) {
				console.error("Operation failed", error);
				setIsError(true);
				setpopup(true);
				setTitle("มีชื่อผู้ใช้นี้ในระบบแล้ว");
				setContent("กรุณาลองใหม่อีกครั้ง");
			}
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
		// <div className="h-full absolute top-1/2 left-1/2 origin-top-left -translate-x-[33%] -translate-y-[33%] scale-[0.67]">
		<div className="flex flex-col justify-center items-center -ml-16 sm:-ml-20">
			<section className="flex flex-col justify-center items-center gap-4 h-full py-8">
				<Image
					src="/LogoLaSalleChote.png"
					alt="Landscape picture"
					width={140}
					height={140}
				/>

				<div className="flex">
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
							className="form form-login"
							onSubmit={(e) => e.preventDefault()}
							onKeyDown={handleKeyDown}
						>
							<fieldset disabled={!isLogin} className="flex flex-col gap-5">
								<label htmlFor="login-username" className="login-label">
									ชื่อผู้ใช้
									<input
										id="login-username"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										required
										className="login-input"
									/>
								</label>
								<label htmlFor="login-password" className="login-label">
									รหัสผ่าน
									<input
										id="login-password"
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										className="login-input"
									/>
								</label>
								<button
									type="button"
									className="login-btn"
									disabled={!isLogin}
									onClick={() => handleSubmit(true)}
								>
									เข้าสู่ระบบ
								</button>
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
							<fieldset disabled={isLogin} className="flex flex-col gap-5">
								<UploadProfileImage
									onImageUpload={(imageUrl: any) => setprofile(imageUrl)} // ส่ง URL ของภาพที่อัปโหลดมาอัปเดต state profile
								/>
								<label htmlFor="signup-username" className="login-label">
									ชื่อ
									<input
										id="signup-name"
										value={name}
										onChange={(e) => setname(e.target.value)}
										required
										className="login-input"
									/>
								</label>
								<label htmlFor="signup-username" className="login-label">
									ชื่อผู้ใช้
									<input
										id="signup-username"
										value={usernamer}
										onChange={(e) => setUsernamer(e.target.value)}
										required
										className="login-input"
									/>
								</label>
								<label htmlFor="signup-password" className="login-label">
									รหัสผ่าน
									<input
										id="signup-password"
										type="password"
										value={passwordr}
										onChange={(e) => setPasswordr(e.target.value)}
										required
										className="login-input"
									/>
								</label>
								<button
									type="button"
									className="login-btn"
									disabled={isLogin}
									onClick={() => handleSubmit(false)}
								>
									ลงทะเบียน
								</button>
							</fieldset>
						</form>
					</div>
				</div>
			</section>

			<LoginModal
				popup={popup}
				setpopup={setpopup}
				title={title}
				content={content}
				action={!isError}
				pop={pop}
			/>
		</div>
	);
};

export default LoginUserPage;
