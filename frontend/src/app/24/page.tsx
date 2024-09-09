"use client";

import React, { useState } from "react";
import Description from "./components/description";
import Body from "./components/body";
import Score from "./components/score";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";

function Page() {
	const [level, setLevel] = useState<string>("easy");
	const { User } = useUser(); // Use the custom hook
	const [IsEnd, setIsEnd] = useState<boolean>(false);

	// Handle button click and set level
	const handleLevelChange = (newLevel: string) => {
		setLevel(newLevel);
	};

	return (
		<section className="flex flex-col gap-8 h-screen">
			<header className="flex w-full h-20">
				<div className="flex w-1/3 m-3 items-center gap-10">
					<Button
						className={`bg-blue-950 text-white w-1/3 flex items-center justify-center hover:bg-blue-300 hover:text-black 
							${level === "easy" ? "scale-120 ring-4 ring-blue-300" : ""} 
							active:ring-2 active:ring-blue-300`}
						onClick={() => handleLevelChange("easy")}
					>
						ง่าย
					</Button>
					<Button
						className={`bg-blue-950 text-white w-1/3 flex items-center justify-center hover:bg-blue-300 hover:text-black 
							${level === "medium" ? "scale-120 ring-4 ring-blue-300" : ""} 
							active:ring-2 active:ring-blue-300`}
						onClick={() => handleLevelChange("medium")}
					>
						ปานกลาง
					</Button>
					<Button
						className={`bg-blue-950 text-white w-1/3 flex items-center justify-center hover:bg-blue-300 hover:text-black 
							${level === "hard" ? "scale-120 ring-4 ring-blue-300" : ""} 
							active:ring-2 active:ring-blue-300`}
						onClick={() => handleLevelChange("hard")}
					>
						ยาก
					</Button>
				</div>
				<div className="flex w-1/3 items-center justify-between p-2 bg-white rounded-xl m-5">
					<h3>หมวดหมู่: บันเทิง</h3>
					<h3>หัวข้อย่อย: เกม 24</h3>
				</div>
				<div className="flex w-1/3 items-center justify-center p-2 bg-white rounded-xl m-5">
					<h3>ชื่อ {User?.name}</h3> {/* Safe access using optional chaining */}
				</div>
			</header>
			<div className="flex h-[500px]">
				<Description level={level} />
				<Body level={level} IsEnd={IsEnd} setIsEnd={setIsEnd} />
				<Score level={level} IsEnd={IsEnd} />
			</div>
		</section>
	);
}

export default Page;
