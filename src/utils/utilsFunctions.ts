import { useMemo } from 'react';

export const splitChar = (char: string): string[] => char?.split(' ');

export const returnsFirstChar = (char: string): string => char?.substr(0, 1);

export const removesWhitespaceFromString = (value: string) => (value === ' ' ? value?.trim() : value);

export const handleResertInput = (functionName: Function) => functionName(' ');

export const getStringAfterCharacter = (str: string | undefined) => str?.substring(str.indexOf('=') + 1);

// will scroll the browser to the top of the page
const goToTop = () => window.scrollTo(0, 0);

// will return true if user is on an Apple device
const isAppleDevice = /Mac|iPod|iPhone|iPad/.test(navigator.platform);

// will return true if in focus, false if not in focus
const elementIsInFocus = (el: unknown) => el === document.activeElement;
