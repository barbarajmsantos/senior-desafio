//key da api
OPENWEATHER_APIKEY = "8523a475c8cb423e2564fab9630edb55";
//URL de acesso
OPENWEATHER_ENDPOINT = "http://api.openweathermap.org/data/2.5/";

jQuery( document ).ready( function() {
    if ( OPENWEATHER_APIKEY ) {
       
        
        
    } else {
        jQuery(".message.no-api").show();
    }
} );

