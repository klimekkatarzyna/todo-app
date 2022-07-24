import { isStringContainsOnlyWhitespace, getFirstLetters } from '../utils/utilsFunctions';
import { buildUrl } from '../utils/paths';
import { ROUTE } from '../enums';

describe('utils tests', () => {
	test('should detect whitespace in string', () => {
		expect(isStringContainsOnlyWhitespace('  ')).toBeTruthy();
		expect(isStringContainsOnlyWhitespace('asdf')).not.toBeTruthy();
	});

	test('should return first letters of strings', () => {
		const surname = 'Jan Michał Kowalski';

		expect(getFirstLetters(surname)).toStrictEqual(['J', 'M', 'K']);
		expect(getFirstLetters(surname)).not.toBe(['J M K']);
		expect(getFirstLetters(surname)).not.toBe('J');
		expect(getFirstLetters(surname)).not.toBe('K');
		expect(getFirstLetters(surname)).not.toBe(' ');
	});

	test('should build correct path', () => {
		expect(buildUrl(ROUTE.listsDetails, { listId: '1234' })).toBe('/lists-details/1234');
		expect(buildUrl(ROUTE.listsDetails, { listId: '1234' })).not.toBe('/lists-details/:1234');
		expect(buildUrl(ROUTE.listsDetails, { listId: '1234' })).not.toBe('/lists-details/:undefined');
		expect(buildUrl(ROUTE.listsDetails, { listId: '1234' })).not.toBe('/lists-details/');
	});
});
