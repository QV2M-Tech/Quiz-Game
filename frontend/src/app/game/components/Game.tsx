export default function Game({
	time,
	handleRestart,
	setShowExit,
}: {
	time: number;
	handleRestart: Function;
	setShowExit: Function;
}) {
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
						className="tw-btn bg-accent border border-secondary shadow-md hover:bg-accent-hover"
					>
						40
					</button>
					<button
						disabled={time === 0}
						className="tw-btn bg-accent border border-secondary shadow-md hover:bg-accent-hover"
					>
						1
					</button>
					<button
						disabled={time === 0}
						className="tw-btn bg-accent border border-secondary shadow-md hover:bg-accent-hover"
					>
						9
					</button>
					<button
						disabled={time === 0}
						className="tw-btn bg-accent border border-secondary shadow-md hover:bg-accent-hover"
					>
						8
					</button>
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
