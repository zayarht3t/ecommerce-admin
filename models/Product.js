import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: [String]
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    },
    properties: {
        type: Object
    }
},{timestamps: true})


export let Product = mongoose.models.Product || mongoose.model('Product',productSchema);