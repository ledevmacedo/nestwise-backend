const mongoose = require('mongoose')

const House = mongoose.model('House', {
    name: String,
    residents: Array,
    created: Date
})


module.exports = House