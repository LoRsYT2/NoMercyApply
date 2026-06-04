const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// 1. تشغيل الفرونت إيند (يجب أن يكون هذا أولاً ليعرض الملفات)
app.use(express.static(__dirname));

// 2. الاتصال بقاعدة البيانات
const mongoURI = process.env.MONGO_URI; 
if (!mongoURI) {
    console.error("❌ ERROR: MONGO_URI is not defined in environment variables!");
} else {
    mongoose.connect(mongoURI)
        .then(() => console.log('✅ Connected to MongoDB Atlas'))
        .catch(err => console.error('❌ MongoDB Connection Error:', err));
}

// 3. الموديل
const Application = mongoose.model('Application', new mongoose.Schema({}, { strict: false }));

// 4. مسارات استقبال البيانات
app.post('/api/apply/minecraft', async (req, res) => {
    try {
        const newApp = new Application({ type: 'minecraft', ...req.body });
        await newApp.save();
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/api/apply/discord', async (req, res) => {
    try {
        const newApp = new Application({ type: 'discord', ...req.body });
        await newApp.save();
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 5. التوجيه النهائي للفرونت إيند
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
