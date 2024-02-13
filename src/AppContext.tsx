"use client";
import { createContext, useEffect, useState } from "react";
import { IBook, IUser } from "./interfaces";
import axios from "axios";

const backendUrl = 'http://localhost:4902';

interface IAppContext {
	books: IBook[];
	users: IUser[];
}

interface IAppProvider {
	children: React.ReactNode;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [books, setBooks] = useState<IBook[]>([]);
	const [users, setUsers] = useState<IUser[]>([]);

	useEffect(() => {
		(async () => {
			const response = await axios.get(`${backendUrl}/books`);
			const _books:IBook[] = response.data;
			setBooks(_books);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const response = await axios.get(`${backendUrl}/users`);
			const _users:IUser[] = response.data;
			setUsers(_users);
		})();
	}, []);

	return (
		<AppContext.Provider
			value={{
				books,
				users
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
