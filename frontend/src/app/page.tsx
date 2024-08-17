"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "./AnimatedForm.css";
import Image from "next/image";

const LoginUserPage = () => {
	const [isLogin, setIsLogin] = useState<boolean>(true);
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [usernamer, setUsernamer] = useState<string>("");
	const [passwordr, setPasswordr] = useState<string>("");

	const router = useRouter(); // ใช้ useRouter จาก next/navigation

	// ฟังก์ชันสำหรับจัดการการคลิกปุ่ม
	const handleSubmit = async (isLogin: boolean) => {
		try {
			if (isLogin) {
				// สำหรับการเข้าสู่ระบบ (นักเรียน)
				const response = await axios.post("http://localhost:3000/", {
					Name: username,
				});
				const { token } = response.data;

				if (token) {
					localStorage.setItem("token", token);
					router.push("/game");
				}
			} else {
				// สำหรับการลงทะเบียน (แอดมิน)
				const response = await axios.post("http://localhost:3000/", {
					Name: username,
					Password: password,
				});
				const { token } = response.data;

				if (token) {
					localStorage.setItem("token", token);
					router.push("/dashboard");
				}
			}
		} catch (error) {
			console.error("Operation failed", error);
			// Handle error (e.g., show error message)
		}
	};

	return (
		<div className="bg-sky-100 h-full">
			<section className="forms-section h-full">
				<Image
					src="/LogoLaSalleChote.png"
					alt="Landscape picture"
					width={200}
					height={200}
				/>
				<div className="bg-white rounded-lg p-6 shadow-lg text-center">
					<h2 className="text-xl font-semibold mb-4">สร้างบัญชีสำเร็จ</h2>
					{/* <p className="mb-6">{message}</p> */}
					<button
						// onClick={handleSubmit}
						className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
					>
						เข้าสู่ระบบ
					</button>
				</div>
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
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</div>
							</fieldset>
							<div className="flex  ml-12">
								<button
									type="button"
									className="btn-login text-3xl  p-2 rounded-xl"
									onClick={() => handleSubmit(true)}
								>
									เข้าสู่ระบบ
								</button>
							</div>
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
						>
							<fieldset>
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
							</fieldset>
							<button
								type="button"
								className="btn-login text-3xl p-2 rounded-xl ml-12"
								onClick={() => handleSubmit(false)}
							>
								ลงทะเบียน
							</button>
						</form>
					</div>
				</div>
			</section>
		</div>
	);
};

export default LoginUserPage;
