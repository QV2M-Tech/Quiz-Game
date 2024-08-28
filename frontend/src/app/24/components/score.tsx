import React from "react";

interface Props {
	level: string;
}
const Score: React.FC<Props> = ({ level }) => {
	return (
		<div className="flex w-4/12 bg-green-500">
			{level == "easy" && <div>easy</div>}
			{level == "medium" && <div>medium</div>}
			{level == "hard" && <div>hard</div>}
		</div>
	);
};

export default Score;
