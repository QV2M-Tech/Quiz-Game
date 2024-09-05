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
import UserProfile from "./userprofile";
import { useUser } from "@/context/userContext";

interface LinkItem {
	name: string;
	path: string;
	icon: React.ReactNode;
	isAdmin?: boolean; // Add isAdmin optional property
}

const NavRail: React.FC = () => {
	const pathname = usePathname();
	const { User } = useUser();

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

	const isActive = useCallback(
		(currentPath: string, linkPath: string): boolean => {
			return (
				currentPath === linkPath ||
				currentPath === `${linkPath}/` || // Added this line to handle trailing slash
				(linkPath === "/topic" && currentPath.startsWith("/topic"))
			);
		},
		[]
	);

	// Hide NavRail on /login and /register routes
	if (pathname === "/" || pathname === "/register") {
		return null;
	}

	const handleLogout = () => {
		localStorage.removeItem("token"); // Clear the token from localStorage
	};

	return (
		<div className="flex flex-col justify-between fixed gap-4 h-screen w-20 px-3 py-4 bg-white shadow-md">
			<div className="flex flex-col items-center gap-4">
				<UserProfile />
				{links.map((link, index) => (
					<React.Fragment key={link.name}>
						{!link.isAdmin || (User && User.isAdmin) ? ( // Only render if isAdmin is false or User.isAdmin is true
							<Link
								href={link.path}
								className="flex flex-col items-center gap-2"
							>
								<IconButton
									className={`${
										isActive(pathname, link.path) ? "bg-accent" : ""
									}`}
								>
									{link.icon}
								</IconButton>
								<span className="text-xs text-center">{link.name}</span>
							</Link>
						) : null}
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
		</div>
	);
};

export default NavRail;
