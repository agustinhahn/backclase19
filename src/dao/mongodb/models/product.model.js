import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = 'product';

const productSchema = new mongoose.Schema({
    title: { type: String, require: true, max: 30, index: true},
    description: { type: String, require: true, index: true},
    price: { type: Number, require: true },
    img: [String],
    code: { type: String, unique: true },
    stock: { type: Number, require: true },
    category: {
        type: String,
        enum: {
            values: [
                'remeras',
                'pantalones',
                'shorts',
                'calzado',
                'buzo',
                'campera',
                'Otros'
            ],
            message: '{VALUE} no es una categoría válida',
        },
        require: true,
        index: true,
    },
    status: {type: Boolean, default: true},
});

productSchema.plugin(mongoosePaginate);

export const ProductModel = mongoose.model(
    productCollection, 
    productSchema
);