"use client";

import React from "react";
import { Home, School, Folder, Settings, Logout } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const NavRail: React.FC = () => (
	<div className="flex flex-col justify-between w-16 bg-primary shadow-md h-screen fixed left-0 top-0">
		<div className="flex flex-col items-center py-4 space-y-4">
			<IconButton>
				<Home />
			</IconButton>
			<IconButton>
				<School />
			</IconButton>
			<IconButton>
				<Folder />
			</IconButton>
			<IconButton>
				<Settings />
			</IconButton>
		</div>
		<div className="flex justify-center items-center py-4 space-y-4">
			<IconButton>
				<Logout />
			</IconButton>
		</div>
	</div>
);

export default NavRail;
