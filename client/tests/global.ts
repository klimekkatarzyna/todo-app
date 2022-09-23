import { expect } from '@playwright/test';

const userTs = Date.now();
export const userName = `todo-test-${userTs}`;
export const userEmail = `user-todo-${userTs}@yopmail.com`;
const createdListLocator = '#list-items div:has-text("Lista 1") >> nth=1';

export const shouleLoginToApp = async ({ page }) => {
	await page.locator('input[name="email"]').fill('user-todo1@yopmail.com');
	await page.locator('input[name="password"]').fill('Test1234');
	await page.locator('button:has-text("Zaloguj")').click();
	await expect(page.locator('a:has-text("To Do")')).toBeVisible();
};

export const goToList = async ({ page }) => {
	await page.locator(createdListLocator).click();
};

export const shouldRemoveList = async ({ page }) => {
	await page.locator('#list-items div:has-text("Lista 1") >> nth=1').click();
	await page.locator('button:has-text(". . .")').click();
	await page.locator('.list-settings-remove').press('Enter');
	await page.close();
};
