import { test, expect } from '@playwright/test';

import { loadExtension } from './helpers';

test('has title', async ({ page }) => {
  await loadExtension(page)
});
