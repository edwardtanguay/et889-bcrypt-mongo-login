export interface IBook {
	_id: string;
	title: string;
	authors: string[];
	pages: number;
	available: boolean;
}

export interface IAddress {
	street: string;
	zipCode: string;
	city: string;
}

export interface IUser {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	address: IAddress;
}
