"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./AnimatedForm.css";
import Image from "next/image";
import UploadProfileImage from "../components/login/UploadProfileImage";
import axiosInstance from "../lib/axiosInstance";
import LoginModal from "@/components/login/LoginModal";
import { useUser } from "@/context/userContext";

const LoginUserPage = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [usernamer, setUsernamer] = useState("");
	const [passwordr, setPasswordr] = useState("");
	const [popup, setPopup] = useState(false);
	const [profile, setProfile] = useState("/defaultProfile.png");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [isError, setIsError] = useState(false);

	const router = useRouter();
	const { setUserFromToken } = useUser();

	const handleSubmit = async (isLogin: boolean) => {
		try {
			if (isLogin) {
				// Login
				const response = await axiosInstance.post("/users/login", {
					username,
					password,
				});
				const { token } = response.data;

				if (token) {
					setUserFromToken(token);
					console.log("Token set in localStorage:", token);
					console.log(
						"Token in localStorage after setting:",
						localStorage.getItem("token")
					);
					setIsError(false);
					router.push("/selectgame");
				}
			} else {
				// Register
				const response = await axiosInstance.post("/users/register", {
					profile,
					name,
					username: usernamer,
					password: passwordr,
				});
				const { token } = response.data;

				if (token) {
					setUserFromToken(token);
					setPopup(true);
					setIsError(false);
					setTitle("ลงทะเบียนสำเร็จ");
					setContent("");
				}
			}
		} catch (error) {
			console.error("Operation failed", error);
			setIsError(true);
			setPopup(true);
			setTitle(
				isLogin ? "ชื่อผู้ใช้หรือรหัสผ่านผิด" : "มีชื่อผู้ใช้นี้ในระบบแล้ว"
			);
			setContent("กรุณาลองใหม่อีกครั้ง");
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
		if (event.key === "Enter") {
			event.preventDefault();
			handleSubmit(isLogin);
		}
	};

	return (
		<div className="flex flex-col justify-center items-center -ml-16 sm:-ml-20">
			<section className="flex flex-col justify-center items-center gap-4 h-full py-8">
				<Image
					src="/LogoLaSalleChote.png"
					alt="Logo"
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
									onImageUpload={(imageUrl: any) => setProfile(imageUrl)}
								/>
								<label htmlFor="signup-name" className="login-label">
									ชื่อ
									<input
										id="signup-name"
										value={name}
										onChange={(e) => setName(e.target.value)}
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
				setpopup={setPopup}
				title={title}
				content={content}
				action={!isError}
				pop={() => router.push("/selectgame")}
			/>
		</div>
	);
};

export default LoginUserPage;
