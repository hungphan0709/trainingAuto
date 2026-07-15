/**
 * ============================================================
 * BUỔI 4 – DATA 09: Type Annotation – "Khuôn" cho Object
 * ============================================================
 * Mục tiêu: Hiểu cách dùng type để định nghĩa khuôn dữ liệu
 *
 * Chạy: npx tsx data/09-type-annotation.ts
 */

// ═══════════════════════════════════════════════════════════
// 1. ĐỊNH NGHĨA TYPE – Tạo "khuôn" cho dữ liệu
// ═══════════════════════════════════════════════════════════
console.log('🏷️ 1. ĐỊNH NGHĨA TYPE:');

// Type = "khuôn đúc" – mọi object cùng khuôn sẽ có cấu trúc giống hệt nhau
type PaymentData = {
  refNo: string;
  amount: number;
  bankCode: string;
  description: string;
};

// Tạo object theo khuôn (thêm dấu `: PaymentData`)
const payment1: PaymentData = {
  refNo: 'PAY-001',
  amount: 100000,
  bankCode: 'VCB',
  description: 'Thanh toán đơn hàng 001',
};

const payment2: PaymentData = {
  refNo: 'PAY-002',
  amount: 250000,
  bankCode: 'TCB',
  description: 'Thanh toán đơn hàng 002',
};

// ❌ TypeScript sẽ báo lỗi nếu sai kiểu:
// const paymentWrong: PaymentData = {
//   refNo: 'PAY-003',
//   amount: 'abc',        // ❌ Type 'string' is not assignable to type 'number'
//   bankCode: 'VCB',
//   description: 'Test',
// };

console.log('   ✅ payment1:', payment1.refNo, '-', payment1.amount.toLocaleString('vi-VN'), 'đ');
console.log('   ✅ payment2:', payment2.refNo, '-', payment2.amount.toLocaleString('vi-VN'), 'đ');

// ═══════════════════════════════════════════════════════════
// 2. CÁC TYPE THƯỜNG DÙNG TRONG iPORTAL
// ═══════════════════════════════════════════════════════════
console.log('\n🏷️ 2. CÁC TYPE THƯỜNG DÙNG:');

// Type cho tìm kiếm đơn vị
type MerchantSearchData = {
  keyword: string;
  expectedResult: 'found' | 'not_found';
  expectedMerchantName?: string;  // Dấu ? = optional (có hoặc không)
};

// Type cho giao dịch thanh toán
type TransactionData = {
  refNo: string;
  amount: number;
  currency: 'VND' | 'USD';                   // Chỉ được 1 trong 2
  bankCode: string;
  cardType: 'domestic' | 'international' | 'wallet';
  expectedStatus: 'success' | 'pending' | 'failed';
};

// Tạo object theo type
const searchCase1: MerchantSearchData = {
  keyword: 'TEST ONEPAY',
  expectedResult: 'found',
  expectedMerchantName: 'TEST ONEPAY',
};

const searchCase2: MerchantSearchData = {
  keyword: 'KHONG_TON_TAI',
  expectedResult: 'not_found',
  // expectedMerchantName không cần vì có dấu ?
};

const txn1: TransactionData = {
  refNo: 'PAY-SUCCESS-001',
  amount: 100000,
  currency: 'VND',
  bankCode: 'VCB',
  cardType: 'domestic',
  expectedStatus: 'success',
};

console.log('   🔍 Search 1:', searchCase1.keyword, '→', searchCase1.expectedResult);
console.log('   🔍 Search 2:', searchCase2.keyword, '→', searchCase2.expectedResult);
console.log('   💳 Transaction:', txn1.refNo, '-', txn1.amount.toLocaleString('vi-VN'), txn1.currency);

// ═══════════════════════════════════════════════════════════
// 3. TRUYỀN OBJECT VÀO HÀM – Gọn gàng, không sợ sai thứ tự
// ═══════════════════════════════════════════════════════════
console.log('\n🏷️ 3. TRUYỀN OBJECT VÀO HÀM:');

// Định nghĩa type cho dữ liệu đầu vào
type CheckoutInput = {
  amount: number;
  bankCode: string;
  customerName: string;
  email: string;
  isDomestic: boolean;
};

function checkout(input: CheckoutInput): void {
  const fee = input.isDomestic ? input.amount * 0.01 : input.amount * 0.03;
  const finalAmount = input.amount - fee;
  console.log(`   ${input.customerName} thanh toán ${input.amount.toLocaleString('vi-VN')}đ qua ${input.bankCode}`);
  console.log(`   Phí: ${fee.toLocaleString('vi-VN')}đ (${input.isDomestic ? '1%' : '3%'})`);
  console.log(`   Thực nhận: ${finalAmount.toLocaleString('vi-VN')}đ`);
}

// Chuẩn bị data test
const paymentInfo: CheckoutInput = {
  amount: 500000,
  bankCode: 'VCB',
  customerName: 'Nguyễn Văn A',
  email: 'a@onepay.vn',
  isDomestic: true,
};

console.log('   📋 Giao dịch nội địa:');
checkout(paymentInfo);

console.log('\n   📋 Giao dịch quốc tế:');
const internationalPayment: CheckoutInput = {
  amount: 1000000,
  bankCode: 'VISA',
  customerName: 'Trần Thị B',
  email: 'b@onepay.vn',
  isDomestic: false,
};
checkout(internationalPayment);

console.log('\n✅ Hoàn thành bài học Type Annotation!');
