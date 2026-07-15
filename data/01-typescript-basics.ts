/**
 * ============================================================
 * BUỔI 1 & 2 – DATA 01: TypeScript cơ bản – Biến & Kiểu dữ liệu
 * ============================================================
 * Mục tiêu: Làm quen với khai báo biến TypeScript
 *
 * Chạy: npx tsx data/01-typescript-basics.ts
 */

// ═══════════════════════════════════════════════════════════
// 1. KIỂU STRING (chuỗi văn bản)
// ═══════════════════════════════════════════════════════════
const customerName: string = '10000';
const merchantCode: string = 'TEST_ONEPAY';
const bankCode: string = 'VCB';
const transactionRef: string = 'PAY20260630001';

console.log('📝 STRING:');
console.log('   Khách hàng:', customerName);
console.log('   Mã đơn vị:', merchantCode);
console.log('   Mã ngân hàng:', bankCode);
console.log('   Mã tham chiếu:', transactionRef);

// ═══════════════════════════════════════════════════════════
// 2. KIỂU NUMBER (số)
// ═══════════════════════════════════════════════════════════
const amount: number = 100000;           // Số tiền (VNĐ)
const feePercent: number = 0.05;          // Phí 5%
const quantity: number = 3;               // Số lượng
const exchangeRate: number = 25450.75;    // Tỉ giá

const totalAmount: number = amount * quantity;
const fee: number = totalAmount * feePercent;
const finalAmount: number = totalAmount + fee;

console.log('\n💰 NUMBER:');
console.log('   Đơn giá:', amount.toLocaleString('vi-VN'), 'VNĐ');
console.log('   Số lượng:', quantity);
console.log('   Tổng tiền:', totalAmount.toLocaleString('vi-VN'), 'VNĐ');
console.log('   Phí (5%):', fee.toLocaleString('vi-VN'), 'VNĐ');
console.log('   Thành tiền:', finalAmount.toLocaleString('vi-VN'), 'VNĐ');

// ═══════════════════════════════════════════════════════════
// 3. KIỂU BOOLEAN (đúng/sai)
// ═══════════════════════════════════════════════════════════
const isDomestic: boolean = true;         // Nội địa?
const isActive: boolean = true;           // Đang hoạt động?
const hasPromotion: boolean = false;      // Có khuyến mãi?

console.log('\n✅ BOOLEAN:');
console.log('   Nội địa:', isDomestic ? 'Có' : 'Không');
console.log('   Đang hoạt động:', isActive ? 'Có' : 'Không');
console.log('   Có khuyến mãi:', hasPromotion ? 'Có' : 'Không');

// ═══════════════════════════════════════════════════════════
// 4. const vs let
// ═══════════════════════════════════════════════════════════
const fixedValue: string = 'Giá trị không đổi';  // const = không gán lại
// fixedValue = 'Sẽ báo lỗi';                    // ❌ Lỗi nếu bỏ comment

let changeableValue: string = 'Có thể thay đổi'; // let = gán lại được
changeableValue = 'Đã thay đổi giá trị';          // ✅ OK

console.log('\n🔄 const vs let:');
console.log('   const:', fixedValue);
console.log('   let (cũ):', 'Có thể thay đổi');
console.log('   let (mới):', changeableValue);

// ═══════════════════════════════════════════════════════════
// 5. TEMPLATE STRING – Nối chuỗi kiểu mới (dùng backtick `)
// ═══════════════════════════════════════════════════════════
const summary: string = `
📋 TÓM TẮT GIAO DỊCH
─────────────────────────────────
Mã tham chiếu : ${transactionRef}
Khách hàng    : ${customerName}
Đơn vị        : ${merchantCode}
Số tiền       : ${amount.toLocaleString('vi-VN')} VNĐ
Loại          : ${isDomestic ? 'Nội địa' : 'Quốc tế'}
Trạng thái    : ${isActive ? 'Đang hoạt động' : 'Tạm khóa'}
─────────────────────────────────
`;

console.log(summary);
