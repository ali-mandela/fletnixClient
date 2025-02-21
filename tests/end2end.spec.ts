import { test, expect } from '@playwright/test';

test('should go through the complete flow of the application', async ({ page }) => {
  // Navigate to the sign-in page
  await page.goto('/signin');

  // Verify that the welcome message is displayed
  await expect(page.locator('h1')).toContainText('FletNix');

  // Fill in the email field
  await page.fill('input[id="email"]', 'testuser@mail.com');

  // Fill in the password field
  await page.fill('input[id="password"]', '123456');

  // Click the submit button and wait for navigation
  await Promise.all([
    // page.waitForNavigation(),
    page.click('button[type="submit"]')
  ]);

  // Verify successful login by checking if the user is redirected to the movies page
  await expect(page).toHaveURL('/movies');

  // Fill in the search field
  await page.fill('input[id="searchQuery"]', 'jhonson');

  // Click on the search button (by targeting its icon inside the button)
  await page.click('button:has(i.fa-solid.fa-magnifying-glass)');

  // Wait for search results to load (adjust timeout if needed)
  await page.waitForTimeout(2000);

  // Click on the first "More" button to view movie details
  await page.click('button:has-text("More")');

  // Wait for the movie detail page to load
  await page.waitForTimeout(2000);

  // Click on the Logout button
  await page.click('[data-testid="logout-button"]');


  // Verify that the user is redirected to the sign-in page
  await expect(page).toHaveURL('/signin');
});
