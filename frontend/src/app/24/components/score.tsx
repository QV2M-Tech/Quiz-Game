import React, { useEffect, useState } from "react";
import axios from "axios";

interface Props {
	level: string;
	IsEnd: any;
}

interface Score {
	name: string;
	score: string;
}

const Score: React.FC<Props> = ({ level, IsEnd }) => {
	const [scores, setScores] = useState<Score[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		const fetchScores = async () => {
			setLoading(true);
			setError("");

			try {
				// GET request เพื่อดึงคะแนนสูงสุด 10 อันดับจาก backend โดยระบุระดับความยาก
				const response = await axios.get<Score[]>(
					`http://localhost:6969/api/scores24/top10/${level}`
				);
				setScores(response.data); // ใช้ข้อมูลที่ได้จาก backend โดยตรง
			} catch (error: any) {
				setError("Error fetching scores");
			} finally {
				setLoading(false);
			}
		};

		fetchScores();
	}, [level, IsEnd]);

	return (
		<div className="flex w-4/12 mr-10">
			<div className="flex flex-col gap-6 w-full tw-box">
				<h2 className="text-center">คะแนนสูงสุด 10 อันดับ</h2>
				{loading ? (
					<p>Loading...</p>
				) : error ? (
					<p className="text-red-500">{error}</p>
				) : (
					<table className="w-full text-center">
						<thead>
							<tr className="h-12">
								<th className="w-1/5">อันดับ</th>
								<th className="w-3/5">ชื่อ</th>
								<th className="w-1/5">คะแนน</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-sky-200">
							{scores.map((row, index) => (
								<tr key={index} className="h-10 hover:bg-primary">
									<td>{index + 1}</td>
									<td>{row.name}</td>
									<td>{row.score}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
};

export default Score;
