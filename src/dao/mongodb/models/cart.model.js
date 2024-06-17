import mongoose from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: [
        {
            _id: false,
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                require: true
            },
            quantity: {
                type: Number, 
                default: 1
            }
        }
    ]
});

cartSchema.pre(['find', 'findOne'], function(){
    this.populate('products.product');
})

export const CartModel = mongoose.model(
    cartCollection,
    cartSchema
);