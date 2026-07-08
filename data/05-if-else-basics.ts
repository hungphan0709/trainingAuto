/**
 * ============================================================
 * BUỔI 3 – DATA 05: If-Else – Rẽ nhánh điều kiện
 * ============================================================
 * Mục tiêu: Làm quen với câu lệnh if-else để kiểm tra điều kiện
 *
 * Chạy: npx tsx data/05-if-else-basics.ts
 */

// ═══════════════════════════════════════════════════════════
// 1. IF ĐƠN GIẢN – Kiểm tra 1 điều kiện
// ═══════════════════════════════════════════════════════════
const amountNumber: number = 100000;

console.log('🔀 1. IF ĐƠN GIẢN:');
if (amountNumber > 0) {
  console.log('   ✅ Số tiền hợp lệ');
}
// Nếu amount = 0 hoặc âm → không in gì cả

// ═══════════════════════════════════════════════════════════
// 2. IF...ELSE – 2 nhánh (Đúng làm A, Sai làm B)
// ═══════════════════════════════════════════════════════════
console.log('\n🔀 2. IF...ELSE:');

const transactionStatus: string = 'success';

if (transactionStatus === 'success') {
  console.log('   ✅ Giao dịch thành công – Hiển thị thông báo xanh');
} else {
  console.log('   ❌ Giao dịch thất bại – Hiển thị thông báo đỏ');
}

// ═══════════════════════════════════════════════════════════
// 3. IF...ELSE IF...ELSE – Nhiều nhánh
// ═══════════════════════════════════════════════════════════
console.log('\n🔀 3. IF...ELSE IF...ELSE:');

const paymentAmount: number = 5000000;

if (paymentAmount > 1000000) {
  console.log('   🔴 Giao dịch giá trị CAO – Cần phê duyệt thêm');
} else if (paymentAmount > 100000) {
  console.log('   🟡 Giao dịch giá trị TRUNG BÌNH');
} else if (paymentAmount > 0) {
  console.log('   🟢 Giao dịch giá trị THẤP');
} else {
  console.log('   ⚠️ Số tiền không hợp lệ (≤ 0)');
}

// ═══════════════════════════════════════════════════════════
// 4. SO SÁNH TRONG IF – Các phép so sánh
// ═══════════════════════════════════════════════════════════
console.log('\n🔀 4. CÁC PHÉP SO SÁNH:');

const age: number = 28;
const minAge: number = 18;

console.log(`   age === 28  → ${age === 28}`);       // true
console.log(`   age !== 18  → ${age !== 18}`);       // true
console.log(`   age > 18    → ${age > 18}`);         // true
console.log(`   age >= 18   → ${age >= minAge}`);    // true
console.log(`   age < 60    → ${age < 60}`);         // true
console.log(`   age <= 18   → ${age <= 18}`);        // false

// 💡 LƯU Ý: Luôn dùng === (3 dấu =), KHÔNG dùng == (2 dấu =)

// ═══════════════════════════════════════════════════════════
// 5. KẾT HỢP ĐIỀU KIỆN – && (VÀ) và || (HOẶC)
// ═══════════════════════════════════════════════════════════
console.log('\n🔀 5. KẾT HỢP ĐIỀU KIỆN:');

const userAmount: number = 200000;
const isActive: boolean = true;
const isVerified: boolean = true;

// && (VÀ): TẤT CẢ đều phải đúng
if (userAmount > 0 && isActive && isVerified) {
  console.log('   ✅ Có thể tạo giao dịch (đủ 3 điều kiện)');
} else {
  console.log('   ❌ Không thể tạo giao dịch (thiếu điều kiện)');
}

// || (HOẶC): CHỈ CẦN 1 cái đúng
const statusString: string = 'timeout';
if (statusString === 'error' || statusString === 'timeout') {
  console.log('   ❌ Giao dịch lỗi (error hoặc timeout)');
} else {
  console.log('   ✅ Giao dịch OK');
}

// ═══════════════════════════════════════════════════════════
// 6. VÍ DỤ THỰC TẾ – Phân loại đơn vị (Merchant)
// ═══════════════════════════════════════════════════════════
console.log('\n🔀 6. VÍ DỤ THỰC TẾ – Phân loại đơn vị:');

const merchantType: string = 'domestic';
const merchantFee: number = merchantType === 'domestic' ? 0.01 : 0.03;

console.log(`   Loại đơn vị: ${merchantType}`);
console.log(`   Phí giao dịch: ${merchantFee * 100}%`);

// Cách viết tường minh hơn:
if (merchantType === 'domestic') {
  console.log('   🏠 Đơn vị nội địa – Phí 1%');
} else if (merchantType === 'international') {
  console.log('   🌍 Đơn vị quốc tế – Phí 3%');
} else {
  console.log('   ❓ Loại đơn vị không xác định');
}

// ═══════════════════════════════════════════════════════════
// 7. VÍ DỤ THỰC TẾ – Kiểm tra giao dịch trước khi tạo
// ═══════════════════════════════════════════════════════════
console.log('\n🔀 7. VÍ DỤ THỰC TẾ – Kiểm tra giao dịch:');

function validateTransaction(amt: number, isDomestic: boolean, hasPromotion: boolean): string {
  if (amt <= 0) {
    return '❌ Số tiền phải lớn hơn 0';
  }

  if (amt > 100000000) {
    return '❌ Vượt hạn mức giao dịch (tối đa 100 triệu)';
  }

  let feeRate: number;
  if (isDomestic) {
    feeRate = 0.01;  // 1%
  } else {
    feeRate = 0.03;  // 3%
  }

  if (hasPromotion) {
    feeRate = feeRate / 2;  // Giảm 50% phí nếu có khuyến mãi
    return `✅ Giao dịch hợp lệ – Phí KM: ${(amt * feeRate).toLocaleString('vi-VN')}đ (${feeRate * 100}%)`;
  }

  return `✅ Giao dịch hợp lệ – Phí: ${(amt * feeRate).toLocaleString('vi-VN')}đ (${feeRate * 100}%)`;
}

console.log('   ', validateTransaction(5000000, true, false));   // Nội địa, không KM
console.log('   ', validateTransaction(5000000, true, true));    // Nội địa, có KM
console.log('   ', validateTransaction(5000000, false, false));  // Quốc tế, không KM
console.log('   ', validateTransaction(0, true, false));         // Số tiền = 0
console.log('   ', validateTransaction(200000000, true, false)); // Vượt hạn mức

console.log('\n✅ Hoàn thành bài học If-Else!');
