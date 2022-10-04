import { test, chromium, expect } from '@playwright/test';
import { goToList, shouldRemoveList, shouleLoginToApp } from './global';

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:8080/login');
	await shouleLoginToApp({ page });
});

test.describe('list sharing', () => {
	test('should add list again and check if exist', async ({ page }) => {
		await page.locator('input[placeholder="Nowa lista"]').fill('Lista 1');
		await page.locator('input[placeholder="Nowa lista"]').press('Enter');
		await expect(page.locator('#list-items')).toHaveText('Lista 1');
		await expect(page.locator('#list-items > a')).toHaveCount(1);
	});

	test('should share list and join to list as guest', async ({ page }) => {
		await goToList({ page });

		// copy link to share
		await page.locator('#share-list-icon').click();
		await expect(page.locator('.modal')).toBeVisible();
		await expect(page.locator('h2')).toHaveText('Udostępnij listę');
		await page.locator('button:has-text("Utwórz link zaproszenia")').press('Enter');

		await expect(page.locator('input[name="shareLink"]')).toBeVisible();
		const shareLinkUrl = await page.locator('input[name="shareLink"]').inputValue();
		await page.locator('button:has-text("Kopiuj link")').press('Enter');

		const browser = await chromium.launch({
			headless: false,
		});
		const context = await browser.newContext();
		const newPage = await context.newPage();

		// log in as guest
		await newPage.goto(shareLinkUrl);
		await newPage.locator('input[name="email"]').fill('user-todo4@yopmail.com');
		await newPage.locator('input[name="password"]').fill('Test1234');
		await newPage.locator('button:has-text("Zaloguj")').click();

		// join to list
		await expect(newPage.locator('h1:has-text("Dołącz do listy")')).toBeVisible();
		await expect(newPage.locator('button:has-text("Dołącz do listy")')).toBeVisible();
		await newPage.locator('button:has-text("Dołącz do listy")').press('Enter');

		await expect(newPage.locator('a:has-text("To Do")')).toBeVisible();
		await expect(newPage.locator('#list-items > a.list-link > div > div > div.list-title:has-text("Lista 1")')).toContainText(['Lista 1']);

		await newPage.locator('button:has-text("Wyloguj")').click();
		await newPage.close();
	});

	test('should remove lists', async ({ page }) => {
		await shouldRemoveList({ page });
	});
});
