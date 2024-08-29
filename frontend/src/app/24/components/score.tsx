import React from "react";

interface Props {
	level: string;
}

const easy = [
	{
		name: "B",
		score: "15",
	},
	{
		name: "A",
		score: "20",
	},
];

const Score: React.FC<Props> = ({ level }) => {
	// Sort rows by score in descending order
	const sortedRows = [...easy].sort(
		(a, b) => parseInt(b.score) - parseInt(a.score)
	);

	return (
		<div className="flex w-4/12 bg-green-500">
			{level === "easy" && (
				<div className="flex flex-col gap-6 w-full tw-box">
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
							{sortedRows.map((row, index) => (
								<tr key={index} className="h-10 hover:bg-primary">
									<td>{index + 1}</td>
									<td>{row.name}</td>
									<td>{row.score}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
			{level === "medium" && <div>medium</div>}
			{level === "hard" && <div>hard</div>}
		</div>
	);
};

export default Score;
