export const parseUTCtoDate = (date: string) => new Date(date);

export const getDay = (date: Date) => date.getDate();
export const getMonth = (date: Date | string) => date.toLocaleString('default', { month: 'long' });
export const getDayName = (date: Date | string) => date.toLocaleString('default', { weekday: 'long' });

