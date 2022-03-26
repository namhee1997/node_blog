const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Course = new Schema({
    title: { type: String, maxlength: 255 },
    description: { type: String, maxlength: 600 },
    images: { type: String, maxlength: 255 },
    videoId: { type: String, maxlength: 255 },
    slug: { type: String, slug: 'title', unique: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', Course);;