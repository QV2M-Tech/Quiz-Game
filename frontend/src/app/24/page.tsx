"use client";
import React, { useEffect, useState } from "react";
import Description from "./components/description";
import Body from "./components/body";
import Score from "./components/score";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";

function Page() {
	const [level, setLevel] = useState<string>("easy");
	const { User } = useUser(); // Use the custom hook
	const [IsEnd, setIsEnd] = useState<boolean>(false);
	const [isPortrait, setIsPortrait] = useState<boolean>(false);

	// Handle orientation change
	useEffect(() => {
		const handleOrientationChange = () => {
			setIsPortrait(window.innerHeight > window.innerWidth);
		};

		window.addEventListener("resize", handleOrientationChange);
		handleOrientationChange(); // Initial check

		return () => {
			window.removeEventListener("resize", handleOrientationChange);
		};
	}, []);

	// Handle button click and set level
	const handleLevelChange = (newLevel: string) => {
		setLevel(newLevel);
	};

	return (
		<>
			{isPortrait && (
				<div className="mx-auto bg-center">
					กรุณาหมุนอุปกรณ์เป็นแนวนอนเพื่อเล่นเกม
				</div>
			)}
			<section
				className={`flex flex-col gap-8 h-screen page-content ${
					isPortrait ? "hidden" : ""
				}`}
			>
				<header className="flex w-full gap-10 p-6">
					<div className="flex w-2/5 items-center gap-6">
						<Button
							className={`w-1/3 px-2 py-3 bg-white border border-secondary hover:bg-secondary hover:text-white
								${level === "easy" ? "bg-secondary text-white" : ""}`}
							onClick={() => handleLevelChange("easy")}
						>
							ง่าย
						</Button>
						<Button
							className={`w-1/3 px-2 py-3 bg-white border border-secondary hover:bg-secondary hover:text-white
								${level === "medium" ? "bg-secondary text-white" : ""}`}
							onClick={() => handleLevelChange("medium")}
						>
							ปานกลาง
						</Button>
						<Button
							className={`w-1/3 px-2 py-3 bg-white border border-secondary hover:bg-secondary hover:text-white
								${level === "hard" ? "bg-secondary text-white" : ""}`}
							onClick={() => handleLevelChange("hard")}
						>
							ยาก
						</Button>
					</div>
					<div className="flex w-2/5 items-center justify-around px-2 py-3 bg-white rounded-lg">
						<h3>หมวดหมู่: บันเทิง</h3>
						<h3>หัวข้อย่อย: เกม 24</h3>
					</div>
					<div className="flex w-1/5 items-center justify-center px-2 py-3 bg-white rounded-lg">
						<h3>ชื่อ {User?.name}</h3>{" "}
						{/* Safe access using optional chaining */}
					</div>
				</header>

				<div className="flex gap-8 justify-center px-10">
					<Description level={level} />
					<Body level={level} IsEnd={IsEnd} setIsEnd={setIsEnd} />
					<Score level={level} IsEnd={IsEnd} />
				</div>
			</section>
		</>
	);
}

export default Page;
