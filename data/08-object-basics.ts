/**
 * ============================================================
 * BUỔI 4 – DATA 08: Object cơ bản – Gom nhóm dữ liệu
 * ============================================================
 * Mục tiêu: Hiểu cách tạo Object và truy cập giá trị
 *
 * Chạy: npx tsx data/08-object-basics.ts
 */

// ═══════════════════════════════════════════════════════════
// 1. OBJECT CƠ BẢN – Tạo 1 object chứa thông tin giao dịch
// ═══════════════════════════════════════════════════════════
console.log('📦 1. OBJECT CƠ BẢN:');

const payment = {
  refNo: 'PAY-20260714-001',
  amount: 500000,
  bankCode: 'VCB',
  customerName: 'Nguyễn Văn A',
  email: 'a@onepay.vn',
  isDomestic: true,
};

// Truy cập từng giá trị bằng dấu chấm `.`
console.log('   Mã GD:', payment.refNo);
console.log('   Khách hàng:', payment.customerName);
console.log('   Email:', payment.email);
console.log('   Số tiền:', payment.amount.toLocaleString('vi-VN'), 'VNĐ');
console.log('   Ngân hàng:', payment.bankCode);
console.log('   Loại:', payment.isDomestic ? 'Nội địa' : 'Quốc tế');

// ═══════════════════════════════════════════════════════════
// 2. OBJECT LỒNG NHAU – Object chứa Object bên trong
// ═══════════════════════════════════════════════════════════
console.log('\n📦 2. OBJECT LỒNG NHAU:');

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
    domesticCard: true,
    internationalCard: false,
    wallet: true,
  },
};

// Truy cập object lồng nhau bằng cách nối dấu chấm `.`
console.log('   Mã đơn vị:', merchant.code);
console.log('   Tên:', merchant.name);
console.log('   Trạng thái:', merchant.status);
console.log('   Email:', merchant.contact.email);
console.log('   SĐT:', merchant.contact.phone);
console.log('   Địa chỉ:', merchant.contact.address);
console.log('   Thẻ nội địa:', merchant.config.domesticCard ? '✅' : '❌');
console.log('   Thẻ quốc tế:', merchant.config.internationalCard ? '✅' : '❌');
console.log('   Ví điện tử:', merchant.config.wallet ? '✅' : '❌');

// ═══════════════════════════════════════════════════════════
// 3. TEMPLATE STRING VỚI OBJECT – In đẹp
// ═══════════════════════════════════════════════════════════
console.log('\n📦 3. TEMPLATE STRING VỚI OBJECT:');

const summary = `
📋 THÔNG TIN GIAO DỊCH
─────────────────────────────────
Mã tham chiếu : ${payment.refNo}
Khách hàng    : ${payment.customerName}
Email         : ${payment.email}
Số tiền       : ${payment.amount.toLocaleString('vi-VN')} VNĐ
Ngân hàng     : ${payment.bankCode}
Loại          : ${payment.isDomestic ? 'Nội địa' : 'Quốc tế'}
─────────────────────────────────
`;

console.log(summary);

console.log('\n✅ Hoàn thành bài học Object cơ bản!');
