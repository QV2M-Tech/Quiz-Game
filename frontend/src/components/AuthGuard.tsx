// AuthGuard.tsx
"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/context/userContext";

interface AuthGuardProps {
	children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
	const { User } = useUser();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		console.log("Checking user authentication in AuthGuard", User);
		const adminPages = ["/user", "/topic", "/score"];

		if (!User) {
			console.log("User not found, redirecting to login.");
			router.push("/"); // เปลี่ยนไปยังหน้าเข้าสู่ระบบถ้ายังไม่เข้าสู่ระบบ
			return;
		}

		if (adminPages.includes(pathname) && !User.isAdmin) {
			console.log("User is not an admin, redirecting to 403.");
			router.push("/403"); // เปลี่ยนไปยังหน้า 403 Forbidden ถ้าไม่ใช่ Admin
		}
	}, [User, pathname, router]);

	return <>{children}</>;
};

export default AuthGuard;
