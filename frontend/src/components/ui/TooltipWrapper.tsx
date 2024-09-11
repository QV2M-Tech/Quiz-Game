import React, { ReactNode, useState, useEffect } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // นำเข้า CSS ของ Tippy.js

interface TooltipWrapperProps {
	content: string;
	children: ReactNode;
}

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
	content,
	children,
}) => {
	const [isTouchDevice, setIsTouchDevice] = useState(false);

	// ใช้ useEffect เพื่อตรวจสอบว่ามีการรองรับ touch screen หรือไม่
	useEffect(() => {
		const checkIfTouchDevice = () => {
			setIsTouchDevice(
				"ontouchstart" in window || navigator.maxTouchPoints > 0
			);
		};

		checkIfTouchDevice();
	}, []);

	return isTouchDevice ? (
		<div style={{ display: "inline-block" }}>{children}</div>
	) : (
		<Tippy
			content={content}
			placement="top"
			arrow={true}
			className="custom-tooltip"
		>
			<div style={{ display: "inline-block" }}>{children}</div>
		</Tippy>
	);
};

export default TooltipWrapper;
