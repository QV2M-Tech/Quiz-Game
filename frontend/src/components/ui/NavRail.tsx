"use client";

import React, { useMemo, useCallback } from "react";
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

const NavRail: React.FC = () => {
	const pathname = usePathname();

	const links: LinkItem[] = useMemo(
		() => [
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
		],
		[]
	);

	const isActive = useCallback(
		(currentPath: string, linkPath: string): boolean => {
			return (
				currentPath === linkPath ||
				(linkPath === "/topic" && currentPath.startsWith("/topic"))
			);
		},
		[]
	);

	// Hide NavRail on /login and /register routes
	if (pathname === "/" || pathname === "/register") {
		return null;
	}

	return (
		<div className="flex flex-col justify-between fixed gap-4 h-screen w-20 px-3 py-4 bg-white shadow-md">
			<div className="flex flex-col items-center gap-4">
				{links.map((link, index) => (
					<React.Fragment key={link.name}>
						<Link href={link.path} className="flex flex-col items-center gap-2">
							<IconButton
								className={`${
									isActive(pathname, link.path) ? "bg-accent" : ""
								}`}
							>
								{link.icon}
							</IconButton>
							<span className="text-xs text-center">{link.name}</span>
						</Link>
						{index === 0 && <div className="w-3/4 h-px bg-gray-300" />}
					</React.Fragment>
				))}
			</div>
			<div className="flex justify-center items-center">
				<Link href="/" className="flex flex-col items-center gap-2">
					<IconButton>
						<Logout />
					</IconButton>
					<span className="text-xs text-center">ออกจากระบบ</span>
				</Link>
			</div>
		</div>
	);
};

export default NavRail;
