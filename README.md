# Hệ Thống Quản Lý và Bán Vé Xe Bus

![Mô hình kiến trúc hạ tầng MVC](https://github.com/trungchanh2002/BTL_KTTKPM/blob/main/images/Duy_Chanh_PP.png)

## Giới Thiệu

Dự án "Hệ Thống Quản Lý và Bán Vé Xe Bus" là một nền tảng phục vụ việc quản lý và bán vé xe bus trực tuyến. Dự án này được thiết kế để cung cấp giải pháp tự động và tiện lợi cho quá trình mua bán vé, cũng như quản lý thông tin về hành khách, tuyến đường, xe bus và tài xế.

## Thành Viên Dự Án

- Phan Lương Trung Chánh
- Nguyễn Minh Duy

## Kiến Trúc Hệ Thống

Hệ thống được xây dựng dựa trên kiến trúc microservices và bao gồm các service sau:

### 1. `passengers-service`

Service quản lý thông tin hành khách, bao gồm đăng ký, cập nhật thông tin cá nhân và xem lịch sử mua vé.

### 2. `buses-service`

Service quản lý thông tin về các xe bus, bao gồm các thông tin về loại xe, số hiệu xe, và trạng thái hoạt động.

### 3. `drivers-service`

Service quản lý thông tin về tài xế, bao gồm thông tin cá nhân và lịch trình lái xe.

### 4. `routes-service`

Service quản lý thông tin về các tuyến đường, bao gồm điểm xuất phát và điểm đến, thời gian di chuyển dự kiến và khoảng cách.

### 5. `tickets-service`

Service quản lý quá trình bán vé, bao gồm tạo vé, lưu trữ thông tin vé và xác nhận thanh toán.

### 6. `mongodb-service`

Service quản lý lưu trữ dữ liệu sử dụng MongoDB.

### 7. `redis-service`

Service quản lý cache sử dụng Redis để tối ưu hóa hiệu suất của hệ thống.

### 8. `retry-service`

Service quản lý việc thực hiện retry khi xảy ra lỗi trong quá trình giao tiếp giữa các service.

### 9. `gateway-service`

Gateway chính của hệ thống, điều phối các yêu cầu đến các service tương ứng.

## Công Nghệ và Công Cụ Sử Dụng

- Node.js: Sử dụng để phát triển các service backend.
- JWT (JSON Web Tokens): Sử dụng để xác thực và bảo mật các yêu cầu giữa client và server.
- Redis: Sử dụng để quản lý cache.
- Rate Limiter: Sử dụng để hạn chế tần suất yêu cầu đến từ một nguồn cụ thể.
- Docker: Sử dụng để đóng gói và triển khai các service trong một môi trường độc lập.
- Docker Compose: Sử dụng để quản lý và chạy đồng thời nhiều container Docker.
- Jenkins và GitLab CI/CD: Sử dụng để tự động hóa quy trình triển khai và kiểm thử.
- Agile-Scrum: Sử dụng phương pháp Agile và Scrum trong quản lý dự án.

## Cài Đặt Và Chạy Thử

Mỗi service có thể được cài đặt và chạy độc lập. Chi tiết về cài đặt và yêu cầu hệ thống sẽ được cung cấp trong tài liệu của từng service cụ thể.

## Lưu Ý

- Đảm bảo rằng tất cả các service cần thiết đều đang chạy trước khi sử dụng hệ thống.
- Hãy tuân thủ các quy trình Agile và Scrum trong quá trình phát triển và quản lý dự án.
