export type Direction = 'asc' | 'desc';

export const useSort = <T>() => {
	const sorter = {
		date: (sortKey: string, direction: Direction) => (a: any, b: any) => {
			// TODO: fix type
			return (new Date(a[sortKey]) as any) - (new Date(b[sortKey]) as any);
		},
		string: (sortKey: string, direction: Direction) => (a: any, b: any) => {
			// TODO: fix type
			return a[sortKey].toLowerCase().localeCompare(b[sortKey].toLowerCase());
		},
	};

	return {
		sorter,
	};
};
