// Tạo cơ sở dữ liệu Quản lý vé xe bus bus_ticket_management
use("bus_ticket_management");

// 3001 Passengers: Lưu trữ thông tin cá nhân của hành khách
db.createCollection("passengers");
// 3002 Buses: Lưu trữ thông tin về các xe buýt như biển số, sức chứa, hãng sản xuất, mô hình, và năm sản xuất
db.createCollection("buses");
// 3003 Drivers: Lưu trữ thông tin về lái xe bao gồm tên, số giấy phép lái xe, số điện thoại, email, và địa chỉ
db.createCollection("drivers");
// 3004 Routes: Lưu trữ thông tin về các tuyến đường như số hiệu, điểm bắt đầu, điểm kết thúc, khoảng cách, và thời gian dự kiến
db.createCollection("routes");
// 3005 Tickets: Lưu trữ thông tin về vé như hành khách, xe buýt, tuyến đường, lái xe, số ghế, thời gian khởi hành, giá vé, và trạng thái
db.createCollection("tickets");

// Insert sample data
db.passengers.insertMany([
  {
    username: "chanh",
    password: "123",
    name: "Phan Lương Trung Chánh",
    email: "nguyenvana@example.com",
    phone: "0123456789",
    address: "123 Phan Dinh Phung, Hanoi",
    created_at: ISODate("2023-01-01T00:00:00Z"),
    updated_at: ISODate("2023-01-01T00:00:00Z"),
  },
  {
    username: "duy",
    password: "123",
    name: "Nguyen Minh Duy",
    email: "lethib@example.com",
    phone: "0987654321",
    address: "456 Tran Hung Dao, Ho Chi Minh City",
    created_at: ISODate("2023-01-02T00:00:00Z"),
    updated_at: ISODate("2023-01-02T00:00:00Z"),
  },
]);

db.buses.insertMany([
  {
    _id: ObjectId("60c72b3f9b1e8a5a2441d7a2"),
    // Biển số xe buýt
    bus_number: "29B-12345",
    // Số lượng hành khách mà xe buýt có thể chở
    capacity: 45,
    // Hãng sản xuất xe buýt
    make: "Hyundai",
    // Mô hình xe buýt
    model: "Universe",
    // Năm sản xuất xe buýt
    year: 2018,
    // Mảng chứa ID của các lái xe (liên kết tới Drivers)
    drivers: [
      ObjectId("60c72b4f9b1e8a5a2441d7a8"),
      ObjectId("60c72b4f9b1e8a5a2441d7a3"),
    ],
    // Ngày và giờ tạo bản ghi
    created_at: ISODate("2023-01-01T00:00:00Z"),
    // Ngày và giờ cập nhật bản ghi lần cuối
    updated_at: ISODate("2023-01-01T00:00:00Z"),
  },
  {
    _id: ObjectId("60c72b3f9b1e8a5a2441d7a7"),
    bus_number: "30A-67890",
    capacity: 50,
    make: "Toyota",
    model: "Coaster",
    year: 2020,
    drivers: [
      ObjectId("60c72b4f9b1e8a5a2441d7a3"),
      ObjectId("60c72b4f9b1e8a5a2441d7a8"),
    ],
    created_at: ISODate("2023-01-02T00:00:00Z"),
    updated_at: ISODate("2023-01-02T00:00:00Z"),
  },
]);

db.drivers.insertMany([
  {
    _id: ObjectId("60c72b4f9b1e8a5a2441d7a3"),
    // Tên của lái xe
    name: "Tran Van A",
    // Số giấy phép lái xe
    license_number: "123456789",
    // Số điện thoại của lái xe
    phone: "0987654321",
    // Email của lái xe
    email: "tranvanb@example.com",
    // Địa chỉ của lái xe
    address: "789 Le Loi, Da Nang",
    // Ngày và giờ tạo bản ghi
    created_at: ISODate("2023-01-01T00:00:00Z"),
    // Ngày và giờ cập nhật bản ghi lần cuối
    updated_at: ISODate("2023-01-01T00:00:00Z"),
  },
  {
    _id: ObjectId("60c72b4f9b1e8a5a2441d7a8"),
    name: "Pham Thi B",
    license_number: "987654321",
    phone: "0912345678",
    email: "phamthic@example.com",
    address: "321 Le Duan, Can Tho",
    created_at: ISODate("2023-01-02T00:00:00Z"),
    updated_at: ISODate("2023-01-02T00:00:00Z"),
  },
]);

db.routes.insertMany([
  {
    _id: ObjectId("60c72b5f9b1e8a5a2441d7a4"),
    // Số hiệu tuyến đường
    route_number: "R01",
    // Điểm bắt đầu của tuyến đường
    start_location: "Hanoi",
    // Điểm kết thúc của tuyến đường
    end_location: "Ho Chi Minh City",
    // Khoảng cách của tuyến đường (km)
    distance: 1700,
    // Thời gian dự kiến để hoàn thành tuyến đường (giờ)
    estimated_time: 30,
    buses: [
      ObjectId("60c72b3f9b1e8a5a2441d7a2"),
      ObjectId("60c72b3f9b1e8a5a2441d7a7"),
    ],
    // Ngày và giờ tạo bản ghi
    created_at: ISODate("2023-01-01T00:00:00Z"),
    // Ngày và giờ cập nhật bản ghi lần cuối
    updated_at: ISODate("2023-01-01T00:00:00Z"),
  },
  {
    _id: ObjectId("60c72b5f9b1e8a5a2441d7a9"),
    route_number: "R02",
    start_location: "Da Nang",
    end_location: "Hue",
    distance: 100,
    estimated_time: 2,
    buses: [
      ObjectId("60c72b3f9b1e8a5a2441d7a2"),
      ObjectId("60c72b3f9b1e8a5a2441d7a7"),
    ],
    created_at: ISODate("2023-01-02T00:00:00Z"),
    updated_at: ISODate("2023-01-02T00:00:00Z"),
  },
]);

db.tickets.insertMany([
  {
    _id: ObjectId("60c72b6f9b1e8a5a2441d7a5"),
    // ID của hành khách (liên kết tới Passengers)
    passenger_id: ObjectId("60c72b2f9b1e8a5a2441d7a1"),
    // ID của các xe buýt (liên kết tới Buses)
    bus_id: ObjectId("60c72b3f9b1e8a5a2441d7a2"),
    // ID của tuyến đường (liên kết tới Buses)
    route_id: ObjectId("60c72b5f9b1e8a5a2441d7a4"),
    // ID của các lái xe (liên kết tới Drivers)
    driver_id: ObjectId("60c72b4f9b1e8a5a2441d7a3"),
    // Số ghế của hành khách trên xe buýt
    seat_number: "A1",
    // Thời gian khởi hành của chuyến xe
    departure_time: ISODate("2023-01-10T08:00:00Z"),
    // Giá vé
    price: 500000,
    // Trạng thái vé (ví dụ: "booked", "cancelled", "completed")
    status: "booked",
    // Ngày và giờ tạo bản ghi
    created_at: ISODate("2023-01-01T00:00:00Z"),
    // Ngày và giờ cập nhật bản ghi lần cuối
    updated_at: ISODate("2023-01-01T00:00:00Z"),
  },
  {
    _id: ObjectId("60c72b6f9b1e8a5a2441d7aa"),
    passenger_id: ObjectId("60c72b2f9b1e8a5a2441d7a6"),
    bus_id: ObjectId("60c72b3f9b1e8a5a2441d7a7"),
    route_id: ObjectId("60c72b5f9b1e8a5a2441d7a4"),
    driver_id: ObjectId("60c72b4f9b1e8a5a2441d7a8"),
    seat_number: "B2",
    departure_time: ISODate("2023-01-11T10:00:00Z"),
    price: 100000,
    status: "booked",
    created_at: ISODate("2023-01-02T00:00:00Z"),
    updated_at: ISODate("2023-01-02T00:00:00Z"),
  },
]);
