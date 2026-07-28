import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  for (let i = 0; i < 1; i++) {
    await page.goto("https://dev38-mtf.opdev.vn/client/qt/");
    await page.getByRole("textbox", { name: "MERCHANT ID" }).click();
    await page.getByRole("textbox", { name: "MERCHANT ID" }).fill("AUTO3B00");
    await page.locator('input[name="vpc_Amount"]').click();
    await page.getByRole("cell", { name: "100000" }).click();
    await page.locator('input1[name="vpc_Amount"]').click();
    await page.locator('input[name="vpc_Amount"]').click();
    await page.locator('input[name="vpc_Amount"]').press("ControlOrMeta+a");
    await page.locator('input[name="vpc_Amount"]').fill("9999900");
    await page.getByRole("button", { name: "Pay Now!" }).click();
    await page.getByText("Thẻ tín dụng / Ghi nợ").click();
    await page.getByRole("textbox", { name: "5678 9101 1234" }).click();
    await page
      .getByRole("textbox", { name: "5678 9101 1234" })
      .fill("5123 4500 0000 0008");
    await page.getByRole("textbox", { name: "/25" }).click();
    await page.getByRole("textbox", { name: "/25" }).fill("12/29");
    await page.getByRole("textbox", { name: "123", exact: true }).fill("123");
    await page.getByRole("textbox", { name: "NGUYEN VAN A" }).click();
    await page
      .getByRole("textbox", { name: "NGUYEN VAN A" })
      .fill("nguyen van a");
    await page.getByRole("checkbox", { name: "Không sử dụng email" }).check();
    await page.getByRole("textbox", { name: "345 678" }).click();
    await page.getByRole("textbox", { name: "345 678" }).fill("0988883232");
    await page
      .getByRole("checkbox", { name: "Tôi đã đọc, hiểu rõ và đồng" })
      .check();
    await page.getByRole("button", { name: "Thanh toán" }).click();
  }
});
