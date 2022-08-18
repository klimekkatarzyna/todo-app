export type Direction = 'asc' | 'desc';

export const useSort = <T>() => {
	type dateType = string | number | Date;

	const sorter = {
		date: (sortKey: string) => (a: any, b: any) => {
			// TODO: fix type
			return (new Date(a[sortKey]) as any) - (new Date(b[sortKey]) as any);
		},
		string: (sortKey: string) => (a: any, b: any) => {
			// TODO: fix type
			return a[sortKey]?.toLowerCase().localeCompare(b[sortKey]?.toLowerCase());
		},
	};

	return {
		sorter,
	};
};
