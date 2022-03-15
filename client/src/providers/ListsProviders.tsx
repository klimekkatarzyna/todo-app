import React, { FC, useEffect, useMemo, useState, createContext } from 'react';
import { useQuery } from 'react-query';

export interface ListsContextType {
	lists: never[] | [];
	setLists: React.Dispatch<React.SetStateAction<never[]>>;
}

// better do it in separate file because the values return by the context will be use in few files
export const ListsContext = createContext<ListsContextType>({} as ListsContextType);

interface IListsProvider {
	children: React.ReactNode;
}

export const ListsProvider: FC<IListsProvider> = ({ children }) => {
	const [lists, setLists] = useState([]);

	const value = useMemo(() => {
		return {
			lists,
			setLists,
		};
	}, [lists, setLists]);

	return <ListsContext.Provider value={value}>{children}</ListsContext.Provider>;
};
