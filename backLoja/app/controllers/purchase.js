var Purchase = require('../models/purchase');
var Functions = require('../util/functions');

function PurchaseController() {
    this.functions = new Functions();

}

PurchaseController.prototype.getAll = function(callback) {

    Purchase.find(function (error, purchase) {
        if (error) {
            callback(null, error);
        } else {
            callback(purchase);
        }
    });
};

PurchaseController.prototype.getByIdUser = function(id, callback) {
    
    Purchase.find({clientId: id}, function (error, result) {
        if (error) {
            callback(new Error("Purchases dont Founded"));
        } else {
            callback(result);
        }
    });
};

PurchaseController.prototype.insert = function(req, callback) {
    
    var purchase = new Purchase();
    purchase.clientId = req.clientId;
    purchase.shirtId = req.shirtId;
    purchase.shirtName = req.shirtName;
    purchase.dateHourBuy = req.dateHourBuy;
    purchase.priceDelivery = req.priceDelivery;
    purchase.totalPrice = req.totalPrice;
    purchase.cepDelivery = req.cepDelivery;
    purchase.discountPrice = req.discount;
    purchase.qtdShirts = req.qtdShirts;
 
    purchase.save(function (error, result) {
        if (error) {
            callback(new Error("Purchases Not Insert"));
        } else {
            callback(result);
        }
    });
};



module.exports = PurchaseController;