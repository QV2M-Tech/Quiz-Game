"use client";

import React, {
	createContext,
	useState,
	useEffect,
	useContext,
	ReactNode,
	FC,
} from "react";
import { jwtDecode } from "jwt-decode"; // Import without destructuring

// Define User type
interface User {
	id: string;
	username: string;
	name: string;
	profile: string;
}

// Define context type
interface UserContextType {
	User: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Create Context with undefined as the initial value
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
	children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
	const [User, setUser] = useState<User | null>(null);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const token = localStorage.getItem("token");
				if (token) {
					// Use jwtDecode<User> to specify the expected type
					const decodedToken = jwtDecode<User>(token);
					console.log("", { decodedToken });
					setUser(decodedToken);
				}
			} catch (error) {
				console.error("Error decoding token or fetching user data:", error);
			}
		};
		fetchUserData();
	}, []);

	return (
		<UserContext.Provider value={{ User, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

// Create a hook for using UserContext
export const useUser = (): UserContextType => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};
