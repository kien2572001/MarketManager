/**
 * Created by Syed Afzal
 */
require("./config/config");

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");
const app = express();
const seeder = require('./db/seeds/fake_seed')
const fileUpload = require('express-fileupload');

const fs = require('fs');

//const seeder = require("./db/seeds/real_seed");

//connection from db here
db.connect(app);
// seeder.seedData();

require("./models/userModel");

const allowedOrigins = ['http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Đảm bảo có withCredentials ở đây
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());

app.post('/api/upload', (req, res) => {
  if (!req.files || !req.body.model) {
    return res.status(400).send('No files or model were uploaded.');
  }

  const image = req.files.image;
  const model = req.body.model;

  if (!['image/png', 'image/jpeg', 'image/jpg'].includes(image.mimetype)) {
    return res.status(400).send('Invalid file type. Please upload a valid image file.');
  }

  // Tạo đường dẫn thư mục dựa trên tên model (nếu thư mục không tồn tại)
  const uploadDirectory = path.join(__dirname, 'public', 'images', model);
  if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
  }

  // Lưu tệp hình ảnh vào thư mục tương ứng với tên model và đổi tên tệp
  const imageName = `${Date.now()}_${image.name}`;
  const imagePath = path.join(uploadDirectory, imageName);

  image.mv(imagePath, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.status(200).send({
      message: 'File uploaded successfully',
      url: `http://localhost:3001/images/${model}/${imageName}`,
    });
  });
});



const imageDir = path.join(__dirname, 'public', 'images');

// Endpoint để xóa ảnh dựa trên URL trong body
app.delete('/api/upload', (req, res) => {
  const imageUrlFromBody = req.body.imageUrl;

  if (!imageUrlFromBody) {
    res.status(400).json({ message: 'URL ảnh không được cung cấp trong yêu cầu.' });
    return;
  }

  // Trích xuất tên tệp hình ảnh từ URL
  const imageUrlParts = imageUrlFromBody.split('/');
  const imageFileName = imageUrlParts[imageUrlParts.length - 1];
  const imageModelName = imageUrlParts[imageUrlParts.length - 2];

  // Xây dựng đường dẫn đầy đủ đến tệp hình ảnh
  const imagePath = path.join(imageDir, imageModelName, imageFileName);

  // Kiểm tra xem tệp hình ảnh tồn tại
  if (fs.existsSync(imagePath)) {
    // Xóa tệp hình ảnh
    fs.unlinkSync(imagePath);
    console.log(`Đã xóa tệp hình ảnh: ${imagePath}`);
    res.status(200).json({ message: 'Xóa tệp hình ảnh thành công' });
  } else {
    console.log(`Tệp hình ảnh không tồn tại: ${imagePath}`);
    res.status(404).json({ message: 'Tệp hình ảnh không tồn tại' });
  }
});

const options = require("./config/swagger.options");

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

//  adding routes
require("./routes")(app);

app.on("ready", () => {
  app.listen(3000, () => {
    console.log("Server is up on port", 3000);
  });
});

module.exports = app;
