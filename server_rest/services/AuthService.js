/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
require('localenv');
var verifier = require('google-id-token-verifier');
  
// app's client IDs to check with audience in ID Token.
var clientId = process.env.GOOGLE_CLIENTID;
 
exports.authCheck= function(req, res, next){
    var IdToken = req.headers.authorization;
    verifier.verify(IdToken, clientId, function (err, tokenInfo) {
        if (!err) {
            // use tokenInfo in here.
            //console.log(tokenInfo);
            next();
        }else{
            res.sendStatus(401);
            return;
        }
    });
};
