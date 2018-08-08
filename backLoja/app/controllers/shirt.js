var Shirt = require('../models/shirt');
var Functions = require('../util/functions');

function ShirtController() {
    this.functions = new Functions();

}

ShirtController.prototype.getAll = function (callback) {

    Shirt.find(function (error, result) {
        if (error) {
            callback(null, error);
        } else {
            callback(result);
        }
    });
};

ShirtController.prototype.getByIdUser = function (id, callback) {

    Shirt.find({ clientId: id }, function (error, result) {
        if (error) {
            callback(new Error("Shirts dont Founded"));
        } else {
            callback(result);
        }
    });
};

ShirtController.prototype.insert = function (req, callback) {


    var shirt = new Shirt();
    shirt.clientAuthorId = req.clientId;
    shirt.titleShirt = req.titleShirt;
    shirt.modelShirt = req.modelShirt;
    shirt.colorShirt = req.colorShirt;
    shirt.imgShirt = req.imgShirt;    
    shirt.imgPicture = req.imgPicture;
    shirt.shirtPriceSell = req.shirtPriceSell;
    shirt.shirtGainClient = req.shirtGainClient;
    shirt.arrayTags = req.arrayTags;
    shirt.qtdLikes = req.qtdLikes;

    shirt.save(function (error, usuario) {
        if (error) {
            callback(new Error("Erro Server - Save Shirt"));
        } else {
            callback(usuario);
        }
    });
}


module.exports = ShirtController;