const date = new Date();
export const day = date.getDate();
export const month = date.toLocaleString('default', { month: 'long' });
export const dayName = date.toLocaleString('default', { weekday: 'long' });