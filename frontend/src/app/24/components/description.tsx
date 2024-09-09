import React from "react";

interface DescriptionProps {
	level: string;
}

const Description: React.FC<DescriptionProps> = ({ level }) => {
	return (
		<div className="flex w-4/12 bg-white shadow-lg rounded-xl justify-center p-5 ml-10">
			{level === "easy" && (
				<div>
					<h2 className="flex justify-center items-center">กติกา</h2>
					<ol>
						<li>1. มีตัวเลข 4 ตัว นำมา + - * / ให้ได้ 24</li>
						<li>2. ตัวเลขใช้ได้ตัวละครั้ง</li>
						<li>3. ดำเนินการใช้ได้แค่ + - * / ( ) เท่านั้น</li>
						<li>4. มีเวลา 60 วิ</li>
						<li>5. ตอบถูก +5 คะแนน ตอบผิด รอ 5 วิ ถึงเริ่มข้อใหม่</li>
					</ol>
					<h2 className="flex justify-center items-center">ตัวอย่าง</h2>
					<p>ชุดตัวเลข: 3 5 7 9</p>
					<p>คำตอบ: 24</p>
					<p>วิธีคิด: (7-5)*(9+3)</p>

					<h2 className="flex justify-center items-center">เทคนิค</h2>
					<ul>
						<li>ยอมผิดเพื่อรีบเปลี่ยนข้อ</li>
						<li>เปลี่ยนภาษาอังกฤษไว้รอ แล้วกด enter เพื่อตอบ</li>
					</ul>
				</div>
			)}
			{level === "medium" && (
				<div>
					<h2 className="flex justify-center items-center">กติกา</h2>
					<ol>
						<li>1. มีตัวเลข 4 ตัว นำมา + - * / ^ ให้ได้คำตอบ</li>
						<li>2. ตัวเลขใช้ได้ตัวละครั้ง</li>
						<li>3. ดำเนินการใช้ได้แค่ + - * / ^ ( ) เท่านั้น</li>
						<li>4. มีเวลา 300 วิ</li>
						<li>5. ตอบถูก +5 คะแนน ตอบผิด รอ 10 วิ ถึงเริ่มข้อใหม่</li>
					</ol>
					<h2 className="flex justify-center items-center">ตัวอย่าง</h2>
					<p>ชุดตัวเลข: 2 5 5 9</p>
					<p>คำตอบ: 1015</p>
					<p>วิธีคิด: 2^(5+5)-9</p>

					<h2 className="flex justify-center items-center">เทคนิค</h2>
					<ul>
						<li>ยอมผิดเพื่อรีบเปลี่ยนข้อ</li>
						<li>เปลี่ยนภาษาอังกฤษไว้รอ แล้วกด enter เพื่อตอบ</li>
					</ul>
				</div>
			)}
			{level === "hard" && (
				<div>
					<h2 className="flex justify-center items-center">กติกา</h2>
					<ol>
						<li>1. มีตัวเลข 5 ตัว นำมา + - * / ^ ! ให้ได้คำตอบ</li>
						<li>2. ตัวเลขใช้ได้ตัวละครั้ง</li>
						<li>3. ดำเนินการใช้ได้แค่ + - * / ^ ! ( ) เท่านั้น</li>
						<li>4. มีเวลา 600 วิ</li>
						<li>5. ตอบถูก +5 คะแนน ตอบผิด รอ 15 วิ ถึงเริ่มข้อใหม่</li>
					</ol>
					<h2 className="flex justify-center items-center">ตัวอย่าง</h2>
					<p>ชุดตัวเลข: 2 2 3 9 4</p>
					<p>คำตอบ: 184</p>
					<p>วิธีคิด: 2^(3*2) + (9-4)!</p>

					<h2 className="flex justify-center items-center">เทคนิค</h2>
					<ul>
						<li>ยอมผิดเพื่อรีบเปลี่ยนข้อ</li>
						<li>เปลี่ยนภาษาอังกฤษไว้รอ แล้วกด enter เพื่อตอบ</li>
					</ul>
				</div>
			)}
		</div>
	);
};

export default Description;
