---
marp: true
theme: uncover
class:
  - lead
  - invert
paginate: true
size: 16:9
style: |
  section {
    font-family: 'Segoe UI', 'Arial', sans-serif;
    font-size: 24px;
  }
  h1 { font-size: 1.2em; }
  h2 { font-size: 1em; }
  h3 { font-size: 0.9em; }
  table { font-size: 0.7em; margin: 0 auto; }
  code { font-size: 0.58em; }
  pre { font-size: 0.58em; }
  .small { font-size: 0.65em; }
  .xsmall { font-size: 0.55em; }
  pre code { font-size: 1em; }
---

<!-- _class: lead -->
<!-- _paginate: skip -->

# 🎓 Đào Tạo Automation Testing

## **Buổi 5**
# Viết Test Case Automation Đầu Tiên
## Từ Manual Test → Automation Test

![h:80](https://img.shields.io/badge/Playwright-45ba4b?style=flat&logo=playwright&logoColor=white)
![h:80](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)

<p class="small">🕐 2.5 giờ &nbsp;|&nbsp; 📅 2026 &nbsp;|&nbsp; 👤 ONEPAY JSC</p>

---

<!-- _class: default -->
# 📋 Agenda Buổi 5

| ⏱ | Phần | Nội dung |
|---|------|----------|
| 15' | **Phần 1** | Tổng quan: Từ Manual → Automation |
| 30' | **Phần 2** | Cấu trúc 1 test case hoàn chỉnh |
| 45' | **Phần 3** | Thực hành: Viết test đầu tiên |
| 30' | **Phần 4** | Debug & xử lý lỗi thường gặp |
| 30' | **Phần 5** | Bài tập tổng hợp |
| – | **🏠 Về nhà** | Viết 3 test case hoàn chỉnh |

### 🎯 Mục tiêu
- ✅ Hiểu quy trình chuyển đổi Manual Test → Automation Test
- ✅ Viết được 1 test case automation hoàn chỉnh (Arrange-Act-Assert)
- ✅ Biết cách debug khi test fail
- ✅ Tự viết được test case cho chức năng cơ bản trên iPortal

---

# 🔄 Phần 1: Từ Manual Test → Automation Test

<div style="text-align: left;">

### 🤔 Manual Test vs Automation Test

| Manual Test | Automation Test |
|-------------|-----------------|
| 👩‍💻 Người thực hiện từng bước | 🤖 Code tự động thực hiện |
| 📝 Test case viết bằng tiếng Việt | 💻 Test case viết bằng code |
| 🔁 Lặp lại thủ công | 🔄 Chạy lại 1 click |
| 👀 Người kiểm tra kết quả | ✅ Code tự kiểm tra (assert) |
| 📸 Chụp ảnh manual | 📸 Tự động chụp khi fail |

### 🧠 Tư duy cốt lõi:

> **Automation Test = Manual Test + Code + Data**

```
Manual: "Mở trang → Đăng nhập → Tìm kiếm → Kiểm tra kết quả"
   ↓
Auto:  await page.goto() → await login() → await fill() → await expect()
```

</div>

---

# 🔄 Quy trình chuyển đổi Manual → Auto

<div style="text-align: left; font-size: 0.8em;">

### 📋 Bước 1: Viết Manual Test Case (tiếng Việt)

```
TC01: Tìm kiếm đơn vị theo tên
1. Mở trang iPortal
2. Đăng nhập với tài khoản test
3. Vào menu "Merchant Management"
4. Nhập từ khóa "TEST ONEPAY" vào ô tìm kiếm
5. Click nút "Tìm kiếm"
6. Kiểm tra: Kết quả hiển thị chứa "TEST ONEPAY"
```

### 📋 Bước 2: Chuyển sang code (TypeScript)

```typescript
test('TC01: Tìm kiếm đơn vị theo tên', async ({ page }) => {
  // Arrange: Chuẩn bị
  await page.goto('https://dev42-iportal.opdev.vn/iportal/');
  await login('iportal');
  await navigateTo('Merchant Management');

  // Act: Thực hiện
  await page.fill('[placeholder="Nhập từ khóa"]', 'TEST ONEPAY');
  await page.click('button:has-text("Tìm kiếm")');

  // Assert: Kiểm tra
  await expect(page.locator('.merchant-name')).toContainText('TEST ONEPAY');
});
```

</div>

---

# 🧱 Phần 2: Cấu trúc 1 test case hoàn chỉnh

<div style="text-align: left; font-size: 0.85em;">

### 📋 Template chuẩn

```typescript
import { test, expect } from '@playwright/test';

test('Tên test case – Mô tả ngắn gọn', async ({ page }) => {
  // ~~~~~~~~~~~~~~~~~~~~~~~~ ARRANGE ~~~~~~~~~~~~~~~~~~~~~~~~
  // 1. Mở trang web
  await page.goto('https://example.com');

  // 2. Đăng nhập (nếu cần)
  await login('username', 'password');

  // 3. Điều hướng đến trang chức năng
  await page.click('menu-item');

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~ ACT ~~~~~~~~~~~~~~~~~~~~~~~~~~
  // 4. Thực hiện hành động cần test
  await page.fill('input', 'data');
  await page.click('button');

  // ~~~~~~~~~~~~~~~~~~~~~~~~ ASSERT ~~~~~~~~~~~~~~~~~~~~~~~~~
  // 5. Kiểm tra kết quả
  await expect(page.locator('.result')).toContainText('expected');
});
```

</div>

---

# 🧱 Phân tích chi tiết từng phần

<div style="text-align: left; font-size: 0.75em;">

### 📦 ARRANGE – Chuẩn bị môi trường

| Bước | Code | Mục đích |
|------|------|----------|
| Mở trang | `await page.goto(url)` | Mở browser, navigate đến URL |
| Đăng nhập | `await login('user', 'pass')` | Đăng nhập (dùng fixture) |
| Điều hướng | `await page.click('menu')` | Vào đúng trang chức năng |

### 🎬 ACT – Thực hiện hành động

| Hành động | Code | Ví dụ |
|-----------|------|-------|
| Nhập text | `await page.fill(selector, value)` | `await page.fill('input', 'TEST')` |
| Click | `await page.click(selector)` | `await page.click('button')` |
| Chọn dropdown | `await page.selectOption(selector, value)` | `await page.selectOption('select', '1')` |
| Nhấn phím | `await page.keyboard.press(key)` | `await page.keyboard.press('Enter')` |

### ✅ ASSERT – Kiểm tra kết quả

| Kiểm tra | Code | Ví dụ |
|----------|------|-------|
| Element hiển thị | `await expect(locator).toBeVisible()` | `await expect(page.locator('.msg')).toBeVisible()` |
| Text chứa | `await expect(locator).toContainText(text)` | `await expect(page.locator('.name')).toContainText('TEST')` |
| Số lượng | `await expect(locator).toHaveCount(n)` | `await expect(page.locator('.item')).toHaveCount(3)` |
| Giá trị | `await expect(locator).toHaveValue(value)` | `await expect(page.locator('input')).toHaveValue('abc')` |

</div>

---

# 🏋️ Phần 3: Thực hành – Viết test đầu tiên

<div style="text-align: left;">

### 🎯 Mục tiêu: Viết test tìm kiếm trên Google

### 📋 Bước 1: Tạo file test

```bash
# Terminal: Tạo file test mới
touch tests/my-first-test.spec.ts
```

### 📋 Bước 2: Viết code test

```typescript
import { test, expect } from '@playwright/test';

test('Tìm kiếm Playwright trên Google', async ({ page }) => {
  // ARRANGE: Mở trang Google
  await page.goto('https://www.google.com');

  // ACT: Nhập từ khóa và tìm kiếm
  await page.fill('textarea[name="q"]', 'Playwright automation');
  await page.keyboard.press('Enter');

  // ASSERT: Kiểm tra kết quả xuất hiện
  await expect(page.locator('#search')).toBeVisible();
});
```

### 📋 Bước 3: Chạy test

```bash
npx playwright test tests/my-first-test.spec.ts
```

</div>

---

# 🏋️ Thực hành: Test TodoMVC (phổ biến)

<div style="text-align: left; font-size: 0.8em;">

### 🎯 Mục tiêu: Test ứng dụng quản lý công việc

### 📋 File: `tests/todomvc-test.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('TodoMVC – Quản lý công việc', () => {

  test('Thêm công việc mới', async ({ page }) => {
    // ARRANGE
    await page.goto('https://demo.playwright.dev/todomvc');

    // ACT: Thêm 1 todo
    await page.fill('input.new-todo', 'Học Playwright');
    await page.keyboard.press('Enter');

    // ASSERT: Kiểm tra todo đã xuất hiện
    await expect(page.locator('.todo-list li')).toHaveCount(1);
    await expect(page.locator('.todo-list li label'))
      .toContainText('Học Playwright');
  });

  test('Đánh dấu hoàn thành', async ({ page }) => {
    // ARRANGE
    await page.goto('https://demo.playwright.dev/todomvc');
    await page.fill('input.new-todo', 'Task cần hoàn thành');
    await page.keyboard.press('Enter');

    // ACT: Click checkbox để đánh dấu hoàn thành
    await page.click('.todo-list li .toggle');

    // ASSERT: Kiểm tra task có class "completed"
    await expect(page.locator('.todo-list li')).toHaveClass(/completed/);
  });

});
```

</div>

---

# 🏋️ Thực hành: Test iPortal (mô phỏng)

<div style="text-align: left; font-size: 0.75em;">

### 🎯 Mục tiêu: Test tìm kiếm đơn vị trên iPortal

### 📋 File: `tests/merchant-search.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('Tìm kiếm đơn vị – iPortal', () => {

  test.beforeEach(async ({ page }) => {
    // ARRANGE: Đăng nhập trước mỗi test
    await page.goto('https://dev42-iportal.opdev.vn/iportal/');
    // await login('iportal');  // Nếu có fixture login
    // await navigateTo('Merchant Management');
  });

  test('Tìm kiếm theo tên chính xác', async ({ page }) => {
    // ACT: Nhập từ khóa và tìm kiếm
    await page.fill('[placeholder="Nhập từ khóa"]', 'TEST ONEPAY');
    await page.click('button:has-text("Tìm kiếm")');

    // ASSERT: Kiểm tra kết quả
    await expect(page.locator('.merchant-name'))
      .toContainText('TEST ONEPAY');
  });

  test('Tìm kiếm không có kết quả', async ({ page }) => {
    // ACT: Nhập từ khóa không tồn tại
    await page.fill('[placeholder="Nhập từ khóa"]', 'KHONG_TON_TAI_999');
    await page.click('button:has-text("Tìm kiếm")');

    // ASSERT: Kiểm tra hiển thị "Không có dữ liệu"
    await expect(page.locator('.no-data')).toBeVisible();
  });

});
```

</div>

---

# 🐞 Phần 4: Debug & xử lý lỗi thường gặp

<div style="text-align: left; font-size: 0.8em;">

### 🔴 Lỗi 1: Element không tìm thấy

```typescript
// ❌ Lỗi: Timeout waiting for locator
await expect(page.locator('.wrong-selector')).toBeVisible();

// ✅ Sửa: Kiểm tra selector đúng chưa
// - Mở DevTools (F12) → Inspect element
// - Copy selector đúng
await expect(page.locator('.correct-selector')).toBeVisible();
```

### 🔴 Lỗi 2: Text không khớp

```typescript
// ❌ Lỗi: Expected "abc", received "xyz"
await expect(page.locator('.msg')).toContainText('abc');

// ✅ Sửa: Kiểm tra text thực tế
// - Chạy test với --headed để xem browser
// - In ra console để debug
const actualText = await page.locator('.msg').textContent();
console.log('Actual text:', actualText);
```

### 🔴 Lỗi 3: Quên `await`

```typescript
// ❌ Lỗi: Chạy không đồng bộ, test fail
page.fill('input', 'data');  // Thiếu await!
page.click('button');

// ✅ Sửa: Thêm await trước mọi action
await page.fill('input', 'data');
await page.click('button');
```

</div>

---

# 🐞 Debug với Trace Viewer

<div style="text-align: left; font-size: 0.8em;">

### 📋 Bước 1: Chạy test với trace

```bash
# Chạy test (tự động lưu trace khi fail)
npx playwright test tests/my-test.spec.ts
```

### 📋 Bước 2: Mở Trace Viewer

```bash
# Mở trace từ file zip
npx playwright show-trace test-results/.../trace.zip

# Hoặc mở từ HTML Report
npx playwright show-report
# → Click vào test failed → Tab "Trace"
```

### 📋 Trace cho bạn biết:

- ✅ Từng step test đã chạy
- ✅ Screenshot trước/sau mỗi step
- ✅ Network request gửi đi
- ✅ Console log của browser
- ✅ Giá trị thực tế vs mong đợi

</div>

---

# 🏠 Bài tập về nhà

<div style="text-align: left; font-size: 0.8em;">

### 📝 Bài tập 1: Viết test đăng nhập (15')

Viết test case đăng nhập vào trang `https://the-internet.herokuapp.com/login`:

| Bước | Hành động |
|------|-----------|
| ARRANGE | Mở trang đăng nhập |
| ACT | Nhập username `tomsmith`, password `SuperSecretPassword!`, click Login |
| ASSERT | Kiểm tra thông báo "You logged into a secure area!" xuất hiện |

---

### 📝 Bài tập 2: Viết test tìm kiếm Google (15')

Viết test case tìm kiếm trên Google:

| Bước | Hành động |
|------|-----------|
| ARRANGE | Mở trang `https://www.google.com` |
| ACT | Nhập từ khóa "Playwright automation" vào ô tìm kiếm, nhấn Enter |
| ASSERT | Kiểm tra kết quả tìm kiếm xuất hiện (có ít nhất 1 kết quả) |

---

### 📝 Bài tập 3: Data-driven test đăng nhập (20')

Tạo 2 file:

**File 1: `data/login-data.ts`**
- Định nghĩa type `LoginCase` gồm: `username`, `password`, `expectedResult`
- Tạo mảng chứa 3 bộ data: 1 đăng nhập đúng, 1 sai password, 1 trống

**File 2: `tests/login-driven.spec.ts`**
- Import data từ file trên
- Dùng vòng lặp `for...of` tạo test case tự động
- Mỗi test: đăng nhập và kiểm tra kết quả thành công/thất bại

</div>

</div>


<br>

<div class="small">

### 📁 Cách nộp bài:
- Tạo folder `Result/buoi-05/` trong project
- Push code lên nhánh GitHub cá nhân
- Chạy tất cả test và đảm bảo pass

</div>

---

# 📋 Checklist – Sau buổi 5, bạn có thể:

<div style="text-align: left;">

- [ ] Chuyển đổi Manual Test → Automation Test
- [ ] Viết test case hoàn chỉnh với cấu trúc Arrange-Act-Assert
- [ ] Dùng `page.goto()`, `page.fill()`, `page.click()` để thao tác
- [ ] Dùng `expect()` để kiểm tra kết quả
- [ ] Debug test fail với Trace Viewer
- [ ] Viết Data-driven test với vòng lặp
- [ ] Tự viết test case cho chức năng cơ bản

</div>

---

<!-- _class: lead -->
<!-- _paginate: skip -->

# 🎉 Hết Buổi 5

### Cảm ơn! 🙏

### Câu hỏi? 🤔

<p class="small">
📅 Buổi 6: Xử lý Bất đồng bộ (Async/Await)
</p>
