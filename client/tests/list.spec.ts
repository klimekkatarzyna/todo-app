import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:8080/login');
	await page.locator('input[name="email"]').fill('user-todo-1661435506792@yopmail.com');
	await page.locator('input[name="password"]').fill('Test1234');
	await page.locator('button:has-text("Zaloguj")').click();
	await expect(page.locator('a:has-text("To Do")')).toBeVisible();
});

test.afterEach(async ({ page }) => {
	await page.close();
});

test.describe('list actions', () => {
	test('should create list', async ({ page }) => {
		await page.locator('input[placeholder="Nowa lista"]').fill('Lista 1');
		await page.locator('input[placeholder="Nowa lista"]').press('Enter');

		await page.locator('input[placeholder="Nowa lista"]').fill('Lista 2');
		await page.locator('input[placeholder="Nowa lista"]').press('Enter');

		await expect(page.locator('#list-items')).toHaveText('Lista 1Lista 2');
		await expect(page.locator('#list-items > a')).toHaveCount(2);
	});

	test('should edit list title', async ({ page }) => {
		await expect(page.locator('#list-items')).toHaveText('Lista 1Lista 2');
		await expect(page.locator('#list-items > a')).toHaveCount(2);
		await page.locator('#list-items div:has-text("Lista 1") >> nth=1').click();
		await page.locator('button:has-text(". . .")').click();
		await page.locator('.list-settings-edit').press('Enter');

		await page.locator('input[value="Lista 1"]').fill('Nowa nazwa');
		await page.locator('input[value="Lista 1"]').press('Enter');
	});

	test('should remove lists', async ({ page }) => {
		// remove first list
		await page.locator('#list-items div:has-text("Nowa nazwa") >> nth=1').click();
		await page.locator('button:has-text(". . .")').click();
		await page.locator('.list-settings-remove').press('Enter');

		//remove secound list
		await page.locator('#list-items div:has-text("Lista 2") >> nth=1').click();
		await page.locator('button:has-text(". . .")').click();
		await page.locator('.list-settings-remove').press('Enter');
		await expect(page.locator('#list-items > a')).toHaveCount(0);
	});
});
