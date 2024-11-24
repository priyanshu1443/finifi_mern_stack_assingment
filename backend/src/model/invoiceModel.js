import mongoose from "mongoose";

const invoiceSchem = new mongoose.Schema({
    Vendor_Name: {
        type: String,
        require: true
    },
    Invoice: {
        type: String,
        require: true
    },
    Status: {
        type: String,
        require: true
    },
    Net_Amount: {
        type: Number,
        require: true
    },
    Invoice_Date: {
        type: Date,
        require: true
    },
    Due_Date: {
        type: Date,
        require: true
    },
    Department: {
        type: String,
        require: false
    },
    Cost_Center: {
        type: String,
        require: false
    }
})
const invoiceModel = mongoose.model("Invoice", invoiceSchem)
export default invoiceModel
