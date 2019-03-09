- Môi trường:
	- Cài composer: https://getcomposer.org/
	- Cài Laravel: composer global require "laravel/installer"
	- Cài XAMPP (ví dụ cài vào ổ C)

- Copy thư mục project vào thư mục C:\xampp\htdocs
- Chạy phpMyAdmin và tạo 1 db mới tên là social, sau đó import file social.sql
- Copy file .env vào thư mục project
- Điểu chỉnh các biến trong .env cho phù hợp:
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306 <Cổng của dịch vụ MySQL>
DB_DATABASE=social <Tên database vừa tạo>
DB_USERNAME=root <Tên username để truy cập database, mặc định là root>
DB_PASSWORD=<Password để truy cập database, mặc định để trống>

Lưu ý các biến facebook, google giữ nguyên

- Mở cmd tại thư mục project: 
	- Chạy lệnh "php artisan migrate" để sinh các bảng trong database
	- Sau khi chạy xong lệnh trên chạy lệnh "php artisan key:generate" (sinh key cho ứng dụng)
	- Chạy lệnh "npm install" (cài đặt các gói js cần thiết)
	- Mở file /resources/assets/js/app.js, trong thẻ BrowserRouter đặt basename="/social", sau đó chạy lệnh "npm run watch"
- Mở XAMPP và start service Apache và MySQL
- Mở trình duyệt, nhập vào ô địa chỉ: http://localhost/social


