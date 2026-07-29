/**
 * ============================================================
 * LoginPage – Page Object cho trang Đăng nhập
 * ============================================================
 * Demo cách dùng:
 *   const loginPage = new LoginPage(page);
 *   await loginPage.goto();
 *   await loginPage.login('username', 'password');
 */

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {

  // ─── URL ───
  readonly url = 'https://dev42-iportal.opdev.vn/iportal/';

  // ─── Locator ───
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly userMenu: Locator;

  constructor(page: Page) {
    super(page);

    // CSS selector cho element đơn giản
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton   = page.locator('input[type="submit"], button[type="submit"]');

    // XPath cho element phức tạp
    this.errorMessage  = page.locator('//div[contains(@class, "error") or contains(@class, "alert")]');
    this.userMenu      = page.locator('//*[contains(@class, "user") or contains(@class, "avatar")]');
  }

  /** Mở trang login */
  async goto() {
    await this.page.goto(this.url);
    await this.waitForPageLoad();
  }

  /** Nhập username + password và click Login */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /** Kiểm tra đăng nhập thành công (đã vào được trang chính) */
  async verifyLoginSuccess() {
    await expect(this.userMenu).toBeVisible({ timeout: 10000 });
  }

  /** Kiểm tra hiển thị thông báo lỗi */
  async verifyErrorMessage(expectedText: string) {
    await expect(this.errorMessage).toContainText(expectedText);
  }
}
