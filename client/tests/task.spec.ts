import { test, expect } from '@playwright/test';
import { goToList, shouldRemoveList, shouleLoginToApp } from './global';

const taskName = 'Zadanie 1';
const taskCheckboxLocator = '.tasks-list > div > div > div > div:nth-child(2) > label > input';

const checkIfTaskExist = async ({ page }) => {
	await expect(page.locator(`.tasks-list > div`)).toHaveCount(1);
	await expect(page.locator('.tasks-list > div > div > a > div:nth-child(1)')).toHaveText(taskName);
};

const checkAndClickAccordion = async ({ page }) => {
	await expect(page.locator('button.accordion')).toBeVisible();
	await expect(page.locator('span.completed')).toHaveText('1');
	await page.locator('button.accordion').click();
};

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:8080/login');
	await shouleLoginToApp({ page });
});

test.afterAll(async ({ page }) => {
	await page.locator('#list-items div:has-text("Lista 1") >> nth=1').click();
	await page.locator('button:has-text(". . .")').click();
	await page.locator('.list-settings-remove').press('Enter');

	await page.close();
});

test.describe('task actions', () => {
	test('should add list again and check if exist', async ({ page }) => {
		// add list again and check if exist
		await page.locator('input[placeholder="Nowa lista"]').fill('Lista 1');
		await page.locator('input[placeholder="Nowa lista"]').press('Enter');
		await expect(page.locator('#list-items')).toHaveText('Lista 1');
		await expect(page.locator('#list-items > a')).toHaveCount(1);

		await goToList({ page });
	});

	test('should create task', async ({ page }) => {
		await goToList({ page });

		await page.locator('.create-task').fill(taskName);
		await page.locator('.create-task').press('Enter');

		await checkIfTaskExist({ page });
	});

	test('should mark as important', async ({ page }) => {
		await goToList({ page });

		await checkIfTaskExist({ page });

		await page.locator('.tasks-list > div > div > button').press('Enter');
		const starLocator = await page.locator('.tasks-list > div > div > button > div > div:nth-child(2) > div > svg');
		const color = await starLocator.evaluate(e => {
			return window.getComputedStyle(e).getPropertyValue('fill');
		});
		expect(color).toBe('rgb(0, 120, 215)');
	});

	test('should change task status to completed', async ({ page }) => {
		await goToList({ page });

		await checkIfTaskExist({ page });

		await page.locator(taskCheckboxLocator).click();
		await expect(page.locator('.tasks-list > div')).toBeVisible();

		await checkAndClickAccordion({ page });

		expect(await page.locator(taskCheckboxLocator).isChecked()).toBeTruthy();
	});

	test('should change task status to uncompleted', async ({ page }) => {
		await goToList({ page });

		await checkAndClickAccordion({ page });

		await page.locator(taskCheckboxLocator).click();
		expect(await page.locator(taskCheckboxLocator).isChecked()).toBeFalsy();
	});

	test('should edit task title', async ({ page }) => {
		await goToList({ page });

		await checkIfTaskExist({ page });

		await page.locator('div.task-item').click();
		await expect(page.locator('#task-details')).toBeVisible();

		await page.locator('#task-details > div > div > a > #task-title-element').click();

		await page.locator(`input[value="${taskName}"]`).fill('Zadanie 2');
		await page.locator(`input[value="${taskName}"]`).press('Enter');

		await expect(page.locator('.tasks-list > div > div > a > div:nth-child(1)')).toHaveText('Zadanie 2');
	});

	test('should remove task', async ({ page }) => {
		await goToList({ page });

		await expect(page.locator(`.tasks-list > div`)).toHaveCount(1);
		await expect(page.locator('.tasks-list > div > div > a > div:nth-child(1)')).toHaveText('Zadanie 2');
		await page.locator('div.task-item').click();
		await expect(page.locator('#task-details')).toBeVisible();

		await page.locator('button.remove-task').press('Enter');

		await expect(page.locator('.tasks-list > div')).toBeVisible();
		await expect(page.locator(`.tasks-list > div:has-text("Brak zadań")`)).toBeVisible();
	});

	test('should remove lists', async ({ page }) => {
		await shouldRemoveList({ page });
	});
});
