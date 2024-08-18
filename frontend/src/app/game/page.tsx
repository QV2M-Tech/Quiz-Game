"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GameNav from "./components/GameNav";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";
import ModalTimeout from "./components/ModalTimeout";
import ModalExit from "./components/ModalExit";

export default function GamePage() {
	const router = useRouter();
	const [reload, setReload] = useState<boolean>(false);
	const [time, setTime] = useState<number>(3000);
	const [start, setStart] = useState<boolean>(false);
	const [showTimeout, setShowTimeout] = useState<boolean>(false);
	const [showExit, setShowExit] = useState<boolean>(false);

	useEffect(() => {
		setTime(3000);

		const timeoutId = setTimeout(() => {
			setStart(true);
		}, 1000);

		return () => clearTimeout(timeoutId);
	}, [reload]);

	useEffect(() => {
		if (time === 0) setShowTimeout(true);
		if (!start || time <= 0) return;
		if (showExit === true) return;

		const intervalId = setInterval(() => {
			setTime((prevSeconds) => prevSeconds - 1000);
		}, 1000);

		return () => clearInterval(intervalId);
	}, [start, time, showExit]);

	function handleRestart(): void {
		setShowTimeout(false);
		setShowExit(false);
		setReload(!reload);
	}

	function handleExit(): void {
		router.push("/");
	}

	return (
		<>
			<div className="flex flex-col gap-8 h-screen">
				<div>
					<GameNav time={time} />
				</div>
				<div className="flex gap-8 justify-center items-center h-11/12">
					<Game
						time={time}
						setShowExit={setShowExit}
						handleRestart={handleRestart}
					/>
					<Leaderboard />
				</div>
				<ModalTimeout
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
