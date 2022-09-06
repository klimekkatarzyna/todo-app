import { test, chromium } from '@playwright/test';
import { shouleLoginToApp } from './auth.spec';

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:8080/login');
	await shouleLoginToApp({ page });
});

test.describe('list sharing', () => {
	test('open new browser', async () => {
		const browser = await chromium.launch(); // Or 'chromium' or 'webkit'.
		// Create a new incognito browser context.
		const context = await browser.newContext();
		// Create a new page in a pristine context.
		const page = await context.newPage();
		await page.goto('https://example.com');
	});
});
