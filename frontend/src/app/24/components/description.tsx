import React from "react";

interface DescriptionProps {
	level: string; // Define the type of the level prop
}

const Description: React.FC<DescriptionProps> = ({ level }) => {
	return (
		<div className="flex w-4/12 bg-pink-500">
			{level == "easy" && <div>คำอธิบายในโหมด easy</div>}
			{level == "medium" && <div>คำอธิบายในโหมด medium</div>}
			{level == "hard" && <div>คำอธิบายในโหมด hard</div>}
		</div>
	);
};

export default Description;
