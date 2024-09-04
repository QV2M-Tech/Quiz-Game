"use client"; // เนื่องจากไฟล์นี้จะทำงานฝั่ง client

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"; // นำเข้า usePathname
import { useUser } from "@/context/userContext";

interface AuthGuardProps {
	children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
	const { User } = useUser();
	const router = useRouter();
	const pathname = usePathname(); // ใช้ usePathname เพื่อดึง pathname ปัจจุบัน

	useEffect(() => {
		const adminPages = ["/user", "/topic", "/score"];

		// ตรวจสอบก่อนว่าข้อมูล User พร้อมหรือไม่
		if (User) {
			// ตรวจสอบว่า User มีสิทธิ์เข้าถึงหน้า admin หรือไม่
			if (adminPages.includes(pathname) && !User.isAdmin) {
				router.push("/403"); // Redirect ไปหน้า 403 Forbidden หากไม่ใช่ Admin
			}
		}
	}, [User, pathname, router]);

	return <>{children}</>;
};

export default AuthGuard;
