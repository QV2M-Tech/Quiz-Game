"use client"; // ต้องใส่บรรทัดนี้เพื่อระบุว่าไฟล์นี้เป็น Client Component

import React, {
	createContext,
	useState,
	useEffect,
	useContext,
	ReactNode,
	FC,
} from "react";
import { usePathname, useRouter } from "next/navigation"; // นำเข้า usePathname จาก next/navigation
import { jwtDecode } from "jwt-decode"; // นำเข้า jwtDecode

// กำหนดประเภทข้อมูล User
interface User {
	id: string;
	username: string;
	name: string;
	profile: string;
	isAdmin: boolean;
}

// กำหนดประเภทข้อมูลของบริบท User
interface UserContextType {
	User: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// สร้าง Context โดยมีค่าเริ่มต้นเป็น undefined
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
	children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
	const [User, setUser] = useState<User | null>(null);

	const pathname = usePathname(); // ใช้ usePathname เพื่อรับค่าของเส้นทางปัจจุบัน

	const router = useRouter();

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const token = localStorage.getItem("token");
				if (token) {
					const decodedToken = jwtDecode<User>(token);

					setUser(decodedToken);
				} else {
					router.push("/");
				}
			} catch (error) {
				console.error("Error decoding token or fetching user data:", error);
			}
		};
		fetchUserData();
	}, [pathname]); // ใส่ pathname ใน dependency array เพื่อให้ useEffect ทำงานเมื่อเส้นทางเปลี่ยน

	return (
		<UserContext.Provider value={{ User, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

// สร้าง Hook สำหรับใช้บริบท UserContext
export const useUser = (): UserContextType => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};
