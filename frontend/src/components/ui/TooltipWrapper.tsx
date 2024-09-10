import React, { ReactNode } from "react";
import {
	TooltipProvider,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip";

interface TooltipWrapperProps {
	content: string;
	children: ReactNode;
}

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
	content,
	children,
}) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>{children}</TooltipTrigger>
				<TooltipContent>{content}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default TooltipWrapper;
