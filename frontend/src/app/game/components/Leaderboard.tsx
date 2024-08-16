export default function Leaderboard() {
	return (
		<div className="flex flex-col gap-6 bg-white w-2/6 h-5/6 rounded-3xl shadow-xl py-6 px-8">
			<h1 className="text-center mb-">คะแนนสูงสุด 10 อันดับ</h1>
			<table className="w-full text-center">
				<thead>
					<tr>
						<th className="h-12">อันดับ</th>
						<th>ชื่อ</th>
						<th>คะแนน</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					<tr>
						<td className="h-10">1</td>
						<td>a</td>
						<td>100</td>
					</tr>
					<tr>
						<td className="h-10">2</td>
						<td>a</td>
						<td>100</td>
					</tr>
					<tr>
						<td className="h-10">3</td>
						<td>a</td>
						<td>100</td>
					</tr>
					<tr>
						<td className="h-10">4</td>
						<td>a</td>
						<td>100</td>
					</tr>
					<tr>
						<td className="h-10">5</td>
						<td>a</td>
						<td>100</td>
					</tr>
					<tr>
						<td className="h-10">6</td>
						<td>a</td>
						<td>100</td>
					</tr>
					<tr>
						<td className="h-10">7</td>
						<td>a</td>
						<td>100</td>
					</tr>
					<tr>
						<td className="h-10">8</td>
						<td>a</td>
						<td>100</td>
					</tr>
					<tr>
						<td className="h-10">9</td>
						<td>a</td>
						<td>100</td>
					</tr>
					<tr>
						<td className="h-10">10</td>
						<td>a</td>
						<td>100</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
