const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    line_items: Object,
    name: { 
        type: String,
        required: true },
    email: { 
        type: String, 
        required: true },
    city: { 
        type: String, 
        required: true },
    street: { 
        type: String, 
        required: true },
    postalCode: { 
        type: String, 
        required: true },
    country: { 
        type: String, 
        required: true },
    paid: {
        type: Boolean,
        default: false
    }
},{timestamps: true})

export const Order = mongoose.models.Order || mongoose.model('Order',OrderSchema)