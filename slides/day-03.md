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

## **Buổi 3**
# TypeScript cho Manual Tester (P1)
## Kiểu dữ liệu, Biến, If-Else & Vòng lặp

![h:80](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![h:80](https://img.shields.io/badge/Playwright-45ba4b?style=flat&logo=playwright&logoColor=white)

<p class="small">🕐 2.5 giờ &nbsp;|&nbsp; 📅 2026 &nbsp;|&nbsp; 👤 ONEPAY JSC</p>

---

<!-- _class: default -->
# 📋 Agenda Buổi 3

| ⏱ | Phần | Nội dung |
|---|------|----------|
| 15' | **Phần 1** | Tại sao Manual Tester cần TypeScript? |
| 35' | **Phần 2** | Kiểu dữ liệu: String, Number, Boolean |
| 25' | **Phần 3** | Rẽ nhánh điều kiện với if-else |
| 25' | **Phần 4** | Vòng lặp – Lặp qua danh sách dữ liệu |
| 20' | **Phần 5** | Đọc hiểu tài liệu hàm – Cách khai báo biến |
| 30' | **Phần 6** | Thực hành tổng hợp |
| – | **🏠 Về nhà** | Bài tập if-else, vòng lặp & function |

### 🎯 Mục tiêu
- ✅ Hiểu và dùng được 3 kiểu dữ liệu cơ bản: `string`, `number`, `boolean`
- ✅ Phân biệt `const` vs `let` và biết khi nào dùng cái nào
- ✅ Dùng if-else để kiểm tra điều kiện và rẽ nhánh logic
- ✅ Dùng vòng lặp `for...of` để duyệt qua danh sách dữ liệu test
- ✅ Đọc hiểu signature của hàm để gọi đúng kiểu dữ liệu
- ✅ Tự khai báo biến data test để truyền vào hàm

---

# 🤔 Tại sao Manual Tester cần TypeScript?

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1em; text-align: left;">

<div>

### ❌ Không cần biết code sâu
- Không cần biết class, generic, interface...
- Không cần biết thuật toán phức tạp
- Không cần biết cấu trúc dữ liệu nâng cao

</div>

<div>

### ✅ Chỉ cần biết ĐÚNG 5 thứ:
1. **Khai báo biến** với đúng kiểu dữ liệu
2. **Dùng if-else** để kiểm tra điều kiện
3. **Dùng vòng lặp** để duyệt danh sách data test
4. **Đọc signature hàm** để biết truyền gì vào
5. **Gọi hàm** với data đã khai báo

</div>

</div>

---

# 🧠 Tư duy: "Tôi là người dùng hàm"

<div style="text-align: left;">

```typescript
// 👨‍💻 Auto Tester viết hàm:
function createUser(name: string, age: number, isAdmin: boolean) {
  // ... code phức tạp bên trong ...
  // Manual Tester KHÔNG CẦN ĐỌC phần này
}

// 👩‍💻 Manual Tester chỉ cần biết:
//    "Hàm này cần: 1 string + 1 number + 1 boolean"
//    → Khai báo biến đúng kiểu → gọi hàm
```

</div>

<br>

> 🧠 **Ghi nhớ:** Bạn là **người dùng hàm** – không phải **người viết hàm**. Giống như bạn dùng điện thoại mà không cần biết chip bên trong hoạt động ra sao!

---

# 📦 3 Kiểu dữ liệu Manual Tester cần biết

<div style="display: flex; justify-content: center; gap: 1em;">

<div style="background:#1565c0; border-radius:12px; padding:1em; flex:1; text-align:center;">

### 📝 **string**
### Chuỗi văn bản

`'Nguyễn Văn A'`
`'TEST_ONEPAY'`
`'PAY20260630001'`

*Tên, mã, số tham chiếu...*

</div>

<div style="background:#2e7d32; border-radius:12px; padding:1em; flex:1; text-align:center;">

### 💰 **number**
### Số

`100000`
`0.05`
`25450.75`

*Số tiền, phí, tỉ giá...*

</div>

<div style="background:#e65100; border-radius:12px; padding:1em; flex:1; text-align:center;">

### ✅ **boolean**
### Đúng / Sai

`true`
`false`

*Nội địa? Đang hoạt động?*

</div>

</div>

---

# 📝 Kiểu `string` – Chuỗi văn bản

<div style="text-align: left;">

### ✍️ Cách khai báo

```typescript
const customerName: string = 'Nguyễn Văn A';
const merchantCode: string = 'TEST_ONEPAY';
const bankCode: string     = 'VCB';
const transactionRef: string = 'PAY20260630001';
```

### 🎯 Dùng khi nào?
| Tình huống thực tế | Biến cần khai báo |
|---|---|
| Tìm kiếm đơn vị | `const keyword: string = 'TEST ONEPAY'` |
| Nhập mã tham chiếu | `const refNo: string = 'PAY123456'` |
| Chọn ngân hàng | `const bank: string = 'VCB'` |

</div>

---

# 💰 Kiểu `number` – Số

<div style="text-align: left;">

### ✍️ Cách khai báo

```typescript
const amount: number = 100000;         // Số tiền (VNĐ)
const feePercent: number = 0.05;        // Phí 5%
const quantity: number = 3;             // Số lượng
const exchangeRate: number = 25450.75;  // Tỉ giá
```

### 🧮 Có thể tính toán

```typescript
const total: number = amount * quantity;       // 300000
const fee: number = total * feePercent;         // 15000
const final: number = total + fee;              // 315000
```

### 🎯 Dùng khi nào?
| Tình huống thực tế | Biến cần khai báo |
|---|---|
| Nhập số tiền giao dịch | `const amount: number = 500000` |
| Kiểm tra số lượng kết quả | `expect(list).toHaveCount(5)` |

</div>

---

# ✅ Kiểu `boolean` – Đúng / Sai

<div style="text-align: left;">

### ✍️ Cách khai báo

```typescript
const isDomestic: boolean = true;       // Nội địa?
const isActive: boolean = true;          // Đang hoạt động?
const hasPromotion: boolean = false;     // Có khuyến mãi?
```

### 🔀 Dùng trong điều kiện

```typescript
console.log(isDomestic ? 'Nội địa' : 'Quốc tế');
//                   ↑ true → 'Nội địa'
//                            ↑ false → 'Quốc tế'
```

### 🎯 Dùng khi nào?
| Tình huống thực tế | Biến cần khai báo |
|---|---|
| Check tài khoản active? | `const isActive: boolean = true` |
| Giao dịch nội địa? | `const isDomestic: boolean = true` |
| Có khuyến mãi? | `const hasPromo: boolean = false` |

</div>

---

<!-- _class: default -->
# 🔀 Phần 3: If-Else – Rẽ nhánh điều kiện

<div style="text-align: left;">

### 🧠 Tư duy: "Nếu...thì...nếu không thì..."

```typescript
if (điều_kiện) {
  // Làm gì đó nếu điều kiện ĐÚNG
} else {
  // Làm gì đó nếu điều kiện SAI
}
```

### 📋 Cú pháp cơ bản

```typescript
// ① if đơn giản
if (amount > 0) {
  console.log('✅ Số tiền hợp lệ');
}

// ② if...else
if (amount > 0) {
  console.log('✅ Hợp lệ');
} else {
  console.log('❌ Không hợp lệ');
}

// ③ if...else if...else (nhiều nhánh)
if (amount > 1000000) {
  console.log('🔴 Giao dịch giá trị cao');
} else if (amount > 100000) {
  console.log('🟡 Giao dịch trung bình');
} else {
  console.log('🟢 Giao dịch nhỏ');
}
```

</div>

---

# 🔀 If-Else trong thực tế Manual Test

<div style="text-align: left; font-size: 0.85em;">

### 🎯 Tình huống 1: Kiểm tra kết quả giao dịch

```typescript
const transactionStatus: string = 'success';

if (transactionStatus === 'success') {
  console.log('✅ Giao dịch thành công');
  // Kiểm tra tiền đã về tài khoản
} else if (transactionStatus === 'pending') {
  console.log('⏳ Giao dịch đang xử lý');
  // Chờ thêm rồi kiểm tra lại
} else {
  console.log('❌ Giao dịch thất bại');
  // Chụp màn hình báo lỗi
}
```

### 🎯 Tình huống 2: Phân loại đơn vị theo mã

```typescript
const merchantType: string = 'domestic';

if (merchantType === 'domestic') {
  console.log('🏠 Đơn vị nội địa – Phí 1%');
} else {
  console.log('🌍 Đơn vị quốc tế – Phí 3%');
}
```

</div>

---

# 🔀 So sánh trong điều kiện if

<div style="text-align: left;">

### 🧮 Các phép so sánh

| Ký hiệu | Ý nghĩa | Ví dụ |
|:-------:|---------|-------|
| `===` | Bằng (so sánh chặt) | `status === 'success'` |
| `!==` | Khác | `status !== 'error'` |
| `>` | Lớn hơn | `amount > 100000` |
| `<` | Nhỏ hơn | `fee < 5000` |
| `>=` | Lớn hơn hoặc bằng | `count >= 5` |
| `<=` | Nhỏ hơn hoặc bằng | `age <= 18` |

### ⚠️ Lưu ý quan trọng

```typescript
// ✅ DÙNG 3 dấu = (so sánh chặt)
if (amount === 0) { /* ... */ }

// ❌ KHÔNG DÙNG 1 dấu = (đó là phép GÁN, không phải so sánh!)
// if (amount = 0) { /* ... */ }  ← SAI!

// ❌ KHÔNG DÙNG 2 dấu = (so sánh lỏng, dễ gây bug)
// if (amount == 0) { /* ... */ }  ← Tránh!
```

</div>

---

# 🔀 Kết hợp nhiều điều kiện: && và ||

<div style="text-align: left;">

| Ký hiệu | Ý nghĩa | Ví dụ |
|:-------:|---------|-------|
| `&&` | **VÀ** – Tất cả đều đúng | `amount > 0 && isActive` |
| `||` | **HOẶC** – Chỉ cần 1 cái đúng | `status === 'error' || status === 'timeout'` |

### 📋 Ví dụ thực tế:

```typescript
// VÀ (&&): Giao dịch hợp lệ khi amount > 0 VÀ tài khoản active
if (amount > 0 && isActive === true) {
  console.log('✅ Có thể tạo giao dịch');
} else {
  console.log('❌ Không thể tạo giao dịch');
}

// HOẶC (||): Giao dịch lỗi khi bị error HOẶC timeout
if (status === 'error' || status === 'timeout') {
  console.log('❌ Giao dịch thất bại');
} else {
  console.log('✅ Giao dịch OK');
}
```

</div>

---

# 🔄 `const` vs `let` – Khi nào dùng gì?

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1em; text-align: left;">

<div style="background:#1b5e20; border-radius:12px; padding:1em;">

### 🔒 `const` – Hằng số
**Dùng cho data test – 90% thời gian**

```typescript
const amount: number = 100000;
const bankCode: string = 'VCB';

// ❌ Không thể gán lại
// amount = 200000;  // Lỗi!
```

✅ Dùng `const` khi giá trị **không đổi** trong suốt test case

</div>

<div style="background:#e65100; border-radius:12px; padding:1em;">

### 🔓 `let` – Có thể thay đổi
**Dùng khi cần gán lại giá trị**

```typescript
let status: string = 'Chờ xử lý';
// ... sau 1 vài thao tác ...
status = 'Thành công';  // ✅ OK

let count: number = 0;
count = count + 1;       // ✅ OK
```

✅ Dùng `let` khi giá trị **thay đổi** trong quá trình test

</div>

</div>

---

<!-- _class: default -->
# 🔁 Phần 4: Vòng lặp – Lặp qua danh sách

<div style="text-align: left;">

### 🧠 Tại sao Manual Tester cần vòng lặp?

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5em;">

<div>

### ❌ Không có vòng lặp
```typescript
// Lặp lại code 3 lần – rất dài!
test('Tìm "TEST ONEPAY"', ...)
test('Tìm "Toàn Bộ Tài Khoản"', ...)
test('Tìm "TESTONEPAY"', ...)
```

</div>

<div>

### ✅ Có vòng lặp
```typescript
// 1 vòng lặp = tự động chạy 3 test!
const keywords = ['TEST ONEPAY',
  'Toàn Bộ Tài Khoản', 'TESTONEPAY'];

for (const kw of keywords) {
  test(`Tìm "${kw}"`, ...)
}
```

</div>

</div>

</div>

> 🧠 **1 file data + 1 vòng lặp = N test case.** Đây là sức mạnh của Automation!

---

# 🔁 Vòng lặp `for...of` – Duyệt từng phần tử

<div style="text-align: left;">

### ✍️ Cú pháp

```typescript
for (const phần_tử of mảng) {
  // Làm gì đó với từng phần_tử
}
```

### 📋 Ví dụ 1: In danh sách ngân hàng

```typescript
const bankList: string[] = ['VCB', 'TCB', 'ACB', 'BIDV'];

for (const bank of bankList) {
  console.log(`🏦 Ngân hàng: ${bank}`);
}
// Output:
// 🏦 Ngân hàng: VCB
// 🏦 Ngân hàng: TCB
// 🏦 Ngân hàng: ACB
// 🏦 Ngân hàng: BIDV
```

</div>

---

# 🔁 Vòng lặp `for...of` – Ứng dụng test thực tế

<div style="text-align: left; font-size: 0.8em;">

### 📋 Ví dụ 2: Tạo test tự động từ danh sách data

```typescript
// Danh sách dữ liệu test – Manual Tester quản lý
const searchKeywords: string[] = [
  'TEST ONEPAY',
  'Toàn Bộ Tài Khoản',
  'TESTONEPAY',
];

// Dùng vòng lặp tạo test case tự động
for (const keyword of searchKeywords) {
  test(`Tìm kiếm đơn vị: "${keyword}"`, async ({ page }) => {
    // Nhập từ khóa
    await page.fill('[placeholder="Nhập từ khóa"]', keyword);

    // Click tìm kiếm
    await page.click('button:has-text("Tìm kiếm")');

    // Kiểm tra kết quả có chứa keyword
    await expect(page.locator('.result'))
      .toContainText(keyword);
  });
}
// ☝️ 1 vòng lặp = 3 test case tự động!
```

</div>

---

# 🔁 Vòng lặp `forEach` – Cách khác để duyệt mảng

<div style="text-align: left;">

### ✍️ Cú pháp `forEach`

```typescript
mảng.forEach((phần_tử, chỉ_số) => {
  // Làm gì đó với phần_tử và chỉ_số
});
```

### 📋 So sánh `for...of` vs `forEach`

| | `for...of` | `forEach` |
|---|:---:|:---:|
| Dùng với `test()` | ✅ **NÊN DÙNG** | ⚠️ Không khuyến khích |
| In danh sách ra console | ✅ Được | ✅ Được |
| Cú pháp | Đơn giản hơn | Hơi khó đọc hơn |

### 📋 Ví dụ `forEach`:

```typescript
const merchants: string[] = ['TEST ONEPAY', 'TEST ONEPAY (Toàn Bộ)', 'TESTONEPAYTHB'];

merchants.forEach((name, index) => {
  console.log(`   ${index + 1}. ${name}`);
});
// Output:
//    1. TEST ONEPAY
//    2. TEST ONEPAY (Toàn Bộ)
//    3. TESTONEPAYTHB
```

</div>

---

# 🔁 Vòng lặp + If-Else = Data-driven Test

<div style="text-align: left; font-size: 0.75em;">

### 💡 Kết hợp mạnh mẽ: Duyệt danh sách + kiểm tra điều kiện

```typescript
// Mảng data test (Manual Tester chuẩn bị)
const paymentList = [
  { refNo: 'PAY-001', amount: 100000,  bankCode: 'VCB' },
  { refNo: 'PAY-002', amount: 0,       bankCode: 'TCB' },
  { refNo: 'PAY-003', amount: 500000,  bankCode: 'VCB' },
  { refNo: 'PAY-004', amount: -10000,  bankCode: 'ACB' },
];

// Vòng lặp + if-else để phân loại
for (const payment of paymentList) {
  if (payment.amount > 0) {
    console.log(`✅ ${payment.refNo}: Hợp lệ – ${payment.amount.toLocaleString('vi-VN')}đ`);
  } else if (payment.amount === 0) {
    console.log(`⚠️ ${payment.refNo}: Số tiền = 0 – Cần kiểm tra`);
  } else {
    console.log(`❌ ${payment.refNo}: Số tiền ÂM – KHÔNG hợp lệ!`);
  }
}
```

### 📊 Output:
```
✅ PAY-001: Hợp lệ – 100.000đ
⚠️ PAY-002: Số tiền = 0 – Cần kiểm tra
✅ PAY-003: Hợp lệ – 500.000đ
❌ PAY-004: Số tiền ÂM – KHÔNG hợp lệ!
```

</div>

---

<!-- _class: default -->
# 🧩 Phần 5: Cách đọc tài liệu hàm (Function Signature)

<div style="text-align: left;">

### 🔍 Auto Tester cung cấp cho bạn:

```typescript
/**
 * Tạo user mới trong hệ thống
 * @param name   - Tên user (string)
 * @param age    - Tuổi (number)
 * @param isAdmin - Có phải admin không? (boolean)
 */
function createUser(name: string, age: number, isAdmin: boolean) {
  // ...
}
```

### 📖 Manual Tester đọc hiểu:

| Tham số | Kiểu dữ liệu | Ý nghĩa | Ví dụ giá trị |
|---------|:----------:|---------|--------------|
| `name` | `string` | Tên user | `'Nguyễn Văn A'` |
| `age` | `number` | Tuổi | `28` |
| `isAdmin` | `boolean` | Admin? | `true` |

</div>

---

# ✍️ Từ đọc hiểu → Khai báo biến → Gọi hàm

<div style="text-align: left;">

### 📋 Quy trình 3 bước:

```typescript
// Bước 1: Xem signature để biết cần kiểu gì
//         createUser(name: string, age: number, isAdmin: boolean)

// Bước 2: Khai báo biến ĐÚNG kiểu dữ liệu
const userName: string  = 'Nguyễn Văn A';
const userAge: number   = 28;
const userIsAdmin: boolean = true;

// Bước 3: Gọi hàm với biến đã khai báo
createUser(userName, userAge, userIsAdmin);
```

</div>

<br>

<div style="background:#b71c1c; border-radius:10px; padding:0.5em;">

### ❌ Lỗi thường gặp – Sai kiểu dữ liệu!

```typescript
const age: string = '28';     // ❌ age phải là number!
createUser(name, age, isAdmin); // TypeScript sẽ báo lỗi 🔴
```

</div>

---

# 🎯 Ví dụ thực tế: Hàm `checkout()`

<div style="text-align: left; font-size: 0.8em;">

```typescript
/**
 * Thực hiện giao dịch thanh toán
 * @param amount    - Số tiền (number)
 * @param bankCode  - Mã ngân hàng (string)
 * @param isDomestic - Nội địa hay quốc tế (boolean)
 */
function checkout(amount: number, bankCode: string, isDomestic: boolean) {
  // Auto Tester viết code bên trong
}
```

### 👩‍💻 Manual Tester – Chuẩn bị data:

```typescript
// Khai báo data test
const paymentAmount: number  = 500000;
const paymentBank: string    = 'VCB';
const paymentDomestic: boolean = true;

// Gọi hàm
checkout(paymentAmount, paymentBank, paymentDomestic);
```

</div>

---

# 🧵 Template String – "Nối chuỗi thông minh"

<div style="text-align: left;">

### ❌ Cách cũ (khó đọc):
```typescript
const msg = 'GD ' + refNo + ': ' + amount + ' VND - ' + bank;
```

### ✅ Cách mới – Dùng backtick `` ` ``:
```typescript
const msg = `GD ${refNo}: ${amount.toLocaleString('vi-VN')} VND - ${bank}`;
```

### 📋 Ví dụ thực tế:
```typescript
const summary = `
📋 TÓM TẮT GIAO DỊCH
─────────────────────────
Mã tham chiếu : ${refNo}
Khách hàng    : ${customer}
Số tiền       : ${amount.toLocaleString('vi-VN')} VNĐ
Ngân hàng     : ${bank}
Loại          : ${isDomestic ? 'Nội địa' : 'Quốc tế'}
`;
```

</div>

---

<!-- _class: default -->
<!-- _class: default -->
# 🏋️ Phần 6: Thực hành tổng hợp

---

# 🏋️ Bài tập 3.1: If-Else – Phân loại giao dịch (10')

<div style="text-align: left; font-size: 0.8em;">

### 📋 Đề bài: Cho mảng dữ liệu giao dịch sau

```typescript
const transactions = [
  { id: 'GD001', amount: 5000000 },
  { id: 'GD002', amount: 500000 },
  { id: 'GD003', amount: 50000 },
  { id: 'GD004', amount: 0 },
];
```

### ✍️ Yêu cầu:
Dùng `if...else if...else` để phân loại từng giao dịch:

| Điều kiện | Phân loại |
|-----------|----------|
| `amount > 1000000` | "Giao dịch giá trị CAO" |
| `amount > 100000` | "Giao dịch giá trị TRUNG BÌNH" |
| `amount > 0` | "Giao dịch giá trị THẤP" |
| `amount === 0` | "Giao dịch KHÔNG hợp lệ (số tiền = 0)" |

### 🎯 Kết quả mong đợi:
```
GD001: Giao dịch giá trị CAO
GD002: Giao dịch giá trị TRUNG BÌNH
GD003: Giao dịch giá trị THẤP
GD004: Giao dịch KHÔNG hợp lệ (số tiền = 0)
```

</div>

---

# 🏋️ Bài tập 3.2: Vòng lặp – In danh sách (10')

<div style="text-align: left; font-size: 0.8em;">

### 📋 Đề bài:

```typescript
const banks = [
  { code: 'VCB', name: 'Vietcombank' },
  { code: 'TCB', name: 'Techcombank' },
  { code: 'ACB', name: 'Á Châu Bank' },
  { code: 'BIDV', name: 'BIDV' },
];
```

### ✍️ Yêu cầu:
1. Dùng vòng lặp `for...of` để in danh sách ngân hàng theo format:
2. Đếm tổng số ngân hàng và in ra cuối cùng

### 🎯 Kết quả mong đợi:
```
🏦 1. VCB – Vietcombank
🏦 2. TCB – Techcombank
🏦 3. ACB – Á Châu Bank
🏦 4. BIDV – BIDV
📊 Tổng số: 4 ngân hàng
```

</div>

---

# 🏋️ Bài tập 3.3: Vòng lặp + If-Else kết hợp (15')

<div style="text-align: left; font-size: 0.75em;">

### 📋 Đề bài: Kiểm tra danh sách giao dịch

```typescript
const paymentList = [
  { refNo: 'PAY-001', amount: 200000,  status: 'success' },
  { refNo: 'PAY-002', amount: 0,       status: 'pending' },
  { refNo: 'PAY-003', amount: 500000,  status: 'success' },
  { refNo: 'PAY-004', amount: 150000,  status: 'failed' },
  { refNo: 'PAY-005', amount: -50000,  status: 'error' },
];
```

### ✍️ Yêu cầu:
Dùng `for...of` + `if...else` để:
1. Chỉ in ra các giao dịch **thành công** (`status === 'success'`)
2. Với mỗi giao dịch thành công, kiểm tra thêm `amount > 0` thì in ✅, ngược lại ⚠️

### 🎯 Kết quả mong đợi:
```
✅ PAY-001: 200.000đ – Thành công & Hợp lệ
✅ PAY-003: 500.000đ – Thành công & Hợp lệ
```

</div>

---

# 🏋️ Bài tập 3.4: Đọc Signature & Khai báo biến (10')

<div style="text-align: left; font-size: 0.75em;">

### 📋 Tình huống: Auto Tester đưa bạn hàm sau

```typescript
function searchTransaction(
  merchantCode: string,   // Mã đơn vị
  startDate: string,      // Ngày bắt đầu (yyyy-mm-dd)
  endDate: string,        // Ngày kết thúc (yyyy-mm-dd)
  minAmount: number,      // Số tiền tối thiểu
  includeRefund: boolean  // Có bao gồm hoàn trả?
) { /* ... */ }
```

### ❓ Hãy trả lời:
1. Hàm này cần truyền vào mấy tham số? Kiểu gì?
2. Khai báo đầy đủ các biến để gọi hàm `searchTransaction()`
3. Viết câu lệnh gọi hàm với các biến đã khai báo

</div>

---

# 💡 Mẹo: Type Annotation "chú thích kiểu"

<div style="text-align: left;">

### ✅ CÓ type annotation (NÊN làm):
```typescript
const amount: number = 100000;
//           ^^^^^^ TypeScript kiểm tra giúp bạn
```

### ⚠️ KHÔNG type annotation (vẫn chạy, nhưng...):
```typescript
const amount = 100000;
// TypeScript tự đoán là number → có thể sai ý định
```

### 🔴 Nếu khai báo sai kiểu:
```typescript
const amount: number = '100000';
//                     ^^^^^^^^
// ❌ Type 'string' is not assignable to type 'number'
```

</div>

<br>

> 🧠 **Luôn thêm type annotation** – VS Code sẽ báo lỗi ngay nếu bạn gán sai kiểu!

---

# 🏠 Bài tập về nhà

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.6em; text-align: left; font-size: 0.8em;">

<div style="background:#1565c0; border-radius:10px; padding:0.6em;">

### 📝 Bài 1: If-Else phân loại tuổi

Viết code nhận vào `age: number`, in ra phân loại:

| Tuổi | Phân loại |
|------|----------|
| `< 18` | "Trẻ em" |
| `18 – 60` | "Người lớn" |
| `> 60` | "Người cao tuổi" |

Test với 3 giá trị: `15`, `30`, `65`

</div>

<div style="background:#2e7d32; border-radius:10px; padding:0.6em;">

### 📝 Bài 2: Vòng lặp in bảng cửu chương

Dùng vòng lặp `for` để in bảng cửu chương 5:

```
5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
...
5 x 10 = 50
```

</div>

<div style="background:#e65100; border-radius:10px; padding:0.6em;">

### 📝 Bài 3: Vòng lặp + If-Else kiểm tra số

Cho mảng `const numbers: number[] = [3, 7, -2, 0, 12, -8, 5]`

Dùng `for...of` + `if...else`:
- Nếu số > 0: in `✅ {số} là số DƯƠNG`
- Nếu số < 0: in `❌ {số} là số ÂM`
- Nếu số === 0: in `⏺ {số} là số KHÔNG`

</div>

<div style="background:#6a1b9a; border-radius:10px; padding:0.6em;">

### 📝 Bài 4: Function kiểm tra amount

Viết function `isValidAmount(amount: number): boolean`:
- Trả về `true` nếu amount > 0
- Trả về `false` nếu amount ≤ 0

Dùng vòng lặp test với mảng:
`[100000, 0, -50000, 200000, -1]`

</div>

</div>

<br>

<div class="small">

### 📁 Cách nộp bài:
- Tạo file `Result/buoi-03/bai-tap.ts` trong project
- Viết code 4 bài trên, mỗi bài cách nhau bởi dòng `// ====`
- Push lên nhánh GitHub cá nhân

</div>

---

# 🔁 Tổng kết: "Bộ công cụ" Manual Tester

<div style="display: flex; justify-content: center; gap: 0.4em; font-size: 0.65em;">

<div style="background:#1565c0; border-radius:12px; padding:0.6em; flex:1; text-align:center;">

### ① 
### Biến & Kiểu DL
`string`, `number`, `boolean`

`const name: string = 'A';`

</div>

<div style="font-size:1.5em; display:flex; align-items:center;">➡️</div>

<div style="background:#e65100; border-radius:12px; padding:0.6em; flex:1; text-align:center;">

### ② 
### If-Else
Kiểm tra điều kiện, rẽ nhánh

`if (amount > 0) { ... }`

</div>

<div style="font-size:1.5em; display:flex; align-items:center;">➡️</div>

<div style="background:#2e7d32; border-radius:12px; padding:0.6em; flex:1; text-align:center;">

### ③ 
### Vòng lặp
Duyệt danh sách data test

`for (const x of list) { ... }`

</div>

<div style="font-size:1.5em; display:flex; align-items:center;">➡️</div>

<div style="background:#6a1b9a; border-radius:12px; padding:0.6em; flex:1; text-align:center;">

### ④ 
### Gọi Hàm
Truyền data vào function

`createUser(name, age);`

</div>

<div style="font-size:1.5em; display:flex; align-items:center;">➡️</div>

<div style="background:#c62828; border-radius:12px; padding:0.6em; flex:1; text-align:center;">

### ⑤ 
### Chạy & Xem
`npx tsx file.ts`

</div>

</div>

<br>

<div style="text-align: center; font-size: 0.8em;">

> 🧠 **Ghi nhớ:** `Biến + If-Else + Vòng lặp + Hàm = Viết được data test chuyên nghiệp!`

</div>

---

# ❌ Lỗi thường gặp & Cách sửa

| 🔴 Lỗi | Nguyên nhân | ✅ Cách sửa |
|--------|------------|-----------|
| `Type 'string' is not assignable to type 'number'` | Gán string cho biến number | Bỏ dấu `''`: `100000` thay vì `'100000'` |
| `Type 'number' is not assignable to type 'string'` | Gán number cho biến string | Thêm dấu `''`: `'VCB'` thay vì `VCB` |
| `Cannot assign to 'xxx' because it is a constant` | Dùng `const` nhưng gán lại | Đổi sang `let` nếu cần thay đổi |
| `Expected 3 arguments, but got 2` | Thiếu tham số khi gọi hàm | Kiểm tra lại signature, truyền đủ tham số |
| `Unexpected token 'else'` | Thiếu dấu `{}` hoặc sai cấu trúc | Kiểm tra đủ `{ }` cho if và else |
| `Cannot read property 'amount' of undefined` | Phần tử trong vòng lặp bị undefined | Kiểm tra mảng có phần tử không trước khi lặp |
| `'xxx' is not iterable` | Dùng `for...of` với biến không phải mảng | Đảm bảo biến đó là mảng (`type[]`) |

---

# 📋 Checklist – Sau buổi 3, bạn có thể:

<div style="text-align: left;">

- [ ] Phân biệt và khai báo đúng 3 kiểu: `string`, `number`, `boolean`
- [ ] Chọn đúng `const` vs `let` cho từng tình huống
- [ ] **Dùng if-else để kiểm tra điều kiện và rẽ nhánh**
- [ ] **Dùng vòng lặp `for...of` để duyệt qua danh sách data test**
- [ ] **Kết hợp vòng lặp + if-else để xử lý nhiều bộ data**
- [ ] Đọc hiểu signature của một hàm (biết cần truyền gì)
- [ ] Tự khai báo biến data test với type annotation đầy đủ
- [ ] Gọi hàm thành công với biến đã khai báo
- [ ] Dùng template string để tạo chuỗi mô tả
- [ ] Tự sửa lỗi khi TypeScript báo sai kiểu dữ liệu

</div>

---

<!-- _class: lead -->
<!-- _paginate: skip -->

# 🎉 Hết Buổi 3

### Cảm ơn! 🙏

### Câu hỏi? 🤔

<p class="small">
📅 Buổi 4: TypeScript cho Manual Tester (P2) – Object & Biến Môi trường
</p>
