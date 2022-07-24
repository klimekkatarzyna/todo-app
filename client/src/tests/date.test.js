import { getMonth, getDayName, getDay } from '../utils/date';

describe('dates tests', () => {
	const date = new Date('2022-07-11');

	describe('get day number test', () => {
		test('should return day', () => {
			expect(getDay(date)).toBe(11);
			expect(getDay(date)).not.toBe('11');
			expect(getDay(date)).not.toBe(' ');
		});
	});

	describe('get day test', () => {
		test('should return day name', () => {
			expect(getDayName(date)).toBe('Monday');
			expect(getDayName(date)).not.toBe('Sunday');
			expect(getDayName(date)).not.toBe(' ');
		});
	});

	describe('get month test', () => {
		test('should return month name', () => {
			expect(getMonth(date)).toBe('July');
			expect(getMonth(date)).not.toBe('June');
			expect(getMonth(date)).not.toBe(' ');
		});
	});
});
