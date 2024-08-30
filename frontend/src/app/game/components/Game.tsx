import { useEffect, useState } from "react";
import numberCrunching from "../utils/numberCrunching";

import { Subtopic } from "@/types/SubTopic";
import { Question } from "@/types/Question";

export default function Game({
	time,
	subtopic,
	score,
	setScore,
	handleRestart,
	setShowExit,
	reload,
	setReload,
}: {
	time: number;
	subtopic: Subtopic;
	score: number;
	setScore: Function;
	handleRestart: Function;
	setShowExit: Function;
	reload: boolean;
	setReload: Function;
}) {
	const [question, setQuestion] = useState<Question>();

	useEffect(() => {
		setQuestion(numberCrunching());
	}, [reload]);

	function handleScore(isCorrect: boolean) {
		if (isCorrect) {
			setScore(score + 1);
		}
		setReload(!reload);
	}

	return (
		<div className="flex flex-col justify-between gap-6 w-3/6 tw-box">
			<div className="flex flex-col items-center gap-4">
				<h1>เกมส์ตอบคำถาม</h1>
				<div className="flex justify-around w-full">
					<h2>หมวดหมู่ {subtopic?.category}</h2>
					<h2>หัวข้อ {subtopic?.subtopicName}</h2>
				</div>
				<h2>หัวข้อย่อย {subtopic?.subtopicName}</h2>
			</div>
			<div className="flex flex-col items-center gap-4">
				{/* <div className="w-2/3 h-40 bg-neutral-200"></div> */}
				<h2>{question?.questionName}</h2>
			</div>

			<div className="flex flex-col items-center gap-4">
				<div className="grid grid-cols-2 grid-rows-2 gap-2 w-1/2">
					{question?.option.map((item, index) => {
						return (
							<button
								key={index}
								disabled={time === 0}
								onClick={() => {
									handleScore(item.isCorrect);
								}}
								className="tw-btn bg-accent border border-secondary shadow-md hover:bg-accent-hover"
							>
								{item.text}
							</button>
						);
					})}
				</div>
				<div className="flex gap-2">
					<button
						onClick={() => handleRestart()}
						className="tw-btn bg-white border border-secondary shadow-md hover:bg-secondary/20"
					>
						เริ่มเกมใหม่
					</button>
					<button
						onClick={() => setShowExit(true)}
						className="tw-btn bg-secondary text-white shadow-md hover:bg-secondary-hover"
					>
						ออกจากเกม
					</button>
				</div>
			</div>
		</div>
	);
}
