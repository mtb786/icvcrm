const usermodel = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/app.json');
const loginController = {

    addUser: function (req, res) {
        const userData = {};
        const reqData = req.body;

        // Password Hashing 
        bcrypt.hash(reqData.password, 10).then((hash) => {

            userData.emailId = reqData.emailId;
            userData.userlevel = reqData.userlevel;
            userData.password = hash;
            const user = new usermodel(userData);
            user.save().then((item) => {
                res.send({ code: 200, message: 'Sucessfully saved', 'sucess': item });
            }).catch((error) => {
                res.send({ code: 400, message: 'Something went wrong', 'error': 'Schema validation' });
            });

        }).catch((error) => {
            res.send({ code: 400, message: 'Something went wrong', 'error': error });
        });

    },
    logincheck: function (req, res) {
        console.log(req.body);
        const reqData = req.body;
        usermodel.findOne({ 'emailId': reqData.email }, (error, user) => {
            
            if (!user) {
                console.log(user);
                res.status(200).send({ code: 400, message: 'not valid id or password' });
            } else {
                bcrypt.compare(reqData.password, user.password, (errorCompare, trueCompare) => {
                    if (trueCompare) {
                        var token = jwt.sign({ id: user._id }, config.secretkey, {
                            expiresIn: 86400 // expires in 24 hours
                        });
                        res.status(200).send({  code: 200, 'token': token , message: 'Login Sucessful' });
                    } else {
                        res.status(400).send({ code: 400, message: 'not valid id or password' });
                    }
                });
            }
        });
    },
    getuserDetails: function (req, res) {
        var token = req.headers['x-access-token'];
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        else {
            jwt.verify(token, config.secretkey, function (err, decoded) {
                if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
                else {
                    usermodel.find(function(err, docs){   
                    if(!err) {
                        res.status(200).send({data : docs });
                    }
                });
            }
            });

        }

    }
};

module.exports = loginController;