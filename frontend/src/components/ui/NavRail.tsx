"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	MenuBookRounded,
	StarsRounded,
	ManageAccountsRounded,
	TopicRounded,
	Logout,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface LinkItem {
	name: string;
	path: string;
	icon: React.ReactNode;
}

const links: LinkItem[] = [
	{
		name: "เลือกหมวดหมู่",
		path: "/selectgame",
		icon: <MenuBookRounded />,
	},
	{
		name: "สรุปคะแนนรวม",
		path: "/score",
		icon: <StarsRounded />,
	},
	{
		name: "จัดการผู้ใช้",
		path: "/user",
		icon: <ManageAccountsRounded />,
	},
	{
		name: "จัดการหัวข้อ",
		path: "/topic",
		icon: <TopicRounded />,
	},
];

const NavRail: React.FC = () => {
	const pathname = usePathname();

	// Hide NavRail on /login and /register routes
	if (pathname === "/" || pathname === "/register") {
		return null;
	}

	return (
		<div className="flex flex-col h-screen w-28 px-3 py-4 justify-between bg-gray-50 fixed">
			<div className="flex flex-col items-center space-y-4 py-4">
				{links.map((link, index) => (
					<React.Fragment key={link.name}>
						<Link
							href={link.path}
							className="flex flex-col items-center space-y-2"
						>
							<IconButton
								color={pathname === link.path ? "secondary" : "default"}
							>
								{link.icon}
							</IconButton>
							<span className="text-sm">{link.name}</span>
						</Link>
						{index === 0 && <div className="w-3/4 h-px bg-gray-300 my-2" />}
					</React.Fragment>
				))}
			</div>
			<div className="flex justify-center items-center py-4">
				<Link href="/login" className="flex flex-col items-center space-y-2">
					<IconButton>
						<Logout />
					</IconButton>
					<span className="text-sm">ออกจากระบบ</span>
				</Link>
			</div>
		</div>
	);
};

export default NavRail;
