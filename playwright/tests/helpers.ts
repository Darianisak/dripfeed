import { Page, expect } from "playwright/test";


export async function loadExtension(page: Page) {
    // Button for loading a temporary extension within this FireFox session.
    //
    // const loadExtension = page.locator('button .qa-temporary-extension-install-button');
    const loadExtension = page.getByRole('button', { name: 'Load Temporary Add-on...' });
    await page.goto('about:debugging#/runtime/this-firefox');

    await expect(loadExtension).toHaveCount(1);
    await loadExtension.click();
}