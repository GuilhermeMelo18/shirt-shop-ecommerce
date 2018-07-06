var User = require('../models/usuario');
var Functions = require('../util/functions');

function ClienteController() {
    this.functions = new Functions();

}

ClienteController.prototype.getAll = function(callback) {

    User.find(function (error, usuarios) {
        if (error) {
            callback(null, error);
        } else {
            callback(usuarios);
        }
    });
};

ClienteController.prototype.getById = function(id, callback) {
    
    User.findById(id, function (error, result) {
        if (error) {
            callback(new Error("User dont Founded"));
        } else {
            callback(result);
        }
    });
};

ClienteController.prototype.insert = function (req, callback) {
    

    User.find({ email: req.email, password: req.password}, function(error,usuario){

        if(usuario.length==0){
            var usuario = new User();
            usuario.nameUser = req.nameUser;
            usuario.email = req.email;
            usuario.password = req.password;
            
            usuario.save(function (error, usuario) {
                if (error) {
                    callback(new Error("Erro Server - Save User"));
                } else {
                    callback(usuario);
                }
            });
        }else{
            callback(new Error("User Already Exist"));
        }

   }); 
}

ClienteController.prototype.login = function(req, callback){

       User.find({ email: req.email, password: req.password}, function(error,usuario){

            if(usuario.length==0){
                  callback(new Error("Error Login - User Don't Exist"));  
            }else{
                callback(usuario);
            }

       }); 
}

ClienteController.prototype.loginFacebook = function(req, callback){

    User.find({email: req.email}, function(error,usuario){

         if(usuario.length==0){
                var user = new User();
                user.email = req.email;
                user.save(function (error, usuario) {
                    if (error) {
                        callback("Erro Server - Save User", error);
                    } else {            
                        callback(usuario);
                    }
                });

         }else{
             callback(usuario);
         }

    }); 
}

ClienteController.prototype.update = function(id, req , callback){

    var user = new usuario();
    user.email = req.email;
    user.password = req.password;
    user.nameUser = req.nameUser;
    user.imageUser = req.imageUser;
    user.imageSite = req.imageSite;

    User.findByIdAndUpdate(id, user, function(error,user){

        if(error){
            callback(new Error('Error Server - Update User'));
        }else{
            callback(user);
        }

    });
}

ClienteController.prototype.remove = function(id, callback){

    User.findByIdAndRemove(id, function(error,user){

        if(error){
            callback(new Error('Error Server - Remove User'));
        }else{
            callback(user);
        }

    });
}

module.exports = ClienteController;
