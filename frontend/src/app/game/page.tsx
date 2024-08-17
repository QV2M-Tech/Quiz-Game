"use client";
import { useEffect, useState } from "react";
import Leaderboard from "./components/Leaderboard";
import Game from "./components/Game";
import GameNav from "./components/GameNav";

export default function GamePage() {
	const [reload, setReload] = useState<boolean>(false);
	const [time, setTime] = useState<number>(30000);
	const [start, setStart] = useState<boolean>(false);
	const [showTimeout, setShowTimeout] = useState<boolean>(false);
	const [showConfirm, setShowConfirm] = useState<boolean>(false);

	useEffect(() => {
		setTime(30000);

		const timeoutId = setTimeout(() => {
			setStart(true);
		}, 1000);

		return () => clearTimeout(timeoutId);
	}, [reload]);

	useEffect(() => {
		if (time === 0) setShowTimeout(true);

		if (!start || time <= 0) return;

		const intervalId = setInterval(() => {
			setTime((prevSeconds) => prevSeconds - 1000);
		}, 1000);

		return () => clearInterval(intervalId);
	}, [start, time]);

	return (
		<>
			<div className="flex flex-col gap-8 h-screen">
				<div>
					<GameNav time={time} />
				</div>
				<div className="flex gap-8 justify-center items-center h-11/12">
					<Game
						reload={reload}
						setReload={setReload}
						time={time}
						setShowTimeout={setShowTimeout}
					/>
					<Leaderboard />
				</div>
			</div>
		</>
	);
}
