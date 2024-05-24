FROM node:18-alpine
# Đường dẫn tới thư mục làm việc
WORKDIR /the/workdir/path
# Copy file package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./
# Cài đặt các package cần thiết
RUN npm install
# Cài đặt nodemon
RUN npm install -g nodemon
# Copy tất cả các file trong thư mục hiện tại vào thư mục làm việc
COPY . .
# Chạy lệnh build
RUN chmod -R 755 /the/workdir/path
# Mở cổng 3000
EXPOSE 3006
# Chạy ứng dụng
CMD ["nodemon", "index.js"]

# docker build --tag car-docker . 
# docker run -p 3001:3001 -d car-docker