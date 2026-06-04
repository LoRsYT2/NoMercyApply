const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    // حقول طلبات الديسكورد
    username: { type: String },
    id: { type: String },
    age: { type: Number },
    reason: { type: String },
    experience: { type: String },
    
    // حقول طلبات ماين كرافت (IGN)
    ign: { type: String },
    discordTag: { type: String },
    canRecordMic: { type: String },
    countryTimezone: { type: String },
    languages: { type: String },
    playtimeDetails: { type: String },
    meaningOfStaff: { type: String },
    whyChooseYou: { type: String },
    opinionOnCurrentStaff: { type: String },
    teamworkExperience: { type: String },
    mostContactedStaff: { type: String },
    racismScenario: { type: String },
    swearingScenario: { type: String },
    ddosThreatScenario: { type: String },
    cheatingSuspicionScenario: { type: String },
    maliciousLinkScenario: { type: String },
    gangNamePunishment: { type: String },
    missingRankScenario: { type: String },
    illegalBuildingScenario: { type: String },
    staffAbuseScenario: { type: String },

    // حقول عامة للنظام
    type: { type: String, required: true, enum: ['discord', 'minecraft'] }, // يحدد نوع الطلب
    status: { type: String, default: 'pending', enum: ['pending', 'accepted', 'rejected'] }, // حالة الطلب
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', ApplicationSchema);
