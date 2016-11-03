var mongoose = require('mongoose');
var CatagorySchema = new mongoose.Schema({
	name: String
});
module.exports = mongoose.model('Catagory', CatagorySchema);
