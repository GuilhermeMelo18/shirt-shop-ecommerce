var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var PurchaseSchema = new Schema({
    clientId: { type: Schema.Types.ObjectId, ref: 'usuario'},
    shirtId: { type: Schema.Types.ObjectId, ref: 'shirt'},
    shirtName : String,
    dateHourBuy : String,
    placeBuy : String,
    priceDelivery: String,
    totalPrice: String,
    cepDelivery: String,
    discountPrice : String,
    qtdShirts : String
});

module.exports = mongoose.model('purchase', PurchaseSchema);