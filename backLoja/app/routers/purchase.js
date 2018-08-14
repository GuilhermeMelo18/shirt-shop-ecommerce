var express = require('express');
var router = express.Router();

var ClienteController = require('../controllers/usuario');
var clienteController = new ClienteController();

var PurchaseController = require('../controllers/purchase');
var purchaseController = new PurchaseController();


// Get All Purchases
router.route('/get-all').get(function (req, res) {
    purchaseController.getAll(function (result, error) {

        if (error) {
            res.json(error);
        } else {
            res.json(result);
        }
    });
});

// Insert Purchase
router.route('/insert').post(function (req, res) {
    purchaseController.insert(req.body, function (result, error) {

        if (error) {
            res.json(error);
        } else {
            res.json(result);
        }
    });
});

// Get Demands 
router.route('/get-by-user/:id').get(function (req, res) {
    purchaseController.getByIdUser(req.params.id, function (result, error) {

        if (error) {
            res.json(error);
        } else {
            res.json(result);
        }
    });
});






/*--- EXPORT ROUTER--*/
module.exports = router;