export type Direction = 'asc' | 'desc';

export const useSort = () => {
	// type dateType = string | number | Date;

	const sorter = {
		date: (sortKey: string) => (a: any, b: any) => {
			return (new Date(a[sortKey]) as any) - (new Date(b[sortKey]) as any);
		},
		string: (sortKey: string) => (a: any, b: any) => {
			return a[sortKey]?.toLowerCase().localeCompare(b[sortKey]?.toLowerCase());
		},
	};

	return {
		sorter,
	};
};
