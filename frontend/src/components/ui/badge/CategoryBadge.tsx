"use client";

import React from "react";

interface CategoryBadgeProps {
	category: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => (
	<span
		className={`px-2 py-1 rounded-full text-xs font-semibold ${
			category === "วิชาการ"
				? "bg-sky-100 text-sky-900"
				: "bg-green-100 text-green-800"
		}`}
	>
		{category}
	</span>
);

export default CategoryBadge;
