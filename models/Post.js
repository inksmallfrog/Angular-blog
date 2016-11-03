var mongoose = require('mongoose')
var PostSchema = new mongoose.Schema({
	title: String,
	catagory_id: { type: Number, ref: 'Catagory'},
	viewed_times: { type:Number, default: 0 },
	up_times: { type:Number, default: 0 },
	comment_times: { type:Number, default: 0 },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Post', PostSchema);
