import { useRouter } from "next/navigation";

export default function Game({
	reload,
	setReload,
	time,
	setShowTimeout,
}: {
	reload: boolean;
	setReload: Function;
	time: number;
	setShowTimeout: Function;
}) {
	const router = useRouter();

	function handleRestart(): void {
		setShowTimeout(false);
		setReload(!reload);
	}
	function handleExit(): void {
		router.push("/");
	}

	return (
		<div className="flex flex-col justify-between gap-6 w-3/6 tw-box">
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

			<div className="flex flex-col items-center gap-4">
				<div className="grid grid-cols-2 grid-rows-2 gap-2 w-1/2">
					<button
						disabled={time === 0}
						className="tw-btn bg-sky-300 border border-sky-900 shadow-md hover:bg-sky-400"
					>
						40
					</button>
					<button
						disabled={time === 0}
						className="tw-btn bg-sky-300 border border-sky-900 shadow-md hover:bg-sky-400"
					>
						1
					</button>
					<button
						disabled={time === 0}
						className="tw-btn bg-sky-300 border border-sky-900 shadow-md hover:bg-sky-400"
					>
						9
					</button>
					<button
						disabled={time === 0}
						className="tw-btn bg-sky-300 border border-sky-900 shadow-md hover:bg-sky-400"
					>
						8
					</button>
				</div>
				<div className="flex gap-2">
					<button
						onClick={handleRestart}
						className="tw-btn bg-white border border-sky-900 shadow-md hover:bg-sky-900/20"
					>
						เริ่มเกมใหม่
					</button>
					<button
						onClick={handleExit}
						className="tw-btn bg-sky-900 text-white shadow-md hover:bg-sky-950"
					>
						ออกจากเกม
					</button>
				</div>
			</div>
		</div>
	);
}
