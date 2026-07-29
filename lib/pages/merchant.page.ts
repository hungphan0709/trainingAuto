/**
 * ============================================================
 * MerchantPage – Page Object cho trang Quản lý Đơn vị
 * ============================================================
 * Demo kết hợp CSS + XPath trong cùng 1 Page Object.
 *
 * Cách dùng:
 *   const merchant = new MerchantPage(page);
 *   await merchant.search('TEST ONEPAY');
 *   await merchant.verifyResultContains('TEST ONEPAY');
 */

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class MerchantPage extends BasePage {

  // ─── Locator dùng CSS ───
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly addButton: Locator;
  readonly advancedSearchLink: Locator;
  readonly emptyState: Locator;

  // ─── Locator dùng XPath (khi CSS không đủ) ───
  readonly tableRows: Locator;
  readonly tableHeaders: Locator;
  readonly firstEditButton: Locator;
  readonly firstDeleteButton: Locator;
  readonly tabInfo: Locator;

  constructor(page: Page) {
    super(page);

    // ========== CSS Locator ==========
    this.searchInput        = page.locator('input[placeholder*="Tìm"], input[name*="search"], input[name*="merchant"]');
    this.searchButton       = page.locator('button:has-text("Tìm kiếm")');
    this.addButton          = page.locator('button:has-text("Thêm Đơn Vị")');
    this.advancedSearchLink = page.locator('text=Tìm Kiếm Nâng Cao');
    this.emptyState         = page.locator('.ant-empty, .no-data, [class*="empty"]');

    // ========== XPath Locator ==========
    // Lấy tất cả dòng trong bảng
    this.tableRows       = page.locator('//table[contains(@class, "ant-table")]//tbody/tr[not(contains(@class, "ant-table-measure-row"))]');

    // Lấy tất cả tiêu đề cột
    this.tableHeaders    = page.locator('//table//thead//th');

    // Nút "Sửa" đầu tiên trong bảng
    this.firstEditButton  = page.locator('(//button[contains(text(), "Sửa")])[1]');

    // Nút "Xóa" đầu tiên trong bảng
    this.firstDeleteButton = page.locator('(//button[contains(text(), "Xóa")])[1]');

    // Tab "Thông Tin Đơn Vị"
    this.tabInfo          = page.locator('//*[@role="tab" and contains(., "Thông Tin")]');
  }

  // ===================================================================
  //  ACTION METHODS (Hành động trên trang)
  // ===================================================================

  /** Nhập từ khóa và click Tìm kiếm */
  async search(keyword: string) {
    await this.waitForPageLoad();
    await this.searchInput.clear();
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
    await this.waitForPageLoad();
  }

  /** Click nút Thêm Đơn Vị */
  async clickAdd() {
    await this.addButton.click();
    await this.waitForPageLoad();
  }

  /** Click nút Sửa của dòng đầu tiên */
  async clickFirstEdit() {
    await this.firstEditButton.click();
    await this.waitForPageLoad();
  }

  /** Click vào 1 dòng cụ thể theo tên đơn vị */
  async clickRowByName(name: string) {
    const row = this.page.locator(`//tr[contains(., '${name}')]`);
    await row.click();
  }

  /** Click nút Xóa của 1 đơn vị theo tên */
  async clickDeleteByName(name: string) {
    const deleteBtn = this.page.locator(
      `//tr[contains(., '${name}')]//button[contains(text(), 'Xóa')]`
    );
    await deleteBtn.click();
  }

  // ===================================================================
  //  VERIFY METHODS (Kiểm tra kết quả)
  // ===================================================================

  /** Kiểm tra bảng kết quả có chứa text */
  async verifyResultContains(text: string) {
    await expect(this.tableRows.first()).toContainText(text, { timeout: 5000 });
  }

  /** Kiểm tra số lượng dòng trong bảng */
  async verifyRowCount(expected: number) {
    await expect(this.tableRows).toHaveCount(expected, { timeout: 5000 });
  }

  /** Kiểm tra có ít nhất 1 dòng dữ liệu */
  async verifyHasData() {
    const count = await this.tableRows.count();
    expect(count).toBeGreaterThan(0);
  }

  /** Kiểm tra hiển thị trạng thái "không có dữ liệu" */
  async verifyEmptyState() {
    await expect(this.emptyState).toBeVisible({ timeout: 5000 });
  }

  /** Lấy danh sách tên đơn vị từ cột đầu tiên */
  async getMerchantNames(): Promise<string[]> {
    const nameCells = this.page.locator('//table//tbody/tr/td[1]');
    const count = await nameCells.count();
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await nameCells.nth(i).textContent();
      if (text) names.push(text.trim());
    }
    return names;
  }

  /** Lấy tổng số dòng dữ liệu */
  async getRowCount(): Promise<number> {
    return await this.tableRows.count();
  }

  /** Kiểm tra tab Thông Tin Đơn Vị đang active */
  async verifyTabInfoActive() {
    await expect(this.tabInfo).toHaveClass(/active/, { timeout: 3000 });
  }
}
