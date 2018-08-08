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



module.exports = PurchaseController;