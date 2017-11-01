function start() {


        binance.prices(function(ticker) {
            console.log("Price of WTC: ", ticker.WTCBTC);
            io.emit('price wtc', ticker.WTCBTC); 
        });
    

    binance.balance(function(balances) {
	if ( typeof balances.WTC !== "undefined" ) {
		console.log("WTC balance: ", balances.WTC.available);
            io.emit('balance wtc', balances.WTC.available); 
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
var io = require('socket.io')(http);


// Set the API key 
binanceAPIkey.setAPI(binance);

// Set the html routing
app.use(express.static(__dirname + '/src'));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/src/html/index.html');
});


// Start the web server
http.listen(5555, function(){
  console.log('listening on *:3000');
});


io.on('connection', function(socket){
  console.log('a user connected');
 
    io.emit('connection ok', "aaa"); 
    
    socket.on('disconnect', function(){
    console.log('user disconnected');
    });
});
    

// Start the bot
setInterval(start, 1000);




