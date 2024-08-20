import React, { useState } from "react";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface FilterOptions {
	[key: string]: boolean;
}

const categories = [
	"วิชาการ",
	"บันเทิง",
	"กีฬา",
	"ข่าวสาร",
	"ดนตรี",
	// เพิ่มหมวดหมู่ที่ต้องการ
];

export default function FilterDropdown() {
	const [filters, setFilters] = useState<FilterOptions>({
		วิชาการ: false,
		บันเทิง: false,
		กีฬา: false,
		ข่าวสาร: false,
		ดนตรี: false,
	});

	const handleFilterChange = (category: string) => {
		setFilters({
			...filters,
			[category]: !filters[category],
		});
	};

	const applyFilters = () => {
		// ฟังก์ชันสำหรับกรองข้อมูลตาม filters ที่ถูกเลือก
		console.log("Applied filters:", filters);
	};

	return (
		<div className="p-4">
			<Popover>
				<PopoverTrigger asChild>
					<Button>กรอง</Button>
				</PopoverTrigger>
				<PopoverContent className="w-48 p-4">
					<div className="space-y-2">
						{categories.map((category) => (
							<div key={category} className="flex items-center">
								<Checkbox
									id={category}
									checked={filters[category]}
									onCheckedChange={() => handleFilterChange(category)}
								/>
								<label
									htmlFor={category}
									className="ml-2 text-sm font-medium text-gray-700"
								>
									{category}
								</label>
							</div>
						))}
					</div>
					<Button onClick={applyFilters} className="mt-4 w-full">
						Apply Filters
					</Button>
				</PopoverContent>
			</Popover>
		</div>
	);
}
