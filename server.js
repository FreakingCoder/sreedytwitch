const express = require('express');
const app = express();
const fetch = require('request');

app.use(express.static('js'));
app.use(express.static('css'));

app.get('/', function(req,res){
	res.sendFile(__dirname + '/static/index.html');
});

app.get('/api', function(req,res){

    var url = "https://api.twitch.tv/kraken/search/streams?query=";
    if(req.query.search){
        url+=req.query.search;
    }else{
        url+= 'starcraft';
    }

	var p = new Promise(function(resolve,reject){
        const options = {
            url: url,
            method: 'GET',
            headers: {
                'Client-ID':'kxg3rh1iehsze4yv5cm6lw6cyetgqp'
            }
        };

        fetch(options, function(err, res, body){
            if (err) reject(err);
            resolve(body)
		});

	});

	p.then(function(data){
		res.send(JSON.parse(data));
	});

});

const port = process.env.PORT || 8080;

app.listen(port, function(){
	console.log("Server is running");
});