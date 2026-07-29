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

## **Buổi 6**
# POM – XPath
## Page Object Model & XPath cho Manual Tester

![h:80](https://img.shields.io/badge/Playwright-45ba4b?style=flat&logo=playwright&logoColor=white)
![h:80](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)

<p class="small">🕐 2.5 giờ &nbsp;|&nbsp; 📅 2026 &nbsp;|&nbsp; 👤 ONEPAY JSC</p>

---

<!-- _class: default -->

# 📋 Agenda Buổi 6

| ⏱ | Phần | Nội dung |
|---|------|----------|
| 20' | **Phần 1** | Tại sao cần POM? – "Nỗi đau" khi không có POM |
| 45' | **Phần 2** | POM – Page Object Model từ A-Z |
| 45' | **Phần 3** | XPath – Bắt element khi CSS "bó tay" |
| 30' | **Phần 4** | Thực hành & Tổng kết |
| – | **🏠 Về nhà** | Tự viết POM + test case cho 1 trang iPortal |

### 🎯 Mục tiêu
- ✅ Hiểu **tại sao** cần POM – tránh lặp code, dễ bảo trì
- ✅ Biết tạo **Page Class** với locator + method, kế thừa BasePage
- ✅ Dùng **XPath** để bắt element linh hoạt khi CSS không đủ
- ✅ Đọc hiểu cấu trúc POM demo và tự viết test gọi POM

---

# 🤔 Phần 1: "Nỗi đau" khi không có POM

<div style="text-align: left;">

### 📋 Hãy tưởng tượng: Bạn có 20 test case, cùng dùng 1 trang

```typescript
// test-01.spec.ts
await page.fill('input[name="merchantName"]', 'TEST ONEPAY');
await page.click('button:has-text("Tìm kiếm")');

// test-02.spec.ts
await page.fill('input[name="merchantName"]', 'ANOTHER');
await page.click('button:has-text("Tìm kiếm")');

// test-03.spec.ts → LẠI copy-paste...
// ... test-20.spec.ts → VẪN copy-paste...
```

### 💥 Rồi một ngày... Developer đổi `input[name="merchantName"]` thành `input[id="search"]`

> 🔥 **Bạn phải sửa 20 file test!** Mỗi file 1 chỗ. Dễ sót. Dễ sai.

### 😰 Còn nữa...
- Cùng 1 trang, 3 người viết 3 kiểu selector khác nhau
- Code test dài ngoằng, khó đọc, khó review
- Manual Tester mới vào: "Tôi không biết bắt element nào!"

</div>

---

# 💡 Giải pháp: Page Object Model (POM)

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1em; text-align: left;">

<div>

### ❌ Không có POM
```
tests/
├── test-01.spec.ts  ← selector nằm rải rác
├── test-02.spec.ts  ← trong từng test
├── test-03.spec.ts  ← lặp đi lặp lại
└── ...
```

```typescript
// Mỗi test tự "mò" selector
await page.fill(
  'input[name="merchantName"]',
  'TEST'
);
await page.click(
  'button:has-text("Tìm kiếm")'
);
```

</div>

<div>

### ✅ Có POM
```
lib/pages/
├── base.page.ts         ← Base class
├── login.page.ts        ← Trang Login
├── merchant.page.ts     ← Trang Merchant
└── ...

tests/
├── merchant-search.spec.ts
└── ...
```

```typescript
// Test gọi POM – không cần biết selector!
const merchantPage = new MerchantPage(page);
await merchantPage.search('TEST');
await merchantPage.verifyResult('TEST ONEPAY');
```

</div>

</div>

> 🧠 **POM = Gom tất cả selector & hành động của 1 trang vào 1 class duy nhất. Đổi giao diện → chỉ sửa 1 chỗ!**

---

# 🧱 Phần 2: Page Object Model từ A-Z

<div style="text-align: left;">

### 🎯 Nguyên lý cốt lõi của POM

```
┌──────────────────────────────────────────────┐
│                  TEST CASE                    │
│  Chỉ gọi method của Page, không đụng selector │
├──────────────────────────────────────────────┤
│                 PAGE OBJECT                   │
│  - Locator: input, button, label...           │
│  - Method:  search(), clickAdd(), verify()... │
├──────────────────────────────────────────────┤
│                 PLAYWRIGHT                    │
│  page.locator(), page.fill(), page.click()... │
└──────────────────────────────────────────────┘
```

> 🧠 **Tư duy:** Test case chỉ nói **"LÀM GÌ"** (search, click). Page Object lo **"LÀM THẾ NÀO"** (selector nào, fill ra sao).

</div>

---

# 📦 Cấu trúc 1 Page Class

<div style="text-align: left; font-size: 0.8em;">

### 📋 Template chuẩn

```typescript
// lib/pages/merchant.page.ts
import { Page, Locator, expect } from '@playwright/test';

export class MerchantPage {
  // ─── 1. Khai báo page ───
  readonly page: Page;

  // ─── 2. Khai báo LOCATOR (element trên trang) ───
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly resultTable: Locator;
  readonly addButton: Locator;

  // ─── 3. Constructor – Nhận page từ test ───
  constructor(page: Page) {
    this.page = page;
    // Gán locator – TẤT CẢ selector tập trung ở đây!
    this.searchInput   = page.locator('input[name="merchantName"]');
    this.searchButton  = page.locator('button:has-text("Tìm kiếm")');
    this.resultTable   = page.locator('.ant-table-tbody');
    this.addButton     = page.locator('button:has-text("Thêm Đơn Vị")');
  }

  // ─── 4. METHOD – Hành động trên trang ───
  async search(keyword: string) {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
  }

  async clickAdd() {
    await this.addButton.click();
  }

  async verifyResultContains(text: string) {
    await expect(this.resultTable).toContainText(text);
  }
}
```

</div>

---

# 🔌 Cách dùng Page Class trong Test

<div style="text-align: left; font-size: 0.8em;">

### 📋 Test case gọi POM

```typescript
// tests/merchant-search.spec.ts
import { test, expect } from '@playwright/test';
import { MerchantPage } from '../lib/pages/merchant.page';

test('TC01: Tìm kiếm đơn vị theo tên', async ({ page }) => {
  // ─── ARRANGE ───
  await page.goto('https://dev42-iportal.opdev.vn/iportal/');
  // Đăng nhập (dùng fixture – học sau)
  // Điều hướng vào trang Merchant

  // Khởi tạo Page Object
  const merchant = new MerchantPage(page);

  // ─── ACT ───
  await merchant.search('TEST ONEPAY');

  // ─── ASSERT ───
  await merchant.verifyResultContains('TEST ONEPAY');
});
```

### 🎉 Lợi ích rõ ràng:

| Không POM | Có POM |
|-----------|--------|
| Selector nằm trong test → sửa N file | Selector nằm trong 1 Page → sửa 1 file |
| Test dài, khó đọc | Test ngắn gọn, đọc như tiếng Việt |
| Ai cũng tự "mò" selector | Chỉ cần dùng method có sẵn |
| Manual Tester khó viết test mới | Gọi `merchant.search('abc')` là xong |

</div>

---

# 🧬 Base Page – Tránh lặp code chung

<div style="text-align: left; font-size: 0.8em;">

### 🤔 Vấn đề: Nhiều trang có hành động giống nhau

```typescript
// Trang A: await page.waitForLoadState('networkidle');
// Trang B: await page.waitForLoadState('networkidle');
// Trang C: await page.waitForLoadState('networkidle');
// → LẶP! Giải pháp: BasePage
```

### 📋 BasePage – Class cha cho tất cả các trang

```typescript
// lib/pages/base.page.ts
import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ─── Các method DÙNG CHUNG cho mọi trang ───
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }
}
```

</div>

---

# 🧬 Kế thừa BasePage

<div style="text-align: left; font-size: 0.75em;">

### 📋 Page con kế thừa BasePage

```typescript
// lib/pages/merchant.page.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

// extends = kế thừa: MerchantPage có tất cả method của BasePage
export class MerchantPage extends BasePage {

  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);  // Gọi constructor của BasePage
    this.searchInput  = page.locator('input[name="merchantName"]');
    this.searchButton = page.locator('button:has-text("Tìm kiếm")');
  }

  async search(keyword: string) {
    await this.waitForPageLoad();  // ← Dùng method từ BasePage!
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
  }
}
```

### 🌳 Cây kế thừa

```
BasePage                          ← Method chung: wait, screenshot...
├── MerchantPage                  ← search(), clickAdd(), verifyResult()
├── LoginPage                     ← login(), verifyError()
├── TransactionPage               ← filterByDate(), exportExcel()
└── ...
```

> 🧠 **Mỗi Page Class = 1 trang web. Kế thừa BasePage để dùng chung method.**

</div>

---

# 📊 Tổng kết POM – Mô hình 3 lớp

<div style="text-align: center; font-size: 0.75em;">

```
┌──────────────────────────────────────────────────────────┐
│                     🧪 TEST LAYER                        │
│   tests/*.spec.ts                                        │
│   Chỉ gọi method POM. Không đụng selector.               │
│   VD: merchant.search('TEST');                           │
├──────────────────────────────────────────────────────────┤
│                     📦 POM LAYER                         │
│   lib/pages/*.page.ts                                    │
│   Chứa locator + method. Mỗi class = 1 trang.           │
│   VD: searchInput = page.locator('input[name=...]')      │
├──────────────────────────────────────────────────────────┤
│                     🔧 FIXTURE LAYER                     │
│   lib/fixtures/*.ts                                      │
│   Login, setup, data test, config...                     │
│   VD: await login('iportal');                            │
├──────────────────────────────────────────────────────────┤
│                     🎭 PLAYWRIGHT                        │
│   page.locator(), page.fill(), page.click()...           │
└──────────────────────────────────────────────────────────┘
```

</div>

| Lớp | Ai viết? | Manual Tester cần biết gì? |
|-----|----------|---------------------------|
| **Test** | Manual + Auto | ✅ Tự viết được – gọi method POM |
| **POM** | Auto chính | ✅ Đọc hiểu để biết method nào có sẵn |
| **Fixture** | Auto chính | ✅ Biết gọi `login()`, `navigateMenu()` |

---

# 🔍 Phần 3: XPath – "Cứu tinh" khi CSS bó tay

<div style="text-align: left;">

### 🤔 Đặt vấn đề

```html
<!-- Làm sao bắt nút "Xóa" của dòng thứ 3 trong bảng? -->
<table>
  <tr>
    <td>TEST ONEPAY</td>
    <td><button>Xóa</button></td>  ← Bắt nút này?
  </tr>
  <tr>
    <td>TEST ONEPAY 2</td>
    <td><button>Xóa</button></td>
  </tr>
  <tr>
    <td>TEST ONEPAY 3</td>
    <td><button>Xóa</button></td>  ← Hay nút này?
  </tr>
</table>
```

### ❌ CSS khó / không làm được:
- Tìm element theo **text** ("nút có chữ Xóa")
- Tìm element theo **vị trí** (dòng thứ 3, cột thứ 2)
- Tìm element theo **quan hệ** (cha-con, anh-em)
- Tìm element **động** (id thay đổi mỗi lần load)

### ✅ XPath làm được tất cả những điều trên!

</div>

---

# 🔍 XPath là gì?

<div style="text-align: left;">

### XPath = ngôn ngữ "truy vấn" cây HTML

```html
<html>
  <body>
    <div class="container">
      <h1>Tiêu đề</h1>
      <button id="btn-search">Tìm kiếm</button>
    </div>
  </body>
</html>
```

```
/html/body/div/button          ← XPath tuyệt đối (đường dẫn đầy đủ)
//button[@id="btn-search"]     ← XPath tương đối (tìm mọi nơi)
```

### 🧠 Tư duy:

| CSS | XPath |
|-----|-------|
| `button#btn-search` | `//button[@id='btn-search']` |
| `.class-name` | `//*[@class='class-name']` |
| `div > button` | `//div/button` |
| ❌ Không làm được | ✅ `//button[text()='Tìm kiếm']` |
| ❌ Không làm được | ✅ `//tr[3]/td[2]/button` |

</div>

---

# 📝 Cú pháp XPath cơ bản

<div style="text-align: left; font-size: 0.75em;">

### 🔤 Ký hiệu cơ bản

| Ký hiệu | Ý nghĩa | Ví dụ |
|---------|---------|-------|
| `//` | Tìm ở mọi cấp (tương đối) | `//button` → tìm mọi button |
| `/` | Tìm con trực tiếp | `//div/button` → button là con trực tiếp của div |
| `@` | Thuộc tính | `//input[@name='email']` |
| `*` | Thẻ bất kỳ | `//*[@id='main']` |
| `.` | Node hiện tại | `.//button` |
| `..` | Node cha | `//button/..` |

### 📋 Các pattern thông dụng

```xpath
<!-- 1. Tìm theo thuộc tính -->
//input[@name='merchantName']
//button[@type='submit']

<!-- 2. Tìm theo text CHÍNH XÁC -->
//button[text()='Tìm kiếm']
//span[text()='TEST ONEPAY']

<!-- 3. Tìm theo text CHỨA -->
//button[contains(text(), 'Tìm')]
//div[contains(@class, 'merchant')]

<!-- 4. Tìm theo vị trí -->
(//button)[1]                    ← button đầu tiên
//tr[3]/td[2]                    ← dòng 3, cột 2
//li[last()]                     ← phần tử cuối cùng
```

</div>

---

# 📝 XPath nâng cao – Quan hệ & Điều kiện

<div style="text-align: left; font-size: 0.73em;">

### 👨‍👩‍👧 Quan hệ gia đình (axes)

```xpath
<!-- Tìm element CHA của button có text "Xóa" -->
//button[text()='Xóa']/..

<!-- Tìm element ANH EM (sibling) -->
//td[text()='TEST ONEPAY']/following-sibling::td/button

<!-- Tìm element CON cháu (descendant) -->
//tr[@class='active']//button

<!-- Tìm element TỔ TIÊN (ancestor) -->
//button[text()='Xóa']/ancestor::tr
```

### 🔗 Kết hợp nhiều điều kiện

```xpath
<!-- AND: cả 2 điều kiện -->
//input[@type='text' and @name='email']

<!-- OR: 1 trong 2 điều kiện -->
//button[text()='Lưu' or text()='Save']

<!-- NOT: phủ định -->
//div[not(contains(@class, 'hidden'))]

<!-- Kết hợp text + position -->
//tr[contains(., 'TEST ONEPAY')]//button[text()='Xóa']
```

</div>

---

# 🆚 XPath vs CSS – Khi nào dùng gì?

<div style="text-align: left; font-size: 0.78em;">

### 📋 So sánh nhanh

| Tiêu chí | CSS Selector | XPath |
|----------|-------------|-------|
| Tốc độ | ⚡ Nhanh hơn | 🐢 Chậm hơn chút |
| Cú pháp | Ngắn gọn, dễ đọc | Dài hơn, nhiều ký hiệu |
| Tìm theo text | ❌ Không hỗ trợ | ✅ `//button[text()='Xóa']` |
| Tìm theo vị trí | ⚠️ Hạn chế (`:nth-child`) | ✅ `//tr[3]/td[2]` |
| Tìm cha / anh em | ❌ Không có | ✅ `..`, `following-sibling` |
| Tìm element động | ❌ Khó | ✅ `contains(@id, 'prefix_')` |

### 🎯 Nguyên tắc vàng

```
1. Ưu tiên CSS (nhanh, sạch)
2. Dùng XPath khi CSS "bó tay":
   ✅ Cần tìm theo text
   ✅ Cần tìm theo quan hệ cha-con, anh-em
   ✅ Cần tìm element động (id thay đổi)
```

```typescript
// Trong Playwright: Dùng page.locator() – hỗ trợ cả CSS & XPath
page.locator('button:has-text("Tìm kiếm")');       // CSS
page.locator('//button[text()="Tìm kiếm"]');        // XPath
```

</div>

---

# 🧪 Thực hành XPath – Ví dụ thực tế

<div style="text-align: left; font-size: 0.73em;">

### 📋 HTML mẫu – Bảng danh sách đơn vị

```html
<table id="merchant-table">
  <thead>
    <tr><th>Tên đơn vị</th><th>Mã số thuế</th><th>Thao tác</th></tr>
  </thead>
  <tbody>
    <tr>
      <td class="name">TEST ONEPAY</td>
      <td>0312345678</td>
      <td><button class="btn-edit">Sửa</button><button class="btn-delete">Xóa</button></td>
    </tr>
    <tr>
      <td class="name">TEST ONEPAY 2</td>
      <td>0387654321</td>
      <td><button class="btn-edit">Sửa</button><button class="btn-delete">Xóa</button></td>
    </tr>
    <tr>
      <td class="name">MERCHANT ABC</td>
      <td>0311112222</td>
      <td><button class="btn-edit">Sửa</button><button class="btn-delete">Xóa</button></td>
    </tr>
  </tbody>
</table>
```

### 🎯 Thử sức: Bắt các element sau bằng XPath

| Yêu cầu | XPath |
|---------|-------|
| Ô input tìm kiếm (có name="search") | `//input[@name='search']` |
| Tất cả các nút "Xóa" | `//button[text()='Xóa']` |
| Nút "Xóa" của dòng "TEST ONEPAY" | `//tr[contains(., 'TEST ONEPAY')]//button[text()='Xóa']` |
| Dòng thứ 2 trong bảng | `//table[@id='merchant-table']//tr[2]` |
| Nút "Sửa" của dòng cuối cùng | `(//button[text()='Sửa'])[last()]` |

</div>

---

# 🛠️ Cách test XPath trên trình duyệt

<div style="text-align: left; font-size: 0.78em;">

### 🔧 Dùng Chrome DevTools (F12)

```
1. Mở DevTools → Tab "Elements"
2. Ctrl+F → Gõ XPath vào ô Search
3. Thấy element được highlight → XPath đúng!
```

![h:200](https://developer.chrome.com/static/docs/devtools/dom/image/find-text-in-the-dom-wit-e6574a7e3513c.png)

### 🧪 Test XPath trong Console

```javascript
// Gõ vào Console của DevTools
$x('//button[text()="Tìm kiếm"]')
// → Trả về mảng các element khớp

$x('//tr[contains(., "TEST ONEPAY")]')
// → Trả về tất cả dòng chứa "TEST ONEPAY"

$x('(//button)[1]')
// → Trả về button đầu tiên
```

### ⚡ Tips:
- **Dùng `contains()`** thay vì `text()='...'` khi text có khoảng trắng thừa
- **Kiểm tra số lượng** kết quả: nếu `$x(...).length > 1` → cần thêm điều kiện
- **Copy XPath** từ DevTools: Click phải element → Copy → Copy XPath

</div>

---

# 🏆 Phần 4: Best Practices – Viết POM & Test "chuẩn"

<div style="text-align: left; font-size: 0.75em;">

### ✅ DO – Nên làm

| # | Best Practice | Ví dụ |
|---|---------------|-------|
| 1 | **Locator tập trung trong POM**, không rải rác trong test | `this.searchInput = page.locator('input[name=...]')` |
| 2 | **Đặt tên method rõ ràng, như tiếng Việt** | `search()`, `clickAdd()`, `verifyResultContains()` |
| 3 | **Mỗi method chỉ làm 1 việc** | Tách `fillForm()` + `clickSubmit()` thay vì `doEverything()` |
| 4 | **Dùng CSS trước, XPath khi cần** | `page.locator('.btn')` → ưu tiên; `page.locator('//button[text()=...]')` → khi CSS bó tay |
| 5 | **Kế thừa BasePage** để dùng chung method | `extends BasePage` → `await this.waitForPageLoad()` |
| 6 | **Data test tách riêng** khỏi code test | `data/merchant.data.ts` → truyền vào test |

### ❌ DON'T – Tránh làm

| # | Anti-Pattern | Tại sao không nên? |
|---|-------------|-------------------|
| 1 | Copy-paste selector giữa các test | Sửa 1 chỗ → sửa N file |
| 2 | Dùng XPath tuyệt đối `/html/body/div[1]/...` | Giao diện đổi 1 tí → XPath gãy hết |
| 3 | Method quá dài, làm quá nhiều thứ | Khó debug, khó tái sử dụng |
| 4 | Hard-code URL, credentials trong test | Dùng config / fixture |

</div>

---

# 🎮 Thực hành tại lớp (30')

<div style="text-align: left; font-size: 0.78em;">

### 🏋️ Bài tập: Viết POM + Test cho Google Search

**Yêu cầu:**
1. Tạo Page Class `GooglePage` với:
   - Locator: `searchInput`, `searchButton`, `resultStats`
   - Method: `search(keyword)`, `getResultCount()`
2. Viết test case tìm kiếm "Playwright Testing"
3. Dùng data-driven: Tìm 3 từ khóa khác nhau

### 📋 Gợi ý cấu trúc

```typescript
// lib/pages/google.page.ts
export class GooglePage extends BasePage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  // ...
  async search(keyword: string) { /* ... */ }
}

// tests/google-search.spec.ts
const keywords = ['Playwright', 'TypeScript', 'Automation Testing'];
for (const kw of keywords) {
  test(`Tìm kiếm "${kw}" trên Google`, async ({ page }) => {
    const google = new GooglePage(page);
    await google.search(kw);
    // assert...
  });
}
```

</div>

---

# 🏠 Bài tập về nhà

<div style="text-align: left; font-size: 0.75em;">

### 📝 Nhiệm vụ

> **Viết hoàn chỉnh POM + Test Case cho chức năng Tìm kiếm Đơn vị trên iPortal**

### 📋 Yêu cầu chi tiết

1. **Tạo file data** `data/merchant.data.ts` – chứa ít nhất 3 bộ data test (tên, mã số thuế, email, phone)

2. **Tạo Page Class** `lib/pages/merchant.page.ts`:
   - Ít nhất 5 Locator (kết hợp CSS + XPath)
   - Ít nhất 5 Method (search, clickAdd, clickEdit, verifyResult, getRowCount...)
   - Kế thừa `BasePage`

3. **Tạo Page Class** `lib/pages/login.page.ts`:
   - Locator: `usernameInput`, `passwordInput`, `loginButton`
   - Method: `login(username, password)`

4. **Viết 5 test case** trong `tests/merchant-crud.spec.ts`:
   - TC01: Tìm kiếm đơn vị theo tên chính xác
   - TC02: Tìm kiếm với data-driven (3+ bộ data, dùng vòng lặp)
   - TC03: Kiểm tra hiển thị danh sách mặc định
   - TC04: Tìm kiếm với từ khóa không tồn tại → hiển thị "Không có dữ liệu"
   - TC05: Click nút "Thêm Đơn Vị" → kiểm tra form hiển thị

### ⭐ Tiêu chí chấm điểm

| Tiêu chí | Điểm |
|----------|------|
| Có dùng POM (không để selector trong test) | 3đ |
| Có dùng XPath ít nhất 3 chỗ | 2đ |
| Có data-driven (vòng lặp qua mảng data) | 2đ |
| Code sạch, đặt tên rõ ràng | 2đ |
| Test chạy thành công | 1đ |

</div>

---

# 📚 Tổng kết Buổi 6

<div style="text-align: left; font-size: 0.78em;">

### 🎯 Hôm nay bạn đã học được:

| Kiến thức | Áp dụng vào đâu? |
|-----------|-----------------|
| **POM** – Gom locator + method vào 1 class | Mỗi trang web → 1 file `*.page.ts` |
| **BasePage** – Kế thừa method dùng chung | `waitForPageLoad()`, `screenshot()`... |
| **XPath** – Bắt element linh hoạt | Khi CSS không tìm được theo text, vị trí, quan hệ |
| **Data-driven** – Tách data khỏi code | Dùng `for...of` + mảng Object |
| **Lắp ghép** – Kết nối Data → POM → Test | Test case hoàn chỉnh, chạy được |

### 🧠 "Công thức" viết 1 test case automation:

```
1. Đọc Manual Test Case → hiểu cần test gì
2. Xác định Page nào → mở POM tương ứng, xem có method chưa
3. Nếu thiếu method → báo Auto Tester bổ sung
4. Chuẩn bị data test → khai báo Object / Array
5. Viết test theo AAA: Arrange → Act → Assert
6. Chạy test → debug nếu fail
```

</div>

---

<!-- _class: lead -->

# 🎉 Cảm ơn các bạn!

## Hẹn gặp lại Buổi 7
### Data-Driven & Test Parameterization Nâng Cao

![h:80](https://img.shields.io/badge/Playwright-45ba4b?style=flat&logo=playwright&logoColor=white)
![h:80](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)

<p class="small">📅 2026 &nbsp;|&nbsp; 👤 ONEPAY JSC</p>
