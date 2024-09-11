"use client";

import React, {
	createContext,
	useState,
	useEffect,
	useContext,
	ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface User {
	id: string;
	username: string;
	name: string;
	profile: string;
	isAdmin: boolean;
}

interface UserContextType {
	User: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	isLoading: boolean;
	setUserFromToken: (token: string) => void;
	refreshUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [User, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [forceUpdate, setForceUpdate] = useState(0);

	const router = useRouter();

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const token = localStorage.getItem("token");
				console.log("Token found in UserContext:", !!token);
				if (token) {
					const decodedToken = jwtDecode<User>(token);
					console.log("Decoded token in UserContext:", decodedToken);
					setUser(decodedToken);
				} else {
					console.log("No token found in UserContext");
					setUser(null);
				}
			} catch (error) {
				console.error("Error decoding token or fetching user data:", error);
				setUser(null);
			} finally {
				setIsLoading(false);
				console.log("Loading finished in UserContext");
			}
		};
		fetchUserData();
	}, [forceUpdate]);

	useEffect(() => {
		console.log("User state changed:", User);
	}, [User]);

	const setUserFromToken = (token: string) => {
		try {
			const decodedToken = jwtDecode<User>(token);
			setUser(decodedToken);
			localStorage.setItem("token", token);
		} catch (error) {
			console.error("Error decoding token:", error);
			setUser(null);
		}
	};

	const refreshUser = () => setForceUpdate((prev) => prev + 1);

	return (
		<UserContext.Provider
			value={{ User, setUser, isLoading, setUserFromToken, refreshUser }}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = (): UserContextType => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};
