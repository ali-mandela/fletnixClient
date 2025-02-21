import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', 
  use: {
    baseURL: 'http://localhost:4200', // Adjust based on your Angular app
    headless: true, // Set to false if you want to see the browser
    // screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  // webServer: {
  //   command: 'ng serve', // Starts Angular before running tests
  //   url: 'http://localhost:4200',
  //   reuseExistingServer: !process.env.CI,
  // },
});
