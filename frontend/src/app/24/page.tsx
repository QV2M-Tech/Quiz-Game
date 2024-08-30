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

	function easy() {
		return setLevel("easy");
	}

	function medium() {
		return setLevel("medium");
	}

	function hard() {
		return setLevel("hard");
	}

	return (
		<section className="flex flex-col gap-8 h-screen">
			<header className="flex w-full h-14 bg-orange-400">
				<div className="flex w-1/3 bg-green-500 p-2 items-center gap-10">
					<Button
						className="bg-blue-700 w-1/3 flex items-center justify-center"
						onClick={easy}
					>
						ง่าย
					</Button>
					<Button
						className="bg-blue-700 w-1/3 flex items-center justify-center"
						onClick={medium}
					>
						ปานกลาง
					</Button>
					<Button
						className="bg-blue-700 w-1/3 flex items-center justify-center"
						onClick={hard}
					>
						ยากส์
					</Button>
				</div>
				<div className="flex w-1/3 bg-blue-400 items-center justify-between p-5">
					<h3>หมวดหมู่: บันเทิง</h3>
					<h3>หัวข้อย่อย: Puzzle </h3>
				</div>
				<div className="flex w-1/3 bg-red-500 items-center justify-between p-5">
					<h3>รูป</h3>
					<h3>ชื่อ {User?.name}</h3> {/* Safe access using optional chaining */}
				</div>
			</header>
			<div className="flex h-[500px] bg-yellow-400">
				<Description level={level} />
				<Body level={level} />
				<Score level={level} />
			</div>
		</section>
	);
}

export default Page;
