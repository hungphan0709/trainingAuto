/**
 * ============================================================
 * BasePage – Class cha cho tất cả các Page Object
 * ============================================================
 * Chứa các method DÙNG CHUNG cho mọi trang:
 *   - waitForPageLoad(): Chờ trang load xong
 *   - getPageTitle(): Lấy tiêu đề trang
 *   - takeScreenshot(): Chụp ảnh màn hình
 *   - clickAndWait(): Click và chờ navigation
 *
 * Cách dùng:
 *   class MerchantPage extends BasePage { ... }
 *   → MerchantPage tự động có tất cả method của BasePage
 */

import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Chờ trang load hoàn toàn (không còn network request) */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /** Lấy tiêu đề của trang hiện tại */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /** Chụp ảnh màn hình, lưu vào thư mục screenshots/ */
  async takeScreenshot(name: string) {
    await this.page.screenshot({
      path: `screenshots/${name}.png`,
      fullPage: true,
    });
  }

  /** Click vào element và chờ navigation hoàn tất */
  async clickAndWait(locator: string) {
    await Promise.all([
      this.page.waitForLoadState('networkidle'),
      this.page.click(locator),
    ]);
  }

  /** Lấy text của 1 element */
  async getText(locator: string): Promise<string> {
    return (await this.page.locator(locator).textContent()) ?? '';
  }

  /** Kiểm tra element có hiển thị không */
  async isVisible(locator: string): Promise<boolean> {
    return await this.page.locator(locator).isVisible();
  }
}
