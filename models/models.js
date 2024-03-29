const mongoose = require("mongoose");
const { number } = require("yargs");
const { Double } = require("bson/lib/double");
require('mongoose-double')(mongoose);

const SchemaTypes = mongoose.Schema.Types;
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        default: 0,
    },
});

const User = mongoose.model("User", UserSchema);

const DetailSchema = new mongoose.Schema({
    originalNumber: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    car: {
        type: String,
        required: true,
    },
    price: {
        type: SchemaTypes.Double,
        required: true
    }
});
  
const Detail = mongoose.model("Detail", DetailSchema);

module.exports = { User, Detail };