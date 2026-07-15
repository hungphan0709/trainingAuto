/**
 * ============================================================
 * BUỔI 4 – DATA 10: Mảng Object – Data-driven testing
 * ============================================================
 * Mục tiêu: Kết hợp Array + Object để quản lý nhiều bộ data test
 *
 * Chạy: npx tsx data/10-array-object.ts
 */

// ═══════════════════════════════════════════════════════════
// 1. MẢNG OBJECT CƠ BẢN – Danh sách giao dịch
// ═══════════════════════════════════════════════════════════
console.log('🗂️ 1. MẢNG OBJECT CƠ BẢN:');

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
    console.log(`   ✅ ${payment.refNo}: ${payment.amount.toLocaleString('vi-VN')}đ – OK`);
  } else {
    console.log(`   ❌ ${payment.refNo}: ${payment.amount.toLocaleString('vi-VN')}đ – Expected Error`);
  }
}

// ═══════════════════════════════════════════════════════════
// 2. MẢNG OBJECT PHỨC TẠP – Data test cho tìm kiếm
// ═══════════════════════════════════════════════════════════
console.log('\n🗂️ 2. MẢNG OBJECT PHỨC TẠP:');

type MerchantSearchCase = {
  keyword: string;
  expectedResult: 'found' | 'not_found';
  expectedMerchantName?: string;
};

const searchTestCases: MerchantSearchCase[] = [
  {
    keyword: 'TEST ONEPAY',
    expectedResult: 'found',
    expectedMerchantName: 'TEST ONEPAY',
  },
  {
    keyword: 'TEST ONEPAY (Toàn Bộ Tài Khoản)',
    expectedResult: 'found',
    expectedMerchantName: 'TEST ONEPAY (Toàn Bộ Tài Khoản)',
  },
  {
    keyword: 'KHONG_TON_TAI_999',
    expectedResult: 'not_found',
  },
];

for (const testCase of searchTestCases) {
  if (testCase.expectedResult === 'found') {
    console.log(`   🔍 Tìm "${testCase.keyword}" → ✅ Tìm thấy: ${testCase.expectedMerchantName}`);
  } else {
    console.log(`   🔍 Tìm "${testCase.keyword}" → ❌ Không tìm thấy`);
  }
}

// ═══════════════════════════════════════════════════════════
// 3. THỐNG KÊ TỪ MẢNG OBJECT – Đếm & tính tổng
// ═══════════════════════════════════════════════════════════
console.log('\n🗂️ 3. THỐNG KÊ TỪ MẢNG OBJECT:');

let successCount = 0;
let errorCount = 0;
let totalSuccessAmount = 0;

for (const payment of paymentTestData) {
  if (payment.expectedResult === 'success') {
    successCount++;
    totalSuccessAmount += payment.amount;
  } else {
    errorCount++;
  }
}

console.log(`   📊 Tổng số case: ${paymentTestData.length}`);
console.log(`   ✅ Thành công: ${successCount}`);
console.log(`   ❌ Lỗi: ${errorCount}`);
console.log(`   💰 Tổng tiền thành công: ${totalSuccessAmount.toLocaleString('vi-VN')}đ`);

// ═══════════════════════════════════════════════════════════
// 4. FILTER – Lọc ra các case theo điều kiện
// ═══════════════════════════════════════════════════════════
console.log('\n🗂️ 4. FILTER – LỌC CASE:');

const successPayments = paymentTestData.filter(p => p.expectedResult === 'success');
const errorPayments = paymentTestData.filter(p => p.expectedResult === 'error');

console.log('   ✅ Các case thành công:');
for (const p of successPayments) {
  console.log(`      ${p.refNo}: ${p.amount.toLocaleString('vi-VN')}đ`);
}

console.log('   ❌ Các case lỗi:');
for (const p of errorPayments) {
  console.log(`      ${p.refNo}: ${p.amount.toLocaleString('vi-VN')}đ`);
}

console.log('\n✅ Hoàn thành bài học Mảng Object!');
