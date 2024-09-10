import React, { ReactNode } from "react";
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
	return (
		<Tippy content={content} placement="top" arrow>
			<div style={{ display: "inline-block" }}>{children}</div>
		</Tippy>
	);
};

export default TooltipWrapper;
