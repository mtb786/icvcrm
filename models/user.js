//Require Mongoose
const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
    emailId: { type :   String , required : true},
    password: {  type : String , required : true},
    updated: { type: Date, default: Date.now },
    userlevel : { type : String, enum : ['superadmin','admin','user']}
});
const userModel = mongoose.model('user',userSchema);

module.exports = userModel;

