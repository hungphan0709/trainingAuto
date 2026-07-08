/**
 * ============================================================
 * BUỔI 3 – DATA 07: Bài tập thực hành If-Else + Vòng lặp
 * ============================================================
 * Mục tiêu: Kết hợp if-else và vòng lặp để xử lý dữ liệu test
 *
 * Chạy: npx tsx data/07-if-else-loops-practice.ts
 */

// ═══════════════════════════════════════════════════════════
// BÀI 1: If-Else – Phân loại giao dịch theo giá trị
// ═══════════════════════════════════════════════════════════
console.log('📝 BÀI 1: PHÂN LOẠI GIAO DỊCH THEO GIÁ TRỊ');
console.log('─'.repeat(50));

const transactions = [
  { id: 'GD001', amount: 5000000 },
  { id: 'GD002', amount: 500000 },
  { id: 'GD003', amount: 50000 },
  { id: 'GD004', amount: 0 },
];

for (const txn of transactions) {
  let category: string;

  if (txn.amount > 1000000) {
    category = '🔴 Giao dịch giá trị CAO';
  } else if (txn.amount > 100000) {
    category = '🟡 Giao dịch giá trị TRUNG BÌNH';
  } else if (txn.amount > 0) {
    category = '🟢 Giao dịch giá trị THẤP';
  } else {
    category = '⚠️  Giao dịch KHÔNG hợp lệ (số tiền = 0)';
  }

  console.log(`   ${txn.id}: ${category}`);
}

// ═══════════════════════════════════════════════════════════
// BÀI 2: Vòng lặp – In danh sách ngân hàng
// ═══════════════════════════════════════════════════════════
console.log('\n📝 BÀI 2: IN DANH SÁCH NGÂN HÀNG');
console.log('─'.repeat(50));

const banks = [
  { code: 'VCB', name: 'Vietcombank' },
  { code: 'TCB', name: 'Techcombank' },
  { code: 'ACB', name: 'Á Châu Bank' },
  { code: 'BIDV', name: 'BIDV' },
];

let bankCount = 0;
for (const bank of banks) {
  bankCount++;
  console.log(`   🏦 ${bankCount}. ${bank.code} – ${bank.name}`);
}
console.log(`   📊 Tổng số: ${bankCount} ngân hàng`);

// ═══════════════════════════════════════════════════════════
// BÀI 3: Vòng lặp + If-Else – Lọc giao dịch thành công
// ═══════════════════════════════════════════════════════════
console.log('\n📝 BÀI 3: LỌC GIAO DỊCH THÀNH CÔNG & HỢP LỆ');
console.log('─'.repeat(50));

const paymentList = [
  { refNo: 'PAY-001', amount: 200000,  status: 'success' },
  { refNo: 'PAY-002', amount: 0,       status: 'pending' },
  { refNo: 'PAY-003', amount: 500000,  status: 'success' },
  { refNo: 'PAY-004', amount: 150000,  status: 'failed' },
  { refNo: 'PAY-005', amount: -50000,  status: 'error' },
];

for (const payment of paymentList) {
  // Chỉ xử lý giao dịch thành công
  if (payment.status === 'success') {
    // Kiểm tra thêm amount có hợp lệ không
    if (payment.amount > 0) {
      console.log(`   ✅ ${payment.refNo}: ${payment.amount.toLocaleString('vi-VN')}đ – Thành công & Hợp lệ`);
    } else {
      console.log(`   ⚠️  ${payment.refNo}: ${payment.amount.toLocaleString('vi-VN')}đ – Thành công nhưng amount BẤT THƯỜNG`);
    }
  }
}

// ═══════════════════════════════════════════════════════════
// BÀI 4: If-Else phân loại tuổi
// ═══════════════════════════════════════════════════════════
console.log('\n📝 BÀI 4: PHÂN LOẠI TUỔI');
console.log('─'.repeat(50));

function classifyAge(age: number): string {
  if (age < 18) {
    return '👶 Trẻ em';
  } else if (age <= 60) {
    return '🧑 Người lớn';
  } else {
    return '👴 Người cao tuổi';
  }
}

const ages = [15, 30, 65];
for (const age of ages) {
  console.log(`   Tuổi ${age}: ${classifyAge(age)}`);
}

// ═══════════════════════════════════════════════════════════
// BÀI 5: Vòng lặp in bảng cửu chương
// ═══════════════════════════════════════════════════════════
console.log('\n📝 BÀI 5: BẢNG CỬU CHƯƠNG 5');
console.log('─'.repeat(50));

const baseNumber: number = 5;
for (let i = 1; i <= 10; i++) {
  console.log(`   ${baseNumber} x ${i} = ${baseNumber * i}`);
}

// ═══════════════════════════════════════════════════════════
// BÀI 6: Vòng lặp + If-Else kiểm tra số dương/âm/không
// ═══════════════════════════════════════════════════════════
console.log('\n📝 BÀI 6: KIỂM TRA SỐ DƯƠNG / ÂM / KHÔNG');
console.log('─'.repeat(50));

const numbers: number[] = [3, 7, -2, 0, 12, -8, 5];

for (const num of numbers) {
  if (num > 0) {
    console.log(`   ✅ ${num} là số DƯƠNG`);
  } else if (num < 0) {
    console.log(`   ❌ ${num} là số ÂM`);
  } else {
    console.log(`   ⏺  ${num} là số KHÔNG`);
  }
}

// ═══════════════════════════════════════════════════════════
// BÀI 7: Function kiểm tra amount hợp lệ + test với mảng
// ═══════════════════════════════════════════════════════════
console.log('\n📝 BÀI 7: FUNCTION KIỂM TRA AMOUNT HỢP LỆ');
console.log('─'.repeat(50));

function isValidAmount(amount: number): boolean {
  // Cách 1: Dùng return trực tiếp
  return amount > 0;

  // Cách 2: Dùng if-else (tường minh hơn, dễ hiểu hơn)
  // if (amount > 0) {
  //   return true;
  // } else {
  //   return false;
  // }
}

const testAmounts: number[] = [100000, 0, -50000, 200000, -1];

for (const amt of testAmounts) {
  const valid = isValidAmount(amt);
  const emoji = valid ? '✅' : '❌';
  console.log(`   ${emoji} Amount ${amt.toLocaleString('vi-VN')}đ → ${valid ? 'HỢP LỆ' : 'KHÔNG HỢP LỆ'}`);
}

// ═══════════════════════════════════════════════════════════
// BÀI 8 (NÂNG CAO): Tạo báo cáo tổng hợp từ mảng dữ liệu
// ═══════════════════════════════════════════════════════════
console.log('\n📝 BÀI 8 (NÂNG CAO): BÁO CÁO TỔNG HỢP GIAO DỊCH');
console.log('─'.repeat(50));

const reportData = [
  { merchant: 'TEST ONEPAY', txns: 15, totalAmount: 7500000, status: 'active' },
  { merchant: 'ONEPAY THB',  txns: 8,  totalAmount: 3200000, status: 'active' },
  { merchant: 'TEST MART',   txns: 0,  totalAmount: 0,       status: 'inactive' },
  { merchant: 'DEMO SHOP',   txns: 25, totalAmount: 15000000, status: 'active' },
];

console.log('   📊 BÁO CÁO GIAO DỊCH THEO ĐƠN VỊ');
console.log('   ─────────────────────────────────');

let grandTotal = 0;
let grandTxns = 0;

for (const item of reportData) {
  // Phân loại merchant
  let level: string;
  if (item.totalAmount > 10000000) {
    level = '🔴 VIP';
  } else if (item.totalAmount > 5000000) {
    level = '🟡 THƯỜNG';
  } else if (item.totalAmount > 0) {
    level = '🟢 NHỎ';
  } else {
    level = '⚪ CHƯA GD';
  }

  console.log(`   ${level} ${item.merchant}: ${item.txns} giao dịch, ${item.totalAmount.toLocaleString('vi-VN')}đ`);

  grandTotal += item.totalAmount;
  grandTxns += item.txns;
}

console.log('   ─────────────────────────────────');
console.log(`   📊 TỔNG CỘNG: ${grandTxns} giao dịch, ${grandTotal.toLocaleString('vi-VN')}đ`);

console.log('\n✅ Hoàn thành tất cả bài tập Buổi 3!');
