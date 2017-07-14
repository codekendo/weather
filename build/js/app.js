var lat;
var lon;

function geoCall() {
  navigator.geolocation.watchPosition(function(position) {
    lat = "lat=" + position.coords.latitude;
    lon = "lon=" + position.coords.longitude;
    console.log(lat);
    console.log(lon);

    function getWeather() {
      $.getJSON('https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?' + lat + '&' + lon + '&units=imperial&APPID=7b0cd9647f367f2a3f378e918a66642d', function(data) {
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

        if (data.weather[0].icon == '01d') {
          $('.wrapper').addClass('clearSkyDay')
        } else if (data.weather[0].icon == '01n') {
          $('.wrapper').addClass('clearSkyNight')
        } else if (data.weather[0].icon == '02n') {
          $('.wrapper').addClass('fewCloudsNight')
        } else if (data.weather[0].icon == "02d") {
          $('.wrapper').addClass('fewCloudsDay')
        } else if (data.weather[0].icon == '03n') {
          $('.wrapper').addClass('scatteredCloudsNight')
        } else if (data.weather[0].icon == '03d') {
          $('.wrapper').addClass('scatteredCloudsDay')
        } else if (data.weather[0].icon == '04d') {
          $('.wrapper').addClass('brokenCloudsDay')
        } else if (data.weather[0].icon == '04n') {
          $('.wrapper').addClass('brokenCloudsNight')
        } else if (data.weather[0].icon == '09d') {
          $('.wrapper').addClass('showerRainDay')
        } else if (data.weather[0].icon == '09n') {
          $('.wrapper').addClass('showerRainNight')
        } else if (data.weather[0].icon == '10d') {
          $('.wrapper').addClass('rainDay')
        } else if (data.weather[0].icon == '10n') {
          $('.wrapper').addClass('rainNight')
        } else if (data.weather[0].icon == '11d' || '11n') {
          $('.wrapper').addClass('thunderstorm')
        } else if (data.weather[0].icon == '13d' || '13n') {
          $('.wrapper').addClass('snow')
        } else if (data.weather[0].icon == '50d' || '50n') {
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
