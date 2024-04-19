
# KIẾN TRÚC VÀ THIẾT KẾ PHẦN MỀM
# Hệ Thống Quản Lý Vé Xe
![Mô hình kiến trúc hạ tầng MVC](https://github.com/trungchanh2002/BTL_KTTKPM/blob/main/images/Duy_Chanh_PP.png)

## Giới Thiệu
Dự án "Hệ Thống Quản Lý Vé Xe" được phát triển nhằm mục đích cung cấp một giải pháp hiệu quả và tiện lợi cho việc mua bán và quản lý vé xe. Hệ thống này được thiết kế để phục vụ các doanh nghiệp vận tải và khách hàng cá nhân, giúp tự động hóa quy trình từ việc đăng ký, đăng nhập, mua vé, quản lý vé cho đến quản lý thông tin khách hàng và nhân viên.

## Thành Viên Dự Án
- Phan Lương Trung Chánh
- Nguyễn Minh Duy

## Kiến Trúc Hệ Thống
Hệ thống bao gồm các service chính sau đây, được triển khai dựa trên kiến trúc microservices:

### 1. `api-gateway`
Gateway chính của hệ thống, điều phối các yêu cầu đến các service khác. Là điểm tiếp nhận duy nhất từ phía người dùng và phân phối các yêu cầu tương ứng tới các service phù hợp.

### 2. `customer`
Service quản lý thông tin khách hàng, bao gồm đăng ký, cập nhật thông tin cá nhân và xem lịch sử mua vé.

### 3. `discovery-service`
Service phục vụ việc khám phá và đăng ký các microservices khác. Sử dụng Eureka Server hoặc một giải pháp tương tự để quản lý các instance của service trong hệ thống.

### 4. `jwt`
Service này cung cấp các chức năng liên quan đến xác thực và phát hành JSON Web Tokens (JWT) để bảo mật các yêu cầu giữa client và server.

### 5. `login-service`
Xử lý chức năng đăng nhập cho hệ thống, bao gồm xác thực thông tin người dùng và phát hành token cho các phiên đăng nhập thành công.

### 6. `rateLimiter`
Service được thiết kế để hạn chế tần suất yêu cầu đến từ một nguồn cụ thể, giúp tránh quá tải hệ thống và tấn công DOS.

### 7. `register-service`
Quản lý việc đăng ký người dùng mới vào hệ thống, bao gồm xác minh thông tin và kích hoạt tài khoản.

### 8. `staff`
Service quản lý thông tin và các nhiệm vụ của nhân viên vận tải, từ việc cập nhật thông tin cá nhân đến quản lý lịch trình công tác và các phân quyền trong hệ thống.

### 9. `ticket`
Service quản lý việc tạo và lưu trữ vé, cho phép khách hàng mua và truy xuất vé điện tử.

### 10. `ticketManagement`
Service này cung cấp các chức năng quản lý vé chi tiết, bao gồm thay đổi, hủy vé và theo dõi tình trạng sử dụng vé.

## Công Nghệ Sử Dụng
- Spring Boot: Để phát triển các microservices.
- Spring Cloud: Cho các chức năng discovery và configuration.
- MariaDB: Lưu trữ dữ liệu người dùng, vé, và các thông tin khác.
- RabbitMQ/Kafka: Để xử lý các yêu cầu bất đồng bộ giữa các services.
- Docker/Kubernetes: Để đóng gói và triển khai hệ thống.

## Cài Đặt Và Chạy Thử
Mỗi service có thể được cài đặt và chạy riêng rẽ. Chi tiết về cài đặt và các yêu cầu hệ thống sẽ được cung cấp trong tài liệu từng service cụ thể.

## Lưu Ý
Đảm bảo rằng tất cả các service cần thiết đều đang chạy trước khi bắt đầu sử dụng hệ thống.
