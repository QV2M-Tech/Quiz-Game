"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/context/userContext";

interface AuthGuardProps {
	children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
	const { User, isLoading } = useUser();
	const router = useRouter();
	const pathname = usePathname();
	const [isAuthorized, setIsAuthorized] = useState(false);

	useEffect(() => {
		console.log("AuthGuard effect running");
		console.log("isLoading:", isLoading);
		console.log("User:", User);
		console.log("Current pathname:", pathname);

		if (isLoading) {
			console.log("Still loading, waiting...");
			return;
		}

		if (!User && pathname !== "/") {
			console.log("User not found, redirecting to login.");
			router.push("/");
			return;
		}

		if (
			User &&
			!User.isAdmin &&
			["/user", "/topic", "/score"].includes(pathname)
		) {
			console.log("User is not an admin, redirecting to 403.");
			router.push("/403");
			return;
		}

		console.log("User is authorized");
		setIsAuthorized(true);
	}, [User, pathname, router, isLoading]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return isAuthorized ? <>{children}</> : null;
};

export default AuthGuard;
