const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    discordId: { type: String, required: true },
    username: { type: String, required: true },
    applicationType: { type: String, required: true }, 
    age: { type: Number, required: true },
    hours: { type: String, required: true },
    answers: { type: [String], required: true }, 
    submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', ApplicationSchema);