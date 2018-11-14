<?php


return [
    'status' => [
        0 => 'Giao dịch ở trạng thái khởi tạo',
        1 => 'Thực hiện thanh toán thành công với đơn hàng',
        7 => 'Giao dịch review, kiểm tra lại giao dịch',
        -9 => 'Bạn tự hủy giao dịch',
        -3 => 'Quản trị viên VTC hủy giao dịch',
        -1 => 'Giao dịch thất bại',
        -4 => 'Thẻ/tài khoản không đủ điều kiện giao dịch (Đang bị khóa, chưa đăng ký thanh toán online …',
        -5 => 'Số dư không đủ để thực hiện giao dịch',
        -6 => 'Lỗi giao dịch tại VTC',
        -7 => 'Nhập sai thông tin thanh toán ( Sai thông tin tài khoản hoặc sai OTP)',
        -8 => 'Quá hạn mức giao dịch trong ngày',
        -22 => 'Số tiền thanh toán đơn hàng quá nhỏ',
        -24 => 'Đơn vị tiền tệ thanh toán đơn hàng không hợp lệ',
        -25 => 'Tài khoản VTC Pay nhận tiền của Merchant không tồn tại',
        -28 => 'Thiếu tham số bắt buộc phải có trong một đơn hàng thanh toán online',
        -29 => 'Tham số request không hợp lệ',
        -23 => 'WebsiteID không tồn tại',
//    '-21' => 'Trùng mã giao dịch, Có thể do xử lý duplicate không tốt nên mạng chậm hoặc khách hàng nhấn F5 bị, hoặc cơ chế sinh mã GD của đối tác không tốt nên sinh bị trùng, đối tác cần kiểm tra lại để biết kết quả cuối cùng của giao dịch này',
    ],

];