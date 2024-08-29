import React, { useState, useEffect } from "react";
import { evaluate } from "mathjs";

interface Body {
	level: string; // Define the type of the level prop
}

// สุ่มตัวเลข
const generateRandomNumbers = (level: string) => {
	const count = level === "hard" ? 5 : 4;
	const numbers = [];
	for (let i = 0; i < count; i++) {
		numbers.push(Math.floor(Math.random() * 10) + 1);
	}
	return numbers;
};

// สุ่มตัวดำเนินการ
const getRandomOperator = (level: string) => {
	const operators =
		level === "hard"
			? ["+", "-", "*", "/", "^", "!"]
			: ["+", "-", "*", "/", "^"];
	return operators[Math.floor(Math.random() * operators.length)];
};

// ตรวจสอบว่าการหารเป็นจำนวนเต็ม
const isIntegerDivision = (a: number, b: number) => {
	return a % b === 0;
};

// ตรวจสอบว่าผลลัพธ์เป็นจำนวนเต็ม
const isInteger = (value: number) => {
	return Number.isInteger(value);
};

// สร้างสมการที่สุ่มและคำนวณคำตอบเป้าหมาย
const generateExpression = (numbers: number[], level: string) => {
	let expressions = [];
	const operators =
		level === "hard"
			? ["+", "-", "*", "/", "^", "!"]
			: level === "medium"
			? ["+", "-", "*", "/", "^"]
			: ["+", "-", "*", "/"];

	// สร้างสมการพื้นฐาน
	for (let i = 0; i < 3; i++) {
		expressions.push(
			`${numbers[0]} ${getRandomOperator(level)} ${
				numbers[1]
			} ${getRandomOperator(level)} ${numbers[2]} ${getRandomOperator(level)} ${
				numbers[3]
			}`,
			`(${numbers[0]} ${getRandomOperator(level)} ${
				numbers[1]
			}) ${getRandomOperator(level)} (${numbers[2]} ${getRandomOperator(
				level
			)} ${numbers[3]})`,
			`(${numbers[0]} ${getRandomOperator(level)} ${
				numbers[1]
			} ${getRandomOperator(level)} ${numbers[2]}) ${getRandomOperator(
				level
			)} ${numbers[3]}`,
			`${numbers[0]} ${getRandomOperator(level)} (${
				numbers[1]
			} ${getRandomOperator(level)} ${numbers[2]} ${getRandomOperator(level)} ${
				numbers[3]
			})`
		);
	}

	for (let expr of expressions) {
		try {
			let result = evaluate(expr);

			// ตรวจสอบการหารที่เป็นจำนวนเต็ม
			if (expr.includes("/")) {
				let parts = expr.split(" ");
				for (let i = 0; i < parts.length; i++) {
					if (parts[i] === "/") {
						let a = evaluate(parts.slice(0, i).join(" "));
						let b = parseInt(parts[i + 1], 10);
						if (!isIntegerDivision(a, b)) {
							return null; // ถ้าไม่เป็นจำนวนเต็ม ให้คืนค่า null
						}
					}
				}
			}

			// ตรวจสอบผลลัพธ์
			if (isInteger(result)) {
				if (level === "easy" && result === 24) {
					return { expression: expr, result: result };
				} else if (level === "medium" && result >= 100 && result <= 1000) {
					return { expression: expr, result: result };
				} else if (
					level === "hard" &&
					((result >= -1000 && result <= -100) ||
						(result >= 100 && result <= 1000))
				) {
					return { expression: expr, result: result };
				}
			}
		} catch (e) {
			continue;
		}
	}

	return null;
};

// ตรวจสอบว่าผู้ใช้ใช้ตัวเลขทั้ง 4 ตัวและใช้เพียงครั้งเดียว
const isValidExpression = (userInput: string, numbers: number[]) => {
	const numberCount = new Map<number, number>();

	// นับจำนวนครั้งที่แต่ละตัวเลขปรากฏ
	numbers.forEach((num) => {
		numberCount.set(num, (numberCount.get(num) || 0) + 1);
	});

	const inputNumbers = userInput.match(/\d+/g); // ดึงเฉพาะตัวเลขจาก input
	if (!inputNumbers) return false;

	for (let num of inputNumbers) {
		const number = parseInt(num, 10);
		if (!numberCount.has(number) || numberCount.get(number) === 0) {
			return false; // ถ้าพบตัวเลขที่ไม่ใช่หรือตัวเลขนั้นหมด
		}
		numberCount.set(number, (numberCount.get(number) as number) - 1);
	}

	// ตรวจสอบว่าทุกตัวเลขถูกใช้หมด
	return Array.from(numberCount.values()).every((count) => count === 0);
};

const Body: React.FC<Body> = ({ level }) => {
	const [numbers, setNumbers] = useState<number[]>([]);
	const [target, setTarget] = useState<number>(0);
	const [input, setInput] = useState<string>("");
	const [message, setMessage] = useState<string>("");
	const [score, setScore] = useState<number>(0);
	const [timeLeft, setTimeLeft] = useState<number>(60); // ตัวจับเวลานับถอยหลัง (60 วินาที)
	const [start, setStart] = useState<boolean>(false); // ตั้งค่าเริ่มต้นเป็น false เพื่อไม่ให้ตัวจับเวลาทำงานทันที

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;

		if (start) {
			interval = setInterval(() => {
				setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
			}, 1000);
		}

		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [start]);

	useEffect(() => {
		if (timeLeft === 0 && start) {
			setMessage("หมดเวลา! กรุณาลองใหม่อีกครั้ง");
			setStart(false); // หยุดการเล่นเมื่อหมดเวลา
		}
	}, [timeLeft, start]);

	const resetGame = () => {
		const generatedNumbers = generateRandomNumbers(level);
		setNumbers(generatedNumbers);
		const generatedExpression = generateExpression(generatedNumbers, level);
		if (generatedExpression) {
			setTarget(generatedExpression.result);
		} else {
			resetGame();
		}
		setInput("");
		setMessage("");
		setTimeLeft(60);
		setScore(0);
		setStart(true); // เริ่มเกมใหม่และเริ่มนับเวลาหลังจากกดปุ่ม "New Game"
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	const checkAnswer = () => {
		if (!isValidExpression(input, numbers)) {
			setMessage("Invalid input! Please use all numbers once.");
			return;
		}

		try {
			const userResult = evaluate(input);
			if (userResult === target) {
				setMessage("Correct!");
				setScore(score + 1);
				const generatedNumbers = generateRandomNumbers(level);
				setNumbers(generatedNumbers);
				const generatedExpression = generateExpression(generatedNumbers, level);
				if (generatedExpression) {
					setTarget(generatedExpression.result);
				}
				setInput("");
				setMessage("");
			} else {
				setMessage("Try again!");
				const generatedNumbers = generateRandomNumbers(level);
				setNumbers(generatedNumbers);
				const generatedExpression = generateExpression(generatedNumbers, level);
				if (generatedExpression) {
					setTarget(generatedExpression.result);
				}
				setInput("");
				setMessage("");
				setTimeLeft(timeLeft - 5);
			}
		} catch {
			setMessage("Invalid input!");
		}
	};

	return (
		<div className="flex flex-col items-center w-8/12 bg-orange-500">
			<div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md w-full">
				<h1 className="text-2xl font-bold text-center mb-4">Game 24</h1>
				<div className="flex h-20 bg-gray-300">
					<div className="m-5 bg-yellow-400 justify-center items-center p-2 w-full">
						คะแนน : {score} คะแนน
					</div>
					<div className="m-5 bg-yellow-400 justify-center items-center p-2 w-full">
						เวลา : {timeLeft} วิ
					</div>
				</div>
				<div className="mb-4">
					<p>Numbers: {numbers.join(", ")}</p>
					<p>Target: {target}</p>
				</div>
				<input
					type="text"
					value={input}
					onChange={handleChange}
					className="w-full p-2 border border-gray-300 rounded-md"
					placeholder="Enter your equation"
				/>
				<button
					onClick={checkAnswer}
					className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md"
				>
					Submit
				</button>
				{message && <p className="mt-4 text-center">{message}</p>}
				<button
					onClick={resetGame}
					className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-md"
				>
					New Game
				</button>
			</div>
		</div>
	);
};

export default Body;
