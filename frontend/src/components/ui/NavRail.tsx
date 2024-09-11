"use client";

import React, { useMemo } from "react";
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
import UserProfile from "./userprofile";
import { useUser } from "@/context/userContext";

interface LinkItem {
	name: string;
	path: string;
	icon: React.ReactNode;
	isAdmin?: boolean;
}

const NavRail: React.FC = () => {
	const pathname = usePathname();
	const { User, isLoading, refreshUser } = useUser();

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
				isAdmin: true,
			},
			{
				name: "จัดการผู้ใช้",
				path: "/user",
				icon: <ManageAccountsRounded />,
				isAdmin: true,
			},
			{
				name: "จัดการหัวข้อ",
				path: "/topic",
				icon: <TopicRounded />,
				isAdmin: true,
			},
		],
		[]
	);

	if (isLoading || pathname === "/" || pathname === "/register") {
		return null;
	}

	const handleLogout = () => {
		localStorage.removeItem("token");
		refreshUser();
	};

	return (
		<nav className="flex flex-col justify-between fixed z-20 gap-4 h-screen w-16 sm:w-20 px-2 py-4 bg-white shadow-md">
			<div className="flex flex-col items-center gap-4">
				<UserProfile />
				{links.map((link, index) => (
					<React.Fragment key={link.name}>
						{(!link.isAdmin || (User && User.isAdmin)) && (
							<Link
								href={link.path}
								className={`flex flex-col items-center gap-1 ${
									link.path === pathname
										? "text-orange-600"
										: "text-gray-600 hover:text-orange-600"
								} transition-all`}
							>
								<div className="flex items-center justify-center">
									{link.icon}
								</div>
								<span className="text-xs text-center">{link.name}</span>
							</Link>
						)}
						{index === 0 && <div className="w-3/4 h-px bg-gray-300" />}
					</React.Fragment>
				))}
			</div>

			<div className="flex justify-center items-center">
				<Link
					href="/"
					className="flex flex-col items-center gap-2"
					onClick={handleLogout}
				>
					<IconButton>
						<Logout />
					</IconButton>
					<span className="text-xs text-center">ออกจากระบบ</span>
				</Link>
			</div>
		</nav>
	);
};

export default NavRail;
