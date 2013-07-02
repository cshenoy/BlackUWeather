/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/trunk/apps/experimental.app.html
 * @see http://developer.chrome.com/trunk/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function(intentData) {
    chrome.app.window.create('index.html', {
        width: 500,
        height: 309
    });
});

function isItGoneRain(){

  function gotLocation(location){
    var latlong = location.coords.latitude + ',' + location.coords.longitude;
    var apiKey = 252529335fa39680e530966f42ef1c56;
    var forecastURL = 'https://api.forecast.io/'+apiKey+'/'+latlong;
    $http.get(forecastURL).success(
      function(response){
        notify(response)
      }
      )
  }
  
  function locationError (e){
    console.log(e);
  }

  if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(gotLocation, locationError);
  } else {
    error('not supported');
  }
}


function notify(message) {
  var havePermission = window.webkitNotifications.checkPermission();
  if (havePermission == 0) {
    // 0 is PERMISSION_ALLOWED
    var notification = window.webkitNotifications.createNotification(
      message
    );
    
    notification.onclick = function () {
      window.open("http://stackoverflow.com/a/13328397/1269037");
      notification.close();
    }
    notification.show();
  } else {
      window.webkitNotifications.requestPermission();
  }
}

var blank = document.getElementById('blank');

var timeout = 
	setInterval(function(){
		isItGoneRain();
	}, 5000);