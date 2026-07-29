/**
 * ============================================================
 * Merchant Test Data – Dữ liệu test cho trang Merchant
 * ============================================================
 * Demo cách tổ chức data test:
 *   - Interface: định nghĩa "khuôn" dữ liệu
 *   - Mảng Object: nhiều bộ data test
 *   - Object đơn: data cho 1 test case cụ thể
 */

// ─── Định nghĩa kiểu dữ liệu ───
export interface MerchantData {
  name: string;
  taxCode: string;
  email: string;
  phone: string;
  address?: string;       // Dấu ? = optional (có cũng được, không có cũng được)
}

// ─── Danh sách đơn vị hợp lệ ───
export const validMerchants: MerchantData[] = [
  {
    name: 'TEST ONEPAY',
    taxCode: '0312345678',
    email: 'test@onepay.vn',
    phone: '0901234567',
    address: '123 Nguyễn Huệ, Q1, TP.HCM',
  },
  {
    name: 'MERCHANT ABC',
    taxCode: '0387654321',
    email: 'abc@merchant.vn',
    phone: '0909876543',
    address: '456 Lê Lợi, Q3, TP.HCM',
  },
  {
    name: 'TEST ONEPAY (Toàn Bộ Tài Khoản)',
    taxCode: '0319999999',
    email: 'full@onepay.vn',
    phone: '0905555555',
  },
];

// ─── Data cho test tìm kiếm (data-driven) ───
export const searchTestCases = [
  {
    testName: 'Tìm chính xác tên',
    keyword: 'TEST ONEPAY',
    expectedMinRows: 1,
    shouldContain: 'TEST ONEPAY',
  },
  {
    testName: 'Tìm với từ khóa chung',
    keyword: 'TEST',
    expectedMinRows: 1,       // TodoMVC demo: mỗi lần chỉ thêm 1 item
    shouldContain: 'TEST',
  },
  {
    testName: 'Tìm với từ khóa không tồn tại',
    keyword: 'XYZ_NOT_EXIST_999',
    expectedMinRows: 0,
    shouldContain: '',
  },
];

// ─── Data cho test thêm mới ───
export const newMerchant: MerchantData = {
  name: 'AUTO_TEST_MERCHANT',
  taxCode: '0300000001',
  email: 'auto@test.vn',
  phone: '0900000001',
};
