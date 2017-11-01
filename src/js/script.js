$(document).ready(function(){

        salut();

        $.ajax({url: "https://www.binance.com/api/v1/ping", success: function(result){
            $(".content").html(result);
        }});

});

function salut() {
    console.log("salut");
}
