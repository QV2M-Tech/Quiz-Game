"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@/context/userContext";
import Body from "./components/body";
import Score from "./components/score";
import MobileLevelSelector from "./components/MobileLevelSelector";
import MobileRulesModal from "./components/MobileRulesModal";
import MobileScoreBoard from "./components/MobileScoreBoard";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Description from "./components/description";

function Page() {
	const [level, setLevel] = useState<string>("easy");
	const { User } = useUser();
	const [IsEnd, setIsEnd] = useState<boolean>(false);
	const [isMobile, setIsMobile] = useState<boolean>(false);
	const [showRules, setShowRules] = useState<boolean>(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const handleLevelChange = (newLevel: string) => {
		setLevel(newLevel);
	};

	return (
		<div className="min-h-screen bg-gray-primary">
			{isMobile ? (
				<div className="p-4">
					<div className="flex justify-end gap-3 mb-4">
						<Button
							onClick={() => setShowRules(true)}
							className="bg-secondary text-white"
						>
							วิธีเล่น
						</Button>
					</div>
					<MobileLevelSelector
						level={level}
						onLevelChange={handleLevelChange}
					/>
					<Body level={level} IsEnd={IsEnd} setIsEnd={setIsEnd} />
					<MobileRulesModal
						isOpen={showRules}
						onClose={() => setShowRules(false)}
						level={level}
					/>
				</div>
			) : (
				<section className="flex flex-col gap-8">
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
							<h3>ชื่อ {User?.name}</h3>
						</div>
					</header>
					<div className="flex gap-8 justify-center px-10">
						<Description level={level} />
						<Body level={level} IsEnd={IsEnd} setIsEnd={setIsEnd} />
						<Score level={level} IsEnd={IsEnd} />
					</div>
				</section>
			)}
		</div>
	);
}

export default Page;
