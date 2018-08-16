var express = require('express');
var router = express.Router();

var ClienteController = require('../controllers/usuario');
var clienteController = new ClienteController();

// ClientSession
var clienteSession =  undefined;
// ClientLoja
var clienteLoja = undefined;

// Get All Users
router.route('/').get(function (req, res) {
    clienteController.getAll(function (result, error) {

        if (error) {
            res.json(error);
        } else {
            res.json(result);
        }
    });
});
// Get Session Users
router.route('/get-session').get(function (req, res) {
    
    if (clienteSession == undefined) {
        res.status(404);
        res.json("User Don't Logged");
    } else {
        res.status(200);
        // MISS User Password
        res.json(clienteSession);
    }

});
// Get User from Shop Page 
router.route('/get-user-shop').get(function (req, res) {
    
    if (clienteLoja == undefined) {
        res.status(404);
        res.json("User Don't Found");
    } else {
        res.status(200);
        // MISS User Password
        res.json(clienteLoja);
    }

});
// Get User By Id
router.route('/get-by-id/:id').get(function (req, res) {

    
    clienteController.getById(req.params.id, function (result, error) {
        if (result instanceof Error) {
            res.status(404);
            res.json(result.message);
        } else {
            // Miss User Password
            result.password = undefined;
            // Save User Loja 
            clienteLoja = result;
            res.json(result);
        }
    });
});
// Get Total User Likes and Gains
router.route('/get-likes-gain/:id').get(function (req, res) {

    
    clienteController.getAllLikesGain(req.params.id, function (result, error) {
        if (result instanceof Error) {
            res.status(404);
            res.json(result.message);
        } else {
            res.json(result);
        }
    });
});
// Inset new User
router.route('/insert').post(function (req, res){
    
    clienteController.insert(req.body, function (result, error) {
        if (result instanceof Error) {
            res.status(500);
            res.json(result.message);
        } else {
            var client = [];
            client.push(result);
            clienteSession = client;   
            //console.log(clienteSession);
            res.json(result);
        }
    });
});
// Update User By ID
router.route('/update/:id').post(function (req, res) {

    clienteController.update(req.params.id, req.body, function (result, error) {
        if (result instanceof Error) {
            res.status(404);
            res.json(result.message);
        } else {
            var client = [];
            client.push(req.body);
            clienteSession = client;
            res.json(result);
        }
    });
});
// Remove User By ID
router.route('/remove/:id').post(function (req, res) {

    clienteController.remove(req.params.id, function (result, error) {
        if (result instanceof Error) {
            res.status(404);
            res.json(result.message);
        } else {
            res.json(result);
        }
    });
});
// User Login 
router.route('/login').post(function(req, res){

    clienteController.login(req.body, function(result, error){
        if (result instanceof Error) {
            res.status(404);
            res.json(result.message);
        } else {  
            // Salva a Sessão no Usuário     
            clienteSession = result;

            // Miss User Password
            result.password = undefined;
            res.json(result);
        }
    });

});
// User Facebook Login
router.route('/login-facebook').post(function(req, res){

    clienteController.loginFacebook(req.body, function(result, error){
        if (result instanceof Error) {
            res.status(404);
            res.json(result.message);
        } else {       
            // Salva a Sessão no Usuário     
            clienteSession = result;
            // Miss User Password
            result.password = undefined;
            res.json(result);
        }
    });

});
//User Logout
router.route('/logout').get(function(req, res){
    
    // Salva a Sessão no Usuário     
    clienteSession = undefined;

    res.json("Client Logout");

});

/*--- EXPORT ROUTER--*/
module.exports = router;