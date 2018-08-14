var Shirt = require('../models/shirt');
var User = require('../models/usuario')
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

    Shirt.find({ clientAuthorId: id }, function (error, result) {
        if (error) {
            callback(new Error("Shirts from user, don't Founded"));
        } else {
            callback(result);
        }
    });
};

ShirtController.prototype.remove = function (id, callback) {

    Shirt.findByIdAndRemove(id, function (error, result) {
        if (error) {
            callback(new Error("Shirts don't removed"));
        } else {
            callback(result);
        }
    });
};

ShirtController.prototype.addBagUser = function (id, idShirt, callback) {

    User.findById(id, function (error, result) {
        if (error) {
            callback(new Error("User Don't Identified"));
        } else {
            result.listBag.push({ shirtId: idShirt, statusVenda: false });

            User.findByIdAndUpdate(id, { listBag: result.listBag }, function (error, result) {
                if (error) {
                    callback(new Error("Shirt Not Add"));
                } else {
                    callback(result);
                }
            });
        }
    });
};

ShirtController.prototype.getShirtsAuthors = function (id, callback) {

    var ShirtAuthor = [];


    User.findById(id, function (error, resultOne) {
        if (error) {
            callback(new Error("User Don't Identified"));
        } else {
            var arrayIdBag = [];
            resultOne.listBag.forEach(element => {
                arrayIdBag.push(element.shirtId)
            });

            // Find Shirt from Bag
            Shirt.find({ _id: { $in: arrayIdBag } }, function (error, resultShirts) {
                if (error) {
                    callback(new Error("Shirts Not Found"));
                } else {

                    for (let index = 0; index < resultShirts.length; index++) {
                        // Find Author from Shirts
                        User.findById(resultShirts[index].clientAuthorId, function (error, resultAuthor) {
                            if (error) {
                                // Nada
                            } else {
                                ShirtAuthor.push({ shirt: resultShirts[index], author: resultAuthor });
                            }
                            if (index == resultShirts.length - 1) {

                                callback(ShirtAuthor.reverse());
                            }
                        });

                    }

                }
            });
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

ShirtController.prototype.likesShirt = function (id, callback) {


    Shirt.findById(id, function (error, shirt) {
        if (error) {
            callback(new Error("Erro Shirt Don't Finded"));
        } else {

            shirt.qtdLikes = (parseFloat(shirt.qtdLikes) + 1).toString();

            shirt.save(function (error, shirtSave) {
                if (error) {
                    callback(new Error("Server Error - Shirt Don't Liked "));
                } else {
                    callback(shirtSave);
                }
            });
        }
    });
}

ShirtController.prototype.topLikesShirts = function (callback) {


    Shirt.find(function (error, shirts) {
        if (error) {
            callback(new Error("Erro Shirt Don't Founded"));
        } else {

            shirts.sort(function (a, b) {
                return b.qtdLikes - a.qtdLikes;
            });

            // Return The Top Six Liked Shiirts
            var topSixShirts = [];

            for (let index = 0; index < shirts.length; index++) {

                if (index == 4) {
                    index = shirts.length;
                } else {
                    topSixShirts.push(shirts[index]);
                }
            }

            callback(topSixShirts);
        }
    });
}


module.exports = ShirtController;