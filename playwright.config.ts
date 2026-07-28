import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 3000,                     // Timeout mỗi test: 30 giây
  retries: 0,                          // Số lần chạy lại khi fail (0 = không retry)
  use: {
    headless: false,                   // false = hiển thị browser, true = ẩn
    screenshot: 'only-on-failure',     // Chỉ chụp ảnh khi test fail
    video: 'retain-on-failure',        // Giữ video khi test fail
    trace: 'retain-on-failure',        // Giữ trace (quan trọng để debug)
  },
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],  // HTML Report
    ['list'],                                          // Console output
  ],
});
