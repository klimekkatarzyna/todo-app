export const getFirstLetters = (str: string | undefined) => str?.match(/\b(\w)/g);

export const getStringAfterCharacter = (str: string | null | Storage, char: string) => str?.substring(str.indexOf(char) + 1);

export const isStringContainsOnlyWhitespace = (str: string | undefined): boolean => str?.trim().length === 0;
