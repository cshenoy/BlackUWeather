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


function notify() {
  var havePermission = window.webkitNotifications.checkPermission();
  if (havePermission == 0) {
    // 0 is PERMISSION_ALLOWED
    var notification = window.webkitNotifications.createNotification(
      'http://i.stack.imgur.com/dmHl0.png',
      'Chrome notification!',
    	'Here is the notification text'
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
		notify();
	}, 5000);