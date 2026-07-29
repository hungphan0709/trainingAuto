# 📦 POM Demo – Cấu trúc thư mục

Đây là cấu trúc POM (Page Object Model) mẫu để học viên tham khảo.

```
lib/
├── pages/
│   ├── base.page.ts         ← Class cha – method dùng chung
│   ├── login.page.ts        ← Page Object: Trang Login
│   └── merchant.page.ts     ← Page Object: Trang Merchant
├── fixtures/                 ← (sẽ học sau) Login auto, setup...
└── utils/                    ← (sẽ học sau) Hàm tiện ích

data/
└── merchant.data.ts          ← Data test: Object, Array

tests/
└── demo-pom/
    └── merchant-search.spec.ts  ← Demo: Test gọi POM
```

## 🧠 Nguyên lý

| File | Vai trò | Ai viết? |
|------|---------|----------|
| `base.page.ts` | Class cha – chứa method DÙNG CHUNG (`waitForPageLoad`, `takeScreenshot`...) | Auto Tester |
| `login.page.ts` | Locator + Method cho trang Login | Auto Tester |
| `merchant.page.ts` | Locator + Method cho trang Merchant | Auto Tester |
| `merchant.data.ts` | Định nghĩa data test (Object, Array) | Manual + Auto |
| `merchant-search.spec.ts` | Test case – CHỈ GỌI method POM, KHÔNG đụng selector | Manual Tester |

## ▶️ Cách chạy demo

```bash
# Chạy demo test
npx playwright test tests/demo-pom/merchant-search.spec.ts

# Chạy có hiển thị browser
npx playwright test tests/demo-pom/merchant-search.spec.ts --headed

# Chạy 1 test cụ thể
npx playwright test -g "TC01" tests/demo-pom/
```

## 🔑 Điểm cần nhớ

1. **POM = Gom selector + method vào 1 class** → Tránh lặp code
2. **Kế thừa `BasePage`** → Dùng chung method (`extends BasePage`)
3. **Test chỉ gọi method POM** → Không viết selector trong test
4. **Data test tách riêng** → Dễ thay đổi, dễ tái sử dụng
