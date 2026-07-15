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

## **Buổi 4**
# TypeScript cho Manual Tester (P2)
## Object – Gom nhóm dữ liệu test

![h:80](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![h:80](https://img.shields.io/badge/Playwright-45ba4b?style=flat&logo=playwright&logoColor=white)

<p class="small">🕐 1.75 giờ &nbsp;|&nbsp; 📅 2026 &nbsp;|&nbsp; 👤 ONEPAY JSC</p>

---

<!-- _class: default -->
# 📋 Agenda Buổi 4

| ⏱ | Phần | Nội dung |
|---|------|----------|
| 15' | **Phần 1** | Ôn tập nhanh Buổi 3 |
| 40' | **Phần 2** | Object – Gom nhóm dữ liệu test |
| 40' | **Phần 3** | Thực hành tổng hợp |
| – | **🏠 Về nhà** | Bài tập Object & Array kết hợp |

### 🎯 Mục tiêu
- ✅ Dùng Object `{}` để gom nhóm dữ liệu test (thanh toán, user, thẻ...)
- ✅ Hiểu và dùng `type` để định nghĩa "khuôn" cho Object
- ✅ Truyền Object vào hàm thay vì truyền lẻ từng tham số
- ✅ Tạo mảng Object để quản lý nhiều bộ data test

---

# 🔄 Ôn tập nhanh Buổi 3 (5')

<div style="text-align: left;">

### 🧠 Bạn đã biết:

```typescript
// Biến & kiểu dữ liệu
const amount: number = 100000;
const bankCode: string = 'VCB';

// If-else
if (amount > 0) {
  console.log('Hợp lệ');
} else {
  console.log('Không hợp lệ');
}

// Vòng lặp
for (const item of list) {
  console.log(item);
}
```

</div>

<br>

### 🔜 Hôm nay: Gom tất cả thành 1 "cục" Object!

```typescript
// Từ 5 biến rời rạc...
// ↓ THÀNH ↓
const payment = { amount: 100000, bank: 'VCB', isDomestic: true };
//             ☝️ 1 object duy nhất!
```

---

# 🤔 Tại sao cần Object?

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1em; text-align: left;">

<div>

### ❌ Không dùng Object
```typescript
const refNo = 'PAY-001';
const amount = 100000;
const bank = 'VCB';
const customer = 'Nguyễn Văn A';
const isDomestic = true;

// Mỗi giao dịch ~5 dòng khai báo
// 10 giao dịch = 50 dòng code!
// Truyền vào hàm lẻ tẻ, dễ sai thứ tự
```

</div>

<div>

### ✅ Dùng Object
```typescript
const payment = {
  refNo: 'PAY-001',
  amount: 100000,
  bank: 'VCB',
  customer: 'Nguyễn Văn A',
  isDomestic: true,
};

// 1 object = 1 giao dịch
// 10 giao dịch = 10 dòng (mảng object)
// Truyền vào hàm gọn, không sợ sai thứ tự
```

</div>

</div>

---

# 📦 Object là gì?

<div style="text-align: left;">

### Object = một "thùng" chứa nhiều giá trị có gắn nhãn

```typescript
// Cú pháp: { key: value, key: value, ... }
const user = {
  name: 'Nguyễn Văn A',    // key "name" → value "Nguyễn Văn A"
  age: 28,                  // key "age"  → value 28
  isAdmin: true,            // key "isAdmin" → value true
};

// Truy cập bằng dấu chấm `.`
console.log(user.name);     // "Nguyễn Văn A"
console.log(user.age);      // 28
console.log(user.isAdmin);  // true
```

### 🧠 Tư duy:

| Object giống như... | Key | Value |
|---------------------|-----|-------|
| 🏢 **Hồ sơ khách hàng** | `name`, `phone`, `email` | "Nguyễn Văn A", "0901...", "a@..." |
| 💳 **Thông tin thẻ** | `cardNumber`, `bank`, `type` | "411111...", "VCB", "credit" |
| 💰 **Giao dịch** | `refNo`, `amount`, `status` | "PAY-001", 100000, "success" |

</div>

---

# ✍️ Object cơ bản – Gom dữ liệu 1 giao dịch

<div style="text-align: left;">

### 📋 Ví dụ: Dữ liệu thanh toán

```typescript
// Trước đây: 5 biến rời rạc
const refNo: string = 'PAY20260701001';
const amount: number = 150000;
const bankCode: string = 'VCB';
const merchantCode: string = 'TEST_ONEPAY';
const isDomestic: boolean = true;

// Bây giờ: 1 Object gom tất cả
const transaction = {
  refNo: 'PAY20260701001',
  amount: 150000,
  bankCode: 'VCB',
  merchantCode: 'TEST_ONEPAY',
  isDomestic: true,
};

// Truy cập từng giá trị
console.log('Số tiền:', transaction.amount.toLocaleString('vi-VN'), 'VNĐ');
console.log('Ngân hàng:', transaction.bankCode);
console.log('Loại:', transaction.isDomestic ? 'Nội địa' : 'Quốc tế');
```

</div>

---

# 📦 Object lồng nhau – Dữ liệu phức tạp

<div style="text-align: left; font-size: 0.8em;">

### 📋 Ví dụ: Thông tin đơn vị (Merchant)

```typescript
// Object có thể chứa Object bên trong!
const merchant = {
  code: 'TEST_ONEPAY',
  name: 'TEST ONEPAY',
  status: 'active',

  // Object con – thông tin liên hệ
  contact: {
    email: 'test@onepay.vn',
    phone: '0901234567',
    address: 'Hà Nội',
  },

  // Object con – cấu hình thanh toán
  config: {
    domesticCard: true,       // Hỗ trợ thẻ nội địa?
    internationalCard: false, // Hỗ trợ thẻ quốc tế?
    wallet: true,             // Hỗ trợ ví điện tử?
  },
};

// Truy cập object lồng nhau bằng cách nối dấu chấm `.`
console.log(merchant.contact.email);           // "test@onepay.vn"
console.log(merchant.config.domesticCard);     // true
console.log(merchant.config.internationalCard); // false
```

</div>

---

# 🏷️ Type Annotation cho Object – "Khuôn" dữ liệu

<div style="text-align: left; font-size: 0.8em;">

### 🤔 Không có khuôn → dễ sai

```typescript
const payment1 = {
  refNo: 'PAY-001',
  amount: 100000,       // ✅ number
  bankCode: 'VCB',
};

const payment2 = {
  refNo: 'PAY-002',
  amount: 'một trăm',   // ❌ string – Sai mà không ai báo!
  bankCode: 'VCB',
};
```

### ✅ Có khuôn (`type`) → TypeScript báo lỗi ngay

```typescript
// Bước 1: Định nghĩa "khuôn"
type PaymentData = {
  refNo: string;
  amount: number;
  bankCode: string;
  description: string;
};

// Bước 2: Tạo object theo khuôn (thêm dấu `: PaymentData`)
const payment1: PaymentData = {
  refNo: 'PAY-001',
  amount: 100000,                    // ✅ number
  bankCode: 'VCB',
  description: 'Thanh toán đơn 001',
};

// ❌ TypeScript sẽ báo lỗi nếu sai kiểu:
// const payment2: PaymentData = {
//   refNo: 'PAY-002',
//   amount: 'abc',     // ❌ Type 'string' is not assignable to type 'number'
//   bankCode: 'VCB',
// };
```

</div>

---

# 🏷️ Các `type` thường dùng trong iPortal

<div style="text-align: left; font-size: 0.75em;">

### 📋 Mẫu type cho dự án thực tế

```typescript
// ① Type cho tìm kiếm đơn vị
type MerchantSearchData = {
  keyword: string;
  expectedResult: 'found' | 'not_found';
  expectedMerchantName?: string;  // Dấu ? = optional (có hoặc không)
};

// ② Type cho giao dịch thanh toán
type TransactionData = {
  refNo: string;
  amount: number;
  currency: 'VND' | 'USD';                   // Chỉ được 1 trong 2
  bankCode: string;
  cardType: 'domestic' | 'international' | 'wallet';
  expectedStatus: 'success' | 'pending' | 'failed';
};

// ③ Type cho đối soát
type ReconciliationData = {
  date: string;
  merchantCode: string;
  expectedTotalAmount: number;
  expectedTotalCount: number;
};
```

</div>

<br>

> 🧠 **`type` = "khuôn đúc"** – Mọi object cùng khuôn sẽ có cấu trúc giống hệt nhau!

---

# 🔄 Truyền Object vào hàm

<div style="text-align: left; font-size: 0.8em;">

### ❌ Cách cũ: Truyền lẻ từng tham số

```typescript
function checkout(
  amount: number,
  bankCode: string,
  customerName: string,
  email: string,
  isDomestic: boolean
) {
  // Dễ sai thứ tự, khó đọc
  console.log(`${customerName} thanh toán ${amount}đ qua ${bankCode}`);
}

// Gọi hàm – phải nhớ đúng thứ tự 5 tham số!
checkout(500000, 'VCB', 'Nguyễn Văn A', 'a@onepay.vn', true);
```

### ✅ Cách mới: Gom vào Object rồi truyền 1 lần

```typescript
// Định nghĩa type cho dữ liệu đầu vào
type CheckoutInput = {
  amount: number;
  bankCode: string;
  customerName: string;
  email: string;
  isDomestic: boolean;
};

function checkout(input: CheckoutInput) {
  console.log(`${input.customerName} thanh toán ${input.amount}đ qua ${input.bankCode}`);
}

// Chuẩn bị data test
const paymentInfo: CheckoutInput = {
  amount: 500000,
  bankCode: 'VCB',
  customerName: 'Nguyễn Văn A',
  email: 'a@onepay.vn',
  isDomestic: true,
};

// Gọi hàm – gọn, không sợ sai thứ tự!
checkout(paymentInfo);
```

</div>

---

# 🗂️ Mảng Object – Data Test cho nhiều case

<div style="text-align: left; font-size: 0.75em;">

### 💡 Kết hợp Array + Object = Sức mạnh thực sự!

```typescript
// Định nghĩa type
type PaymentCase = {
  refNo: string;
  amount: number;
  bankCode: string;
  expectedResult: 'success' | 'error';
};

// Mảng chứa nhiều bộ data test
const paymentTestData: PaymentCase[] = [
  { refNo: 'PAY-001', amount: 100000,  bankCode: 'VCB', expectedResult: 'success' },
  { refNo: 'PAY-002', amount: 200000,  bankCode: 'TCB', expectedResult: 'success' },
  { refNo: 'PAY-003', amount: 0,       bankCode: 'VCB', expectedResult: 'error' },
  { refNo: 'PAY-004', amount: -10000,  bankCode: 'VCB', expectedResult: 'error' },
  { refNo: 'PAY-005', amount: 500000,  bankCode: 'ACB', expectedResult: 'success' },
];

// Dùng vòng lặp để kiểm tra
for (const payment of paymentTestData) {
  if (payment.expectedResult === 'success') {
    console.log(`✅ ${payment.refNo} – OK`);
  } else {
    console.log(`❌ ${payment.refNo} – Expected Error`);
  }
}
```

</div>

<br>

> 🧠 **1 type + 1 mảng object + 1 vòng lặp = Test được N trường hợp!**

---

<!-- _class: default -->
# 🏋️ Phần 3: Thực hành tổng hợp

---

# 🏋️ Bài tập 4.1: Tạo Object thanh toán (10')

<div style="text-align: left; font-size: 0.8em;">

### 📋 Đề bài:

Tạo một object `paymentData` chứa đầy đủ thông tin thanh toán:

| Field | Kiểu | Ví dụ |
|-------|:----:|-------|
| `refNo` | `string` | `'PAY-20260709-001'` |
| `amount` | `number` | `500000` |
| `bankCode` | `string` | `'VCB'` |
| `customerName` | `string` | `'Nguyễn Văn A'` |
| `email` | `string` | `'a@onepay.vn'` |
| `isDomestic` | `boolean` | `true` |
| `products` | `string[]` | `['Sản phẩm A', 'Sản phẩm B']` |

Sau đó in ra console bằng **template string**:

```
📋 THÔNG TIN THANH TOÁN
Mã GD: PAY-20260709-001
Khách hàng: Nguyễn Văn A (a@onepay.vn)
Số tiền: 500.000đ – Qua ngân hàng: VCB
Loại: Nội địa
Sản phẩm: Sản phẩm A, Sản phẩm B
```

</div>

---

# 🏋️ Bài tập 4.2: Truyền Object vào hàm (10')

<div style="text-align: left; font-size: 0.8em;">

### 📋 Đề bài: Auto Tester viết sẵn hàm sau

```typescript
type CheckoutData = {
  refNo: string;
  amount: number;
  bankCode: string;
  customerName: string;
  isDomestic: boolean;
};

function processCheckout(data: CheckoutData): string {
  const fee = data.isDomestic ? data.amount * 0.01 : data.amount * 0.03;
  const finalAmount = data.amount - fee;
  return `${data.refNo}: ${data.customerName} nhận ${finalAmount.toLocaleString('vi-VN')}đ sau phí`;
}
```

### ✍️ Yêu cầu:
1. Tạo object `myCheckout: CheckoutData` với dữ liệu của bạn
2. Gọi `processCheckout(myCheckout)` và in kết quả
3. Tự thêm ít nhất **2 bộ data** khác nhau (nội địa + quốc tế) để thấy phí thay đổi

</div>

---

# 🏋️ Bài tập 4.3: Mảng Object data test (10')

<div style="text-align: left; font-size: 0.75em;">

### 📋 Đề bài: Cho type sau

```typescript
type PaymentCase = {
  refNo: string;
  amount: number;
  bankCode: string;
  expectedResult: 'success' | 'error';
};
```

### ✍️ Yêu cầu:
Tạo mảng `testCases: PaymentCase[]` chứa **ít nhất 5 bộ data**:
- 3 case `expectedResult: 'success'` (amount bình thường)
- 1 case `expectedResult: 'error'` (amount = 0)
- 1 case `expectedResult: 'error'` (amount âm)

Dùng `for...of` + `if...else` để phân loại và in:

```
✅ PAY-OK-001: 100.000đ – Expected: success
✅ PAY-OK-002: 200.000đ – Expected: success
✅ PAY-OK-003: 500.000đ – Expected: success
❌ PAY-ERR-001: 0đ – Expected: error
❌ PAY-ERR-002: -50.000đ – Expected: error
```

</div>

---

# 💡 Mẹo: Object – Những lỗi thường gặp

| 🔴 Lỗi | Nguyên nhân | ✅ Cách sửa |
|--------|------------|-----------|
| `Property 'xxx' does not exist on type...` | Gọi `.xxx` mà object không có key đó | Kiểm tra lại tên key cho đúng chính tả |
| `Type 'string' is not assignable to type 'number'` | Gán string cho field number trong type | Đảm bảo đúng kiểu dữ liệu field đó |
| `Property 'xxx' is missing...` | Thiếu field bắt buộc trong type | Thêm đầy đủ các field type yêu cầu |
| `Object is possibly 'undefined'` | Truy cập object lồng mà cha có thể undefined | Dùng `?.`: `obj?.child?.field` |

---

# 🏠 Bài tập về nhà

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.6em; text-align: left; font-size: 0.8em;">

<div style="background:#1565c0; border-radius:10px; padding:0.6em;">

### 📝 Bài 1: Định nghĩa type & tạo object

Định nghĩa type `CardData` gồm:
- `cardNumber: string`
- `cardHolder: string`
- `expiryDate: string`
- `cvv: string`
- `bankCode: string`
- `cardType: 'credit' | 'debit' | 'atm'`

Tạo 3 object `CardData` cho 3 loại thẻ khác nhau.

</div>

<div style="background:#2e7d32; border-radius:10px; padding:0.6em;">

### 📝 Bài 2: Mảng Object + Vòng lặp

Dùng type `CardData` từ bài 1, tạo mảng `cardList: CardData[]` chứa 3 thẻ.

Dùng `for...of` duyệt và in:

```
💳 1. 4111-****-****-1234 | VCB | credit
💳 2. 5111-****-****-5678 | TCB | debit
💳 3. 6111-****-****-9012 | ACB | atm
📊 Tổng: 3 thẻ
```

</div>

<div style="background:#e65100; border-radius:10px; padding:0.6em;">

### 📝 Bài 3: Object truyền vào hàm

Cho hàm có sẵn:

```typescript
function validateCard(card: CardData): string
```

Hàm kiểm tra:
- `expiryDate` đã quá hạn chưa? (giả sử card hết hạn nếu `expiryDate < '2027'`)
- `cardType` là `'credit'` hay `'debit'` hay `'atm'`?
- Trả về chuỗi mô tả: `"✅ Thẻ credit VCB còn hạn"` hoặc `"❌ Thẻ debit TCB đã hết hạn"`

Tự tạo 3 object `CardData` và gọi `validateCard()`.

</div>

</div>

<br>

<div class="small">

### 📁 Cách nộp bài:
- Tạo file `Result/buoi-04/bai-tap.ts` trong project
- Viết code 3 bài trên, push lên nhánh GitHub cá nhân

</div>

---

# 📋 Checklist – Sau buổi 4, bạn có thể:

<div style="text-align: left;">

- [ ] Tạo Object `{}` để gom nhóm dữ liệu test
- [ ] Truy cập giá trị trong Object bằng dấu chấm `.`
- [ ] Làm việc với Object lồng nhau (`obj.child.subchild`)
- [ ] Định nghĩa `type` để tạo "khuôn" cho Object
- [ ] Tạo mảng Object (`Type[]`) cho data-driven testing
- [ ] Truyền Object vào hàm thay vì truyền lẻ tham số

</div>

---

<!-- _class: lead -->
<!-- _paginate: skip -->

# 🎉 Hết Buổi 4

### Cảm ơn! 🙏

### Câu hỏi? 🤔

<p class="small">
📅 Buổi 5: Thực hành viết test case đầu tiên trên iPortal
</p>
