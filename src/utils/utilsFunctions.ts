export const splitChar = (char: string): string[] => char.split(' ');

export const returnsFirstChar = (char: string): string => char.substr(0, 1);

export const removesWhitespaceFromString = (value: string) => value === ' ' ? value.trim() : value;

export const handleResertInput = ((functionName: Function) => functionName(' '));