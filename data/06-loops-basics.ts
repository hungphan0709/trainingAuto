/**
 * ============================================================
 * BUỔI 3 – DATA 06: Vòng lặp – for...of & forEach
 * ============================================================
 * Mục tiêu: Làm quen với vòng lặp để duyệt danh sách dữ liệu test
 *
 * Chạy: npx tsx data/06-loops-basics.ts
 */

// ═══════════════════════════════════════════════════════════
// 1. VÒNG LẶP for...of – Duyệt từng phần tử trong mảng
// ═══════════════════════════════════════════════════════════
console.log('🔁 1. VÒNG LẶP for...of:');

const bankList: string[] = ['VCB', 'TCB', 'ACB', 'BIDV'];

console.log('   🏦 Danh sách ngân hàng:');
for (const bank of bankList) {
  console.log(`      - ${bank}`);
}
// Output:
//    - VCB
//    - TCB
//    - ACB
//    - BIDV

// ═══════════════════════════════════════════════════════════
// 2. for...of VỚI INDEX – Cần biết thứ tự
// ═══════════════════════════════════════════════════════════
console.log('\n🔁 2. for...of VỚI SỐ THỨ TỰ:');

const merchants: string[] = [
  'TEST ONEPAY',
  'TEST ONEPAY (Toàn Bộ Tài Khoản)',
  'TESTONEPAYTHB',
];

let index = 1;
for (const merchant of merchants) {
  console.log(`   ${index}. ${merchant}`);
  index++;
}

// ═══════════════════════════════════════════════════════════
// 3. forEach – Cách khác để duyệt mảng (có sẵn index)
// ═══════════════════════════════════════════════════════════
console.log('\n🔁 3. forEach – Duyệt mảng có index:');

const statusList: string[] = ['Thành công', 'Đang xử lý', 'Thất bại', 'Đã hủy'];

statusList.forEach((status, i) => {
  const emoji = status === 'Thành công' ? '✅' : status === 'Đang xử lý' ? '⏳' : '❌';
  console.log(`   ${i + 1}. ${emoji} ${status}`);
});

// ═══════════════════════════════════════════════════════════
// 4. VÒNG LẶP VỚI MẢNG OBJECT – Duyệt danh sách phức tạp
// ═══════════════════════════════════════════════════════════
console.log('\n🔁 4. VÒNG LẶP VỚI MẢNG OBJECT:');

const paymentList = [
  { refNo: 'PAY-001', amount: 100000, bankCode: 'VCB', status: 'success' },
  { refNo: 'PAY-002', amount: 200000, bankCode: 'TCB', status: 'success' },
  { refNo: 'PAY-003', amount: 500000, bankCode: 'VCB', status: 'pending' },
  { refNo: 'PAY-004', amount: 150000, bankCode: 'ACB', status: 'failed' },
];

console.log('   💳 Danh sách giao dịch:');
for (const payment of paymentList) {
  const emoji = payment.status === 'success' ? '✅' : payment.status === 'pending' ? '⏳' : '❌';
  console.log(`   ${emoji} ${payment.refNo} | ${payment.amount.toLocaleString('vi-VN')}đ | ${payment.bankCode} | ${payment.status}`);
}

// ═══════════════════════════════════════════════════════════
// 5. DATA-DRIVEN TEST – Tạo test case từ mảng dữ liệu
// ═══════════════════════════════════════════════════════════
console.log('\n🔁 5. DATA-DRIVEN PATTERN (Mẫu quan trọng nhất!):');

const searchKeywords: string[] = [
  'TEST ONEPAY',
  'Toàn Bộ Tài Khoản',
  'TESTONEPAYTHB',
];

console.log('   🔍 Các test case sẽ được tạo tự động:');
for (const keyword of searchKeywords) {
  console.log(`   📝 test('Tìm kiếm với từ khóa: "${keyword}"', ...)`);
  // Trong file .spec.ts thực tế:
  // test(`Tìm kiếm với từ khóa: "${keyword}"`, async ({ page }) => {
  //   await page.fill('input', keyword);
  //   await page.click('button');
  //   await expect(page.locator('.result')).toContainText(keyword);
  // });
}
console.log(`   📊 Tổng: ${searchKeywords.length} test case được tạo từ 1 vòng lặp!`);

// ═══════════════════════════════════════════════════════════
// 6. SO SÁNH for...of vs forEach
// ═══════════════════════════════════════════════════════════
console.log('\n🔁 6. SO SÁNH for...of VS forEach:');

const sampleList: string[] = ['A', 'B', 'C'];

console.log('   --- for...of ---');
for (const item of sampleList) {
  console.log(`   Phần tử: ${item}`);
}

console.log('   --- forEach ---');
sampleList.forEach((item, i) => {
  console.log(`   Phần tử ${i}: ${item}`);
});
// Kết luận: for...of đơn giản hơn, dùng cho test().
//           forEach có sẵn index, dùng cho console.log.

// ═══════════════════════════════════════════════════════════
// 7. ĐẾM & THỐNG KÊ TRONG VÒNG LẶP
// ═══════════════════════════════════════════════════════════
console.log('\n🔁 7. ĐẾM & THỐNG KÊ TRONG VÒNG LẶP:');

const transactionList = [
  { id: 'T001', amount: 100000, status: 'success' },
  { id: 'T002', amount: 50000,  status: 'success' },
  { id: 'T003', amount: 0,      status: 'failed' },
  { id: 'T004', amount: 200000, status: 'success' },
  { id: 'T005', amount: 30000,  status: 'failed' },
];

let successCount = 0;
let failedCount = 0;
let totalSuccessAmount = 0;

for (const txn of transactionList) {
  if (txn.status === 'success') {
    successCount++;
    totalSuccessAmount += txn.amount;
  } else {
    failedCount++;
  }
}

console.log(`   ✅ Giao dịch thành công: ${successCount}`);
console.log(`   ❌ Giao dịch thất bại:   ${failedCount}`);
console.log(`   💰 Tổng tiền thành công: ${totalSuccessAmount.toLocaleString('vi-VN')}đ`);

console.log('\n✅ Hoàn thành bài học Vòng lặp!');
