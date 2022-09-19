import { test, expect, chromium } from '@playwright/test';
import { shouleLoginToApp, userEmail, userName } from './global';

let browser;

(async () => {
	browser = await chromium.launch();
})();

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:8080/login');
});

test.afterEach(async ({ page }) => {
	await page.close();
});

test.describe('Register user', () => {
	test('should fill inputs and reqister', async ({ page }) => {
		await page.locator('a[href="/register"]:has-text("Rejestruj się")').click();
		await page.goto('http://localhost:8080/register');
		await expect(page.url()).toBe('http://localhost:8080/register');
		await page.locator('input[name="username"]').fill(userName);
		await page.locator('input[name="email"]').fill(userEmail);
		await page.locator('input[name="password"]').fill('Test1234');
		await page.locator('button:has-text("Utwórz konto")').click();
		await expect(page.locator('a:has-text("To Do")')).toBeVisible();
		await page.locator('button:has-text("Logout")').click();
	});
});

test.describe('Login user', () => {
	test('should use data for already registered user', async ({ page }) => {
		await shouleLoginToApp({ page });
		await page.locator('button:has-text("Logout")').click();
	});
});
