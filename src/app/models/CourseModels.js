const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Course = new Schema({
    _id: { type: Number, },//đổi lại kiểu mặc định của mongodb
    title: { type: String, maxlength: 255 },
    description: { type: String, maxlength: 600 },
    images: { type: String, maxlength: 255 },
    videoId: { type: String, maxlength: 255 },
    slug: { type: String, slug: 'title', unique: true },
}, {
    _id: false,//đổi lại kiểu mặc định của mongodb
    timestamps: true
});
//custom helper // tổng hợp lại hàm gọi khi lọc
Course.query.sortStable = function (req) {
    if (req.query.hasOwnProperty("_sort")) {
        let checkTypes = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: checkTypes ? req.query.type : "desc"
        })
    }
    return this;
}

//add plugin
mongoose.plugin(slug);
Course.plugin(AutoIncrement);//tự động điền id mongo tăng dần
Course.plugin(mongoose_delete, {
    overrideMethods: 'all',
    deletedAt: true
});

module.exports = mongoose.model('Course', Course);;