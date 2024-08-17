export default function Leaderboard() {
	let rank = 1;

	function createData(name: string, score: number) {
		return { rank: rank++, name, score };
	}

	const rows = [
		createData("Frozen yoghurt", 100),
		createData("Frozen yoghurt", 100),
		createData("Frozen yoghurt", 100),
		createData("Frozen yoghurt", 100),
		createData("Frozen yoghurt", 100),
		createData("Frozen yoghurt", 100),
		createData("Frozen yoghurt", 100),
		createData("Frozen yoghurt", 100),
		createData("Frozen yoghurt", 100),
		createData("Frozen yoghurt", 100),
	];

	return (
		<div className="flex flex-col gap-6 w-2/6 tw-box">
			<h1 className="text-center">คะแนนสูงสุด 10 อันดับ</h1>
			<table className="w-full text-center">
				<thead>
					<tr className="h-12">
						<th className="w-1/5">อันดับ</th>
						<th className="w-3/5">ชื่อ</th>
						<th className="w-1/5">คะแนน</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-sky-200">
					{rows.map((row, index) => (
						<tr key={index} className="h-10 hover:bg-primary">
							<td>{row.rank}</td>
							<td>{row.name}</td>
							<td>{row.score}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
