$(document).ready(function(){
    var socket = io();
    var lastWTCPrice = 0;
    var balanceWTC = 0;

    socket.on('connection ok', function(msg){
        $('.content').prepend("<i> Successfully connected</i><br>");
        $('.titre').html("State: <b> Running </b>");
        console.log("OK: "+msg);
    });

    socket.on('disconnect', function(msg){
        balanceWTC = 0;
        lastWTCPrice = 0;
        $('.content').prepend("<i> Disconnected </i><br>");
        $('.titre').html("State: <span class='red'> <b>Disconnected</b> </span>");
    });



    socket.on('price wtc', function(msg){
        console.log("price: "+msg);
        var currentWTCprice = parseFloat(msg);
        var spanColor = "<span color='blue'>";
        if(lastWTCPrice < currentWTCprice) {
            spanColor = "<span class='green'>";
            lastWTCPrice = currentWTCprice;
            $('.content').prepend( getTime() + "WTC price" + spanColor+ " "+  msg + "</span><br>");
        }
        else if(lastWTCPrice > currentWTCprice) {
            spanColor = "<span class='red'>";
            lastWTCPrice = currentWTCprice;
            $('.content').prepend(getTime() + "WTC price " +spanColor + " "+  msg + "</span><br>");
        }


        $("#price #wtc").html(" " + currentWTCprice +" WTC ");

    });


    socket.on('balance wtc', function(msg){
        imgURL = "<img src='https://files.coinmarketcap.com/static/img/coins/16x16/walton.png'/>" ;
        balanceWTC = parseFloat(msg);
        $("#holding #wtc").html(balanceWTC + " WTC " + imgURL);
    });


    function getTime(){

        var d = new Date();
        return "["+d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "] ";

    }

});

