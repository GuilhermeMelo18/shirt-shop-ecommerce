var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var PurchaseSchema = new Schema({
    clientId: { type: Schema.Types.ObjectId, ref: 'usuario'},
    shirtId: { type: Schema.Types.ObjectId, ref: 'shirt'},
    dateHourBuy : string,
    placeBuy : string,
    priceDelivery: string,
    totalPrice: string,
    cepDelivery: string,
    discountPrice : string
});

module.exports = mongoose.model('purchase', PurchaseSchema);