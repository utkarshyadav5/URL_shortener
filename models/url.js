var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a counters schema with an _id field and a seq field
var CounterSchema = Schema({
    _id : {type: String, required: true },
    seq : {type:Number, default:0 }
});

//create a model from that Schema
var counter = mongoose.model('counter',CounterSchema);

// create a schema for our links
var urlSchema = new Schema({
    _id : {type: Number,index:true},
    long_url: String,
    created_at: Date
});


// The pre('save', callback) function executes the callback function
// every time before an entry is saved to the urls collection.
urlSchema.pre('save',function(next){
    var doc = this;
    //find the url_count and increment it by 1
    counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq:1} },{ "upsert": true, "new": true }, function(error,counter){
        if(error)
            return next(error);
        // set the _id of the urls collection to the incremented value of the counter
        doc._id = counter.seq;
        doc.created_at = new Date();
        next();
    });
});

module.exports = mongoose.model('Url',urlSchema);

































