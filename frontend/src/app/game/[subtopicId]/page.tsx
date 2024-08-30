"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import GameNav from "../components/GameNav";
import Game from "../components/Game";
import Leaderboard from "../components/Leaderboard";
import ModalTimeout from "../components/ModalTimeout";
import ModalExit from "../components/ModalExit";

import { SubtopicApi } from "@/lib/SubTopicApi";

import { Subtopic } from "@/types/SubTopic";

interface Props {
	params: {
		subtopicId: string;
	};
}

export default function GamePage({ params }: Props) {
	const router = useRouter();
	const { subtopicId } = params;

	const [reload, setReload] = useState<boolean>(false);

	const [time, setTime] = useState<number>(30000);
	const [start, setStart] = useState<boolean>(false);

	const [showTimeout, setShowTimeout] = useState<boolean>(false);
	const [showExit, setShowExit] = useState<boolean>(false);

	const [subtopic, setSubtopic] = useState<Subtopic>({
		_id: "",
		subtopicName: "",
		time: 30000,
		category: "",
		topicId: "",
	});

	const [score, setScore] = useState<number>(0);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setStart(true);
		}, 1000);

		return () => clearTimeout(timeoutId);
	}, []);

	useEffect(() => {
		if (time === 0) setShowTimeout(true);
		if (!start || time <= 0) return;
		if (showExit === true) return;

		const intervalId = setInterval(() => {
			setTime((prevSeconds) => prevSeconds - 1000);
		}, 1000);

		return () => clearInterval(intervalId);
	}, [start, time, showExit]);

	useEffect(() => {
		getSubtopic();
	}, []);

	async function getSubtopic() {
		try {
			const getSubtopic = await SubtopicApi.getSubtopicById(subtopicId);

			setSubtopic(getSubtopic);
			setTime(getSubtopic.time);

			console.log(getSubtopic);
		} catch (error) {
			console.error("Failed to get Subtopic:", error);
		}
	}

	function handleRestart(): void {
		setShowTimeout(false);
		setShowExit(false);
		setReload(!reload);
		setScore(0);
		setTime(subtopic?.time || 30000);
	}

	function handleExit(): void {
		router.push("/");
	}

	return (
		<>
			<div className="flex flex-col gap-8 h-screen">
				<div>
					<GameNav time={time} score={score} />
				</div>
				<div className="flex gap-8 justify-center items-center h-11/12">
					<Game
						time={time}
						subtopic={subtopic}
						score={score}
						setScore={setScore}
						setShowExit={setShowExit}
						handleRestart={handleRestart}
						reload={reload}
						setReload={setReload}
					/>
					<Leaderboard />
				</div>
				<ModalTimeout
					score={score}
					showTimeout={showTimeout}
					handleRestart={handleRestart}
					handleExit={handleExit}
				/>
				<ModalExit
					showExit={showExit}
					setShowExit={setShowExit}
					handleExit={handleExit}
				/>
			</div>
		</>
	);
}
