const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

const PORT = 3000;
const filePath = './cars.json';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Arabaları JSON dosyasına kaydet
app.post('/add-car', (req, res) => {
    const newCar = req.body;
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Dosya okunamadı:', err);
            return res.status(500).send('Sunucu hatası.');
        }
        const cars = JSON.parse(data || '[]');
        cars.push(newCar);
        fs.writeFile(filePath, JSON.stringify(cars, null, 2), (err) => {
            if (err) {
                console.error('Dosya yazılamadı:', err);
                return res.status(500).send('Sunucu hatası.');
            }
            res.status(200).send('Araba başarıyla kaydedildi!');
        });
    });
});

// Arabaları JSON dosyasından oku
app.get('/cars', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Dosya okunamadı:', err);
            return res.status(500).send('Sunucu hatası.');
        }
        res.json(JSON.parse(data || '[]'));
    });
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor: http://localhost:${PORT}`);
});
