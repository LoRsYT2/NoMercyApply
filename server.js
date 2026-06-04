const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. برمجيات وسيطة (Middleware)
app.use(cors());
app.use(express.json());

// جعل السيرفر يقرأ ملفات الواجهة (HTML, CSS, JS) تلقائياً
app.use(express.static(path.join(__dirname)));

// 2. الاتصال بقاعدة بيانات MongoDB Atlas لـ NoMercy
const mongoURI = process.env.MONGO_URI || "mongodb+srv://username:password@cluster.mongodb.net/NoMercyDB";
mongoose.connect(mongoURI)
    .then(() => console.log('✅ Connected to MongoDB Atlas / Compass'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// 3. تصميم الـ Schema والموديل لحفظ الطلبات
const applicationSchema = new mongoose.Schema({
    type: String, // 'minecraft' أو 'discord'
    ign: String,
    discordTag: String,
    age: Number,
    submittedAt: { type: Date, default: Date.now }
}, { strict: false }); // استقبال كافة الحقول من الفورم تلقائياً

const Application = mongoose.model('Application', applicationSchema);

// 4. مسارات الـ API لاستقبل الطلبات وحفظها
app.post('/api/apply/minecraft', async (req, res) => {
    try {
        const newApp = new Application({
            type: 'minecraft',
            ...req.body
        });
        await newApp.save();
        res.status(200).json({ success: true, message: 'تم حفظ طلب الماين كرافت بنجاح!' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/api/apply/discord', async (req, res) => {
    try {
        const newApp = new Application({
            type: 'discord',
            ...req.body
        });
        await newApp.save();
        res.status(200).json({ success: true, message: 'تم حفظ طلب الديسكورد بنجاح!' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 🟢 التعديل والإصلاح هنا: تغيير '*' إلى '/*' ليتوافق مع Express الجديد ويفتح الفرونت إيند 🟢
// بدلاً من استخدام app.get('/*', ...)، استخدم هذا السطر فقط:
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
