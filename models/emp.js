const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EmployeeSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    },
    phone: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Employee = mongoose.model("employees", EmployeeSchema);
