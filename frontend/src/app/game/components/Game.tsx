import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Game() {
	const router = useRouter();
	// const navigate = useNavigate();
	const [showTimeout, setShowTimeout] = useState<boolean>(false);
	const [showConfirm, setShowConfirm] = useState<boolean>(false);
	const [time, setTime] = useState<number>(30);
	const [start, setStart] = useState<boolean>(false);
	const [reload, setReload] = useState<boolean>(false);

	function handleRestart(): void {
		setShowTimeout(false);
		setReload(!reload);
	}
	function handleExit(): void {
		router.push("/");
	}

	useEffect(() => {
		setTime(30);

		const timeoutId = setTimeout(() => {
			setStart(true);
		}, 1000);

		return () => clearTimeout(timeoutId);
	}, [reload]);

	useEffect(() => {
		if (time === 0) setShowTimeout(true);

		if (!start || time <= 0) return;

		const intervalId = setInterval(() => {
			setTime((prevSeconds) => prevSeconds - 1);
		}, 1000);

		return () => clearInterval(intervalId);
	}, [start, time]);

	return (
		<div className="bg-white w-3/6 h-5/6 flex flex-col justify-between p-6 rounded-3xl shadow-xl">
			<div className="flex flex-col items-center gap-4">
				<h1>เกมส์ตอบคำถาม</h1>
				<div className="flex justify-around w-full">
					<h2>หมวดหมู่ -วิชาการ-</h2>
					<h2>หัวข้อ -การเคลื่อนที่ในแนวเส้นตรง-</h2>
				</div>
			</div>
			<div className="flex flex-col items-center gap-4">
				<div className="w-2/3 h-40 bg-neutral-200"></div>
				<h2>-โจทย์-</h2>
			</div>
			{/* <h3 className="text-red-500">{time}</h3>
			<h3>คะแนน: 0</h3> */}
			<div className="flex flex-col items-center gap-4">
				<div className="grid grid-cols-2 grid-rows-2 gap-2 w-1/2">
					<button
						disabled={time === 0}
						className="btn-tw bg-sky-300 border border-sky-900 shadow-md hover:bg-sky-400"
					>
						40
					</button>
					<button
						disabled={time === 0}
						className="btn-tw bg-sky-300 border border-sky-900 shadow-md hover:bg-sky-400"
					>
						1
					</button>
					<button
						disabled={time === 0}
						className="btn-tw bg-sky-300 border border-sky-900 shadow-md hover:bg-sky-400"
					>
						9
					</button>
					<button
						disabled={time === 0}
						className="btn-tw bg-sky-300 border border-sky-900 shadow-md hover:bg-sky-400"
					>
						8
					</button>
				</div>
				<div className="flex gap-2">
					<button
						onClick={handleRestart}
						className="btn-tw bg-white border border-sky-900 shadow-md hover:bg-sky-900/20"
					>
						เริ่มเกมใหม่
					</button>
					<button
						onClick={handleExit}
						className="btn-tw bg-sky-900 text-white shadow-md hover:bg-sky-950"
					>
						ออกจากเกม
					</button>
				</div>
			</div>
		</div>
	);
}
