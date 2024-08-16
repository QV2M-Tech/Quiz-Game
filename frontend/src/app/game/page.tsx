"use client";
import Leaderboard from "./components/Leaderboard";
import Game from "./components/Game";

export default function GamePage() {
	return (
		<>
			<div className="flex gap-8 justify-center items-center h-screen">
				<Game />
				<Leaderboard />
			</div>
		</>
	);
}
