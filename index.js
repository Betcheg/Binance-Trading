function start() {


        binance.prices(function(ticker) {
            console.log("Price of WTC: ", ticker.WTCBTC);
        });
    

    binance.balance(function(balances) {
	if ( typeof balances.WTC !== "undefined" ) {
		console.log("WTC balance: ", balances.WTC.available);
	}
});


}


// Binance API dependencies
const binance = require('node-binance-api');
const binanceAPIkey = require('../secret_key/binance-key');

// Websocket dependencies
var express = require('express');
var app = express();
var http = require('http').Server(app);


// Set the API key 
binanceAPIkey.setAPI(binance);

app.use(express.static(__dirname + '/src'));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/src/html/index.html');
});


// Start the web server
http.listen(5555, function(){
  console.log('listening on *:3000');
});
    
// Start the bot
setInterval(start, 1000);


