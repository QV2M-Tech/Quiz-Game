"use client";

import React from "react";

interface CategoryBadgeProps {
	category: "วิชาการ" | "บันเทิง";
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => (
	<span
		className={`px-2 py-1 rounded-full text-xs font-semibold ${
			category === "วิชาการ"
				? "bg-blue-100 text-blue-800"
				: "bg-green-100 text-green-800"
		}`}
	>
		{category}
	</span>
);

export default CategoryBadge;
