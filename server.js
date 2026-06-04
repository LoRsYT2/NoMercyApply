// ==========================================
// 1. استدعاء المكتبات والـ Middleware
// ==========================================
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// تفعيل الحماية والسماح للفرونت إيند بإرسال البيانات للسيرفر بدون مشاكل CORS
app.use(cors());
// تفعيل قراءة البيانات القادمة بصيغة JSON من صفحات الـ HTML
app.use(express.json());

// ==========================================
// 2. الاتصال بقاعدة بيانات MongoDB
// ==========================================
// تأكد من إضافة المتغير MONGODB_URI في إعدادات البيئة (Environment Variables) على Render
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/NoMercyApply';

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected successfully to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// ==========================================
// 3. موديلات قاعدة البيانات (Schemas)
// ==========================================

// أ. موديل طلبات الديسكورد
const DiscordApplySchema = new mongoose.Schema({
    username: { type: String, required: true },
    id: { type: String, required: true },
    age: { type: Number, required: true },
    reason: { type: String, required: true },
    experience: { type: String, required: true },
    status: { type: String, default: 'Pending' }, // الحالات: Pending, Accepted, Rejected
    appliedAt: { type: Date, default: Date.now }
});
const DiscordApply = mongoose.model('DiscordApply', DiscordApplySchema);

// ب. موديل طلبات الماين كرافت (الـ 22 سؤال كاملة بالترتيب)
const MinecraftApplySchema = new mongoose.Schema({
    ign: { type: String, required: true },
    discordTag: { type: String, required: true },
    age: { type: Number, required: true },
    canRecordMic: { type: String, required: true },
    countryTimezone: { type: String, required: true },
    languages: { type: String, required: true },
    prevExperience: { type: String, required: true },
    playtimeDetails: { type: String, required: true },
    meaningOfStaff: { type: String, required: true },
    whyChooseYou: { type: String, required: true },
    opinionOnCurrentStaff: { type: String, required: true },
    teamworkExperience: { type: String, required: true },
    mostContactedStaff: { type: String, required: true },
    racismScenario: { type: String, required: true },
    swearingScenario: { type: String, required: true },
    ddosThreatScenario: { type: String, required: true },
    cheatingSuspicionScenario: { type: String, required: true },
    maliciousLinkScenario: { type: String, required: true },
    gangNamePunishment: { type: String, required: true },
    missingRankScenario: { type: String, required: true },
    illegalBuildingScenario: { type: String, required: true },
    staffAbuseScenario: { type: String, required: true },
    status: { type: String, default: 'Pending' }, // الحالات: Pending, Accepted, Rejected
    appliedAt: { type: Date, default: Date.now }
});
const MinecraftApply = mongoose.model('MinecraftApply', MinecraftApplySchema);

// ==========================================
// 4. مسارات استقبال التقديمات (Routes)
// ==========================================

// مسار استقبال طلب ديسكورد وحفظه في MongoDB
app.post('/api/apply/discord', async (req, res) => {
    try {
        const newApplication = new DiscordApply(req.body);
        await newApplication.save();
        res.status(201).json({ success: true, message: 'تم حفظ طلب الديسكورد بنجاح في قاعدة البيانات!' });
    } catch (error) {
        console.error('Error saving Discord application:', error);
        res.status(500).json({ success: false, message: 'حدث خطأ أثناء الحفظ في القاعدة.' });
    }
});

// مسار استقبال طلب ماين كرافت وحفظه في MongoDB
app.post('/api/apply/minecraft', async (req, res) => {
    try {
        const newApplication = new MinecraftApply(req.body);
        await newApplication.save();
        res.status(201).json({ success: true, message: 'تم حفظ طلب الماين كرافت بنجاح في قاعدة البيانات!' });
    } catch (error) {
        console.error('Error saving Minecraft application:', error);
        res.status(500).json({ success: false, message: 'حدث خطأ أثناء الحفظ في القاعدة.' });
    }
});

// ==========================================
// 5. مسار تشغيل السيرفر
// ==========================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});