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


const binance = require('node-binance-api');
const binanceAPIkey = require('../secret_key/binance-key');

// Set the API key 
binanceAPIkey.setAPI(binance);

// Start the bot
setInterval(start, 1000);


