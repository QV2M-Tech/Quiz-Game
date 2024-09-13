import { useEffect, useState } from "react";
import numberCrunching from "../utils/numberCrunching";

import { Subtopic } from "@/types/SubTopic";
import { Question } from "@/types/Question";

import { FaRegLightbulb } from "react-icons/fa6";

export default function Game({
	time,
	setTime,
	subtopic,
	score,
	setScore,
	questionList,
	setQuestionList,
	handleRestart,
	setShowExit,
	reload,
	setReload,
	countHint,
	setCountHint,
}: {
	time: number;
	setTime: Function;
	subtopic: Subtopic;
	score: number;
	setScore: Function;
	questionList: Question[];
	setQuestionList: Function;
	handleRestart: Function;
	setShowExit: Function;
	reload: boolean;
	setReload: Function;
	countHint: number;
	setCountHint: Function;
}) {
	const [showHint, setShowHint] = useState<boolean>(false);

	useEffect(() => {
		if (subtopic._id === "66d151ea62f384268532c45c") {
			setQuestionList((prevList: Question[]) => {
				const newList = [...prevList];
				newList.push(numberCrunching());
				return newList;
			});
		}

		setQuestionList((prevList: Question[]) => {
			const newList = [...prevList];
			newList.shift();
			return newList;
		});

		setShowHint(false);
	}, [reload]);

	function handleScore(isCorrect: boolean) {
		if (isCorrect) {
			setScore(score + 1);
		}
		if (!isCorrect && subtopic._id === "66d151ea62f384268532c45c") {
			setTime(0);
		}
		setReload(!reload);
	}

	function handleHint() {
		if (questionList[0]?.hint !== "") setCountHint(0);
		setShowHint(true);
	}

	return (
		<div className="flex flex-col justify-between gap-6 sm:w-4/5 lg:w-3/4 xl:w-2/3 tw-box h-[calc(100vh-112px)]">
			<div className="flex flex-col items-center gap-4">
				<h1>เกมส์ตอบคำถาม</h1>
				<div className="flex flex-col md:flex-row justify-center items-center md:justify-around md:gap-4 w-full">
					<h2>หมวดหมู่ {subtopic?.category}</h2>
					<h2>หัวข้อ {subtopic?.topicName}</h2>
				</div>
				<h2>หัวข้อย่อย {subtopic?.subtopicName}</h2>
			</div>

			<div className="flex flex-col items-center gap-4">
				<h1>{questionList[0]?.questionName}</h1>
			</div>

			<div className="flex flex-col items-center gap-4 w-full">
				<div className="flex flex-col sm:flex-row items-center justify-start gap-1 w-full px-4">
					<button
						onClick={handleHint}
						className="flex items-center gap-2 hover:bg-primary py-2 px-4 rounded-full text-lg"
					>
						<FaRegLightbulb /> กดดูคำใบ้ (เหลือ {countHint})
					</button>
					{showHint && (
						<h3 className="text-lg">
							{questionList[0]?.hint || "โจทย์ข้อนี้ไม่มีคำใบ้"}
						</h3>
					)}
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full px-4 max-w-2xl">
					{questionList[0]?.option.map((item, index) => {
						return (
							<button
								key={index}
								disabled={time === 0}
								onClick={() => {
									handleScore(item.isCorrect);
								}}
								className="tw-btn bg-accent border border-secondary shadow-md hover:bg-accent-hover p-4 text-lg min-h-[60px]"
							>
								{item.text}
							</button>
						);
					})}
				</div>
				<div className="flex gap-4 mt-4">
					<button
						onClick={() => handleRestart()}
						className="tw-btn bg-white border border-secondary shadow-md hover:bg-secondary/20 p-3 text-lg"
					>
						เริ่มเกมใหม่
					</button>
					<button
						onClick={() => setShowExit(true)}
						className="tw-btn bg-secondary text-white shadow-md hover:bg-secondary-hover p-3 text-lg"
					>
						ออกจากเกม
					</button>
				</div>
			</div>
		</div>
	);
}
