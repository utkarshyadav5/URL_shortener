var path = require('path')
var bodyParser = require('body-parser');
var base58 = require('./base58');
var mongoose = require('mongoose');
var Url = require('../models/url')

var urlencodedParser = bodyParser.urlencoded({extended: false});

//Connect to database
mongoose.connect('mongodb://url_shortener:url@ds049651.mlab.com:49651/url_shortener');

webhost = 'http://localhost:3000/';

module.exports = function(app){

    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/',function(req,res){
        // route to serve up the homepage (index.html)
        res.sendFile(path.join(__dirname,'../views/index.html'));
    });

    app.post('/api/shorten',urlencodedParser,function(req,res){
        var longUrl = req.body.url;
        var shortUrl = '';

        // check if the url already exists in database
        Url.findOne({longUrl: longUrl},function(err,doc){
            if(doc){
                // Url has already been shortened
                shortUrl = webhost + base58.encode(doc._id);
                res.send({'shortUrl':shortUrl});
            }
            else{
                // the long url was not found so create a new one
                var newUrl = Url({
                    long_url: longUrl
                });

                //save the new link
                newUrl.save(function(err){
                    if(err)
                        throw err;

                    shortUrl = webhost + base58.encode(newUrl._id);
                    res.send({'shortUrl':shortUrl});
                });
            }
        });

        app.get('/:encoded_id', function(req, res){
            var base58Id = req.params.encoded_id;
            var id = base58.decode(base58Id);

            // check if url already exists in database
            Url.findOne({_id: id}, function (err, doc){
                if (doc) {
                  // found an entry in the DB, redirect the user to their destination
                  res.redirect(doc.long_url);
                } else {
                  // nothing found, take 'em home
                  res.redirect('/');
                }
            });
        });

    });

};