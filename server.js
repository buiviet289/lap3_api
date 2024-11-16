const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Khởi động server
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

// Kết nối MongoDB


const uri  = 'mongodb+srv://buiviet289:eTqrjaE5rjXFDHkw@cluster0.3pq0t.mongodb.net/md19304';


const mongoose = require('mongoose');
const CarModel = require('./carModel');

// Lấy danh sách xe
app.get('/', async(req, res) => {
    await mongoose.connect(uri);
    let cars = await CarModel.find();
    console.log(cars);
    res.send(cars);
});

//Tạo mới xe post
app.get('/add', async(req, res) => {
    await mongoose.connect(uri);
    let car = {
        ten: 'pottre',
        namSX: 2030,
        hang: 'THT1',
        gia: 1000
    }
    let kq = await CarModel.create(car);
    console.log(kq);
    res.send(cars);

   
});

// Xóa xe theo ID delete
app.get('/delete/:id', async(req, res) => {
    await mongoose.connect(uri);
    let id = req.params.id;
    console.log(`ID xe cần xóa: ${id}`);

    try {
        // Thực hiện xóa xe
        const result = await CarModel.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            res.status(404).send({ message: "Không tìm thấy xe với ID này" });
        } else {
            res.send({ message: "Xóa xe thành công", id });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Lỗi khi xóa xe", error });
    }
});

// Cập nhật xe theo ID put
app.get('/update/:id', async(req, res) => {
    await mongoose.connect(uri);
    let id = req.params.id;
    let updateData = req.body;

    console.log(`ID xe cần cập nhật: ${id}`);
    console.log(`Dữ liệu cập nhật:`, updateData);

    try {
        const result = await CarModel.updateOne({ _id: id }, updateData);
        if (result.matchedCount === 0) {
            res.status(404).send({ message: "Không tìm thấy xe với ID này" });
        } else {
            res.send({ message: "Cập nhật xe thành công", id });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Lỗi khi cập nhật xe", error });
    }
});