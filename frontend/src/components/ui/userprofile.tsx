"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/context/userContext";
import { LoaderCircle } from "lucide-react";

const UserProfile: React.FC = () => {
	const { User } = useUser();
	const [imageLoaded, setImageLoaded] = useState(false);

	useEffect(() => {
		if (User && User.profile) {
			const img = new Image();
			img.src = User.profile;
			img.onload = () => setImageLoaded(true);
			img.onerror = () => setImageLoaded(false);
		}
	}, [User]);

	return (
		<div>
			{imageLoaded ? (
				<img className="h-14 rounded-full" src={User?.profile} alt="Profile" />
			) : (
				<LoaderCircle /> // Or some placeholder if image fails to load
			)}
		</div>
	);
};

export default UserProfile;
