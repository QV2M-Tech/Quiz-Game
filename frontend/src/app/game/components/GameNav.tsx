import { timeFormat } from "@/lib/format";

export default function GameNav({
	time,
	score,
}: {
	time: number;
	score: number;
}) {
	return (
		<nav className="flex justify-center sm:justify-end items-center sm:pr-10 gap-8 bg-white shadow-md h-12">
			<h3>คะแนน: {score}</h3>
			<h3 className="text-red-500">เหลือเวลา {timeFormat(time)} นาที</h3>
		</nav>
	);
}
