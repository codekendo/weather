var lat;
var lon;

function geoCall() {
  navigator.geolocation.watchPosition(function(position) {
    lat = "lat=" + position.coords.latitude;
    lon = "lon=" + position.coords.longitude;
    console.log(lat);
    console.log(lon);
var url = 'https://fcc-weather-api.glitch.me/api/current?' + lat + '&' + lon;
console.log(url);
    function getWeather() {
      $.getJSON(url, function(data) {
        //console.log(data.main.temp);
        $('.city').text(data.name)
        $('#temp').text(data.main.temp);
        $('.temp').attr('data-temp', data.main.temp)
        $('.description').text(data.weather[0].description)
        $('#wind').text(data.wind.speed)

        var sunrise = data.sys.sunrise; // sunrise in unix time stamp
        var date = new Date(sunrise * 1000);
        var sunriseHours = date.getHours();
        var sunriseMinutes = date.getMinutes();
        var sunset = data.sys.sunset;
        var sunsetDate = new Date(sunset * 1000)
        var sunsetHours = sunsetDate.getHours();
        var sunsetMinutes = sunsetDate.getMinutes();
        console.log(sunsetHours);
        console.log(sunsetMinutes - 12 + 'pm');
        //console.log(sunriseMinutes);
        // console.log(sunriseHours);
        console.log(data); //data
        console.log(data.name); //city
        console.log('icon', data.weather[0].icon); //weather description
        // console.log('icon#', data.weather[0].icon);

        //change the background to an image based on the id

        if (data.weather[0].description == 'clear sky') {
          $('.wrapper').addClass('clearSkyDay')
        }   else if (data.weather[0].description == "few clouds") {
          $('.wrapper').addClass('fewCloudsDay')
        }  else if (data.weather[0].description == 'scattered clouds') {
          $('.wrapper').addClass('scatteredCloudsDay')
        } else if (data.weather[0].description == 'broken clouds') {
          $('.wrapper').addClass('brokenCloudsDay')
        } else if (data.weather[0].description == 'shower rain') {
          $('.wrapper').addClass('showerRainDay')
        } else if (data.weather[0].description == 'rainy day') {
          $('.wrapper').addClass('rainDay')
        } else if (data.weather[0].description == 'thunderstorm') {
          $('.wrapper').addClass('thunderstorm')
        } else if (data.weather[0].description == 'snow') {
          $('.wrapper').addClass('snow')
        } else if (data.weather[0].description == 'mist') {
          $('.wrapper').addClass('mist')
        }

      })
    }
    getWeather();
  });
}
geoCall();

$(document).ready(function() {

  $('.temp').click(function() {
    var tempInF = parseFloat($(this).attr('data-temp'));
    var tempInC = Math.round((((tempInF - 32) * 5) / 9))
    if ($('#units').text() == 'F') {
      $('#units').text('C')
      $('#temp').text(tempInC)
      console.log(tempInC);
    } else {
      $('#units').text('F')
      $('#temp').text(tempInF);
    }
  })
})
