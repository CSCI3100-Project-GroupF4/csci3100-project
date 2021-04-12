const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ownershipSchema = new Schema({
    itemId: {
        type: Number,
        default: 1000
    },
    userID: {
        type: String,
        default: ""
    },
}, {
    collection: 'ownerships'
})

module.exports = mongoose.model('Ownership', ownershipSchema)