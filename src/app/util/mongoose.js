module.exports = {
    muntipeMongooseToObject: (course) => {
        return course.map(e => e.toObject())
    },
    mongooseToObject: (course) => {
        return course ? course.toObject() : course
    }

}