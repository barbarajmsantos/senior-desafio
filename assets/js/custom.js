$(document).ready(function () {
    $.getJSON('estadosCidades.json', function (data) {
        var dados = [];
        var options = '<option selected disabled value="">Escolha um estado</option>';
        $.each(data, function (key, val) {
            options += '<option value="' + val.nome + '">' + val.nome + '</option>';
        });
        $("#estados").html(options);
        $("#estados").change(function () {
            var options_cidades = '<option></option>';
            var str = "";
            $("#estados option:selected").each(function () {
                str += $(this).text();
            });
            $.each(data, function (key, val) {
                if(val.nome == str) {
                    $.each(val.cidades, function (key_city, val_city) {
                        options_cidades += '<option value="' + val_city + '">' + val_city + '</option>';
                    });
                }
            });
            $("#cidades").html(options_cidades);
        }).change();

    });
  
    $('#cidades').select2({
        language: {
            noResults: function (term) {
                return "Selecione primeiro um estado";
            }
        }
    });
    
    
    
    /*tradução */
    var ywcc_ptbr = {
        '0':  'tornado',                       // tornado
        '1':  'tempestade tropical',           // tropical storm
        '2':  'furacão',                       // hurricane
        '3':  'tempestade severa',             // severe thunderstorms
        '4':  'trovoadas',                     // thunderstorms
        '5':  'chuva e neve',                  // mixed rain and snow
        '6':  'chuva e granizo fino',          // mixed rain and sleet
        '7':  'neve e granizo fino',           // mixed snow and sleet
        '8':  'garoa gélida',                  // freezing drizzle
        '9':  'garoa',                         // drizzle
        '10': 'chuva gélida',                  // freezing rain
        '11': 'chuvisco',                      // showers
        '12': 'chuva',                         // showers
        '13': 'neve em flocos finos',          // snow flurries
        '14': 'leve precipitação de neve',     // light snow showers
        '15': 'ventos com neve',               // blowing snow
        '16': 'neve',                          // snow
        '17': 'chuva de granizo',              // hail
        '18': 'pouco granizo',                 // sleet
        '19': 'pó em suspensão',               // dust
        '20': 'neblina',                       // foggy
        '21': 'névoa seca',                    // haze
        '22': 'enfumaçado',                    // smoky
        '23': 'vendaval',                      // blustery
        '24': 'ventando',                      // windy
        '25': 'frio',                          // cold
        '26': 'nublado',                       // cloudy
        '27': 'muitas nuvens <span class="icon-noite"></span>',         // mostly cloudy (night)
        '28': 'muitas nuvens <span class="icon-dia"></span>',           // mostly cloudy (day)
        '29': 'parcialmente nublado <span class="icon-noite"></span>',  // partly cloudy (night)
        '30': 'parcialmente nublado <span class="icon-dia"></span>',    // partly cloudy (day)
        '31': 'céu limpo <span class="icon-noite"></span>',             // clear (night)
        '32': 'ensolarado',                    // sunny
        '33': 'tempo bom <span class="icon-noite"></span>',             // fair (night)
        '34': 'tempo bom <span class="icon-dia"></span>',               // fair (day)
        '35': 'chuva e granizo',               // mixed rain and hail
        '36': 'quente',                        // hot
        '37': 'tempestades isoladas',          // isolated thunderstorms
        '38': 'tempestades esparsas',          // scattered thunderstorms
        '39': 'tempestades esparsas',          // scattered thunderstorms
        '40': 'chuvas esparsas',               // scattered showers
        '41': 'nevasca',                       // heavy snow
        '42': 'tempestades de neve esparsas',  // scattered snow showers
        '43': 'nevasca',                       // heavy snow
        '44': 'parcialmente nublado',          // partly cloudy
        '45': 'chuva com trovoadas',           // thundershowers
        '46': 'tempestade de neve',            // snow showers
        '47': 'relâmpagos e chuvas isoladas',  // isolated thundershowers
        '3200': 'não disponível'               // not available
    }
    var wDay_ptbr = {
        'Tue':  'Ter',
        'Wed':  'Quar',
        'Thu':  'Qui',
        'Fri':  'Sex',
        'Sat':  'Sab',
        'Sun':  'Dom',
        'Mon':  'Seg',
        
    }
    //parametro de unidade
    var wUnit = 'c';  
    
    //Geolocalizacao
    if ("geolocation" in navigator) {
        $('.js-geolocation').show();
    } else {
        $('.js-geolocation').hide();
    }

    $('.js-geolocation').on('click', function() {
        $('#weather').prepend('<div class="loading"></div>');
        navigator.geolocation.getCurrentPosition(function(geo) {
            weather(geo.coords.latitude + ',' + geo.coords.longitude, wUnit);
        });
    });

    // inicializando    
    var theLocation = $('#cidades').val();
    if (theLocation === '') {
        var theLocation = "Blumenau, SC";
    }
    weather(theLocation, ' ', wUnit);
    $('button').on('click', function(e) {
        e.preventDefault();
        var localizacao = $('#cidades').val() +','+ $('#estados').val();
        weather(localizacao, '', wUnit);
    });
    function hasClass(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
    // Montando o Weather 
    function weather(location, woeid, unit) {
        $.simpleWeather({
            location: location,
            woeid: woeid,
            unit: unit,
            success: function(w) {
                $('.loading').fadeOut();
                var displayLoc = w.city + ', ' + w.region;
                $(".cidade h1").html(displayLoc);
                $('.dados-icon').addClass('icon-' + w.code);
                $('.dados-temp').html(w.temp + '&deg;' + w.units.temp);
                $('.dados-desc').html(ywcc_ptbr[w.code]);
                // mostrar mais 7 dias
                var future = "";
                var length = 7;
                for (var i = 1; i < length; i++) {
                    future += '<li class="diariamente"><div class="dia">' + wDay_ptbr[w.forecast[i].day] + '</div><i class="icon icon-' + w.forecast[i].code + '"></i><div class="desc">' + ywcc_ptbr[w.forecast[i].code] + '</div><div class="temp high"> Máx: ' + w.forecast[i].high + '&deg;</div><div class="temp low"> Min: ' + w.forecast[i].low + '&deg;</div></li>';
                }
                $(".five-day").html(future);
               
                var timestamp = moment(w.updated);
                $('.last-updated span').html(moment(timestamp).fromNow());

            },
            error: function(error) {
                $(".tempo").html('<p>' + error + '</p>');
            }

        });

    };
});