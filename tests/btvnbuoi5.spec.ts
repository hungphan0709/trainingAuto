import { test, expect } from "@playwright/test";

// bài 1
test("bai1", async ({ page }) => {
  // truy cập vào page
  await page.goto("https://the-internet.herokuapp.com/login");

  // nhập thông tin đăng nhập
  await page.getByRole("textbox", { name: "Username" }).click();
  await page.getByRole("textbox", { name: "Username" }).fill("tomsmith");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page
    .getByRole("textbox", { name: "Password" })
    .fill("SuperSecretPassword!");

  // click login
  await page.getByRole("button", { name: " Login" }).click();

  // kết quả mong muốn: trong thông báo 'flash-messages' có chứa text 'You logged into a secure area'
  await expect(page.locator("#flash-messages")).toContainText(
    "You logged into a secure area",
  );
});

// bài 2
test("testbai2", async ({ page }) => {
  await page.goto("https://www.bing.com/");
  await page
    .getByRole("combobox", { name: "Enter your search here -" })
    .click();
  await page
    .getByRole("combobox", { name: "Enter your search here -" })
    .fill("Playwright automation");
  await page
    .getByRole("combobox", { name: "Enter your search here -" })
    .press("Enter");

  await expect(page.getByRole("link", {})).toBeVisible();
});

// bài 3
import { datatest } from "./login-data";
for (const datadangnhap of datatest) {
  // Đặt tên test động theo username để 3 test-case không bị trùng tên
  test("bài 3 - " + datadangnhap.username, async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");

    await page
      .getByRole("textbox", { name: "Username" })
      .fill(datadangnhap.username);
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(datadangnhap.password);
    await page.getByRole("button", { name: "Login" }).click();

    // Lấy text từ phần tử #flash
    const flashText = (await page.locator("#flash").textContent()) || "";

    // Kiểm tra xem chứa đoạn text thành công hay không
    const isSuccess = flashText.includes("You logged into a secure area");
    const actualResult = isSuccess ? "Pass nhé" : "fail nhé";

    // So sánh kết quả
    expect(actualResult).toBe(datadangnhap.expectedResult);
  });
}
