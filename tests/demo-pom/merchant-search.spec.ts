/**
 * ============================================================
 * Demo: Test case dùng POM (Page Object Model)
 * ============================================================
 * So sánh với cách viết "thô" không POM ở tests/demo-*.spec.ts
 *
 * Cách chạy:
 *   npx playwright test tests/demo-pom/merchant-search.spec.ts
 *   npx playwright test tests/demo-pom/merchant-search.spec.ts --headed
 */

import { test, expect } from '@playwright/test';
import { MerchantPage } from '../../lib/pages/merchant.page';
import { LoginPage } from '../../lib/pages/login.page';
import { searchTestCases } from '../../data/merchant.data';

test.describe('Demo POM: Merchant Management – Tìm kiếm', () => {

  let merchant: MerchantPage;

  test.beforeEach(async ({ page }) => {
    // ─── ARRANGE ───
    // Demo: Khởi tạo Page Object
    const login = new LoginPage(page);
    merchant = new MerchantPage(page);

    // Mở trang và đăng nhập (demo – chưa chạy thật)
    // await login.goto();
    // await login.login('username', 'password');
    // await login.verifyLoginSuccess();

    // Thay vào đó dùng trang demo:
    await page.goto('https://demo.playwright.dev/todomvc');
  });

  // ================================================================
  //  TC01: Test cơ bản – gọi method POM thay vì selector thô
  // ================================================================
  test('TC01: Demo gọi POM thay vì selector thô', async ({ page }) => {
    // ❌ Cách cũ (không POM):
    // await page.fill('input.new-todo', 'Test');
    // await page.keyboard.press('Enter');

    // ✅ Cách mới (có POM): KHÔNG cần biết selector!
    // await merchant.search('TEST ONEPAY');
    // await merchant.verifyResultContains('TEST ONEPAY');

    // Demo với TodoMVC:
    const input = page.locator('input.new-todo');
    await input.fill('Học POM');
    await input.press('Enter');
    await expect(page.locator('.todo-list li')).toContainText('Học POM');
  });

  // ================================================================
  //  TC02: Data-driven test – 1 test chạy nhiều bộ data
  // ================================================================
  for (const { testName, keyword, expectedMinRows, shouldContain } of searchTestCases) {
    test(`TC02-DD: ${testName} – từ khóa "${keyword}"`, async ({ page }) => {
      // Demo với TodoMVC thay vì Merchant:
      const input = page.locator('input.new-todo');
      await input.fill(keyword);
      await input.press('Enter');

      const items = page.locator('.todo-list li');
      const count = await items.count();

      // Kiểm tra số lượng
      expect(count).toBeGreaterThanOrEqual(expectedMinRows);

      // Kiểm tra nội dung nếu có
      if (shouldContain) {
        await expect(items.first()).toContainText(shouldContain);
      }
    });
  }

  // ================================================================
  //  TC03: Demo XPath trong POM
  // ================================================================
  test('TC03: Demo XPath – tìm element theo text và vị trí', async ({ page }) => {
    // Demo XPath thực tế:
    //   1. Tìm button đầu tiên: (//button)[1]
    //   2. Tìm theo text: //label[contains(text(),'Học')]
    //   3. Tìm con của 1 element: //li[1]//button

    // Trong code thật sẽ là:
    // await merchant.clickFirstEdit();    ← Gọi XPath qua POM
    // await merchant.clickRowByName('TEST ONEPAY');

    await page.goto('https://demo.playwright.dev/todomvc');
    const input = page.locator('input.new-todo');

    // Thêm 3 tasks
    for (const task of ['Task A', 'Task B', 'Task C']) {
      await input.fill(task);
      await input.press('Enter');
    }

    // Dùng XPath để tìm task thứ 2
    const secondTask = page.locator('(//ul[@class="todo-list"]/li)[2]');
    await expect(secondTask).toContainText('Task B');

    // Dùng XPath để click nút xóa của task đầu tiên
    const firstDeleteBtn = page.locator('(//ul[@class="todo-list"]/li)[1]//button[@class="destroy"]');
    await page.locator('(//ul[@class="todo-list"]/li)[1]').hover();
    await firstDeleteBtn.click();

    // Kiểm tra còn 2 tasks
    await expect(page.locator('.todo-list li')).toHaveCount(2);
  });

  // ================================================================
  //  TC04: Demo BasePage – dùng method kế thừa
  // ================================================================
  test('TC04: Demo kế thừa BasePage', async ({ page }) => {
    // MerchantPage extends BasePage nên có sẵn:
    //   await merchant.waitForPageLoad();
    //   await merchant.getPageTitle();
    //   await merchant.takeScreenshot('merchant-search');

    const title = await page.title();
    console.log('Page title:', title);
    expect(title).toBeTruthy();

    // Trong code thật:
    // await merchant.waitForPageLoad();
    // const title = await merchant.getPageTitle();
    // console.log('Merchant page title:', title);
  });
});
